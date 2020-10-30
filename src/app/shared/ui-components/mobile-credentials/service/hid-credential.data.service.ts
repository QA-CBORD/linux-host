import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { Observable, of } from 'rxjs';
import { catchError, first, map, switchMap, take, tap } from 'rxjs/operators';
import { User } from 'src/app/app.global';
import { AndroidCredential, HID, Persistable } from '../model/android/android-credential.model';
import { AndroidCredentialDataService } from '../model/shared/android-credential-data.service';
import { APIService } from '@core/service/api-service/api.service';

const api_version = 'v1';

const resourceUrls = {
  credentialUrl: `/android/${api_version}/credential`,
};

const CREDENTIAL_ALREADY_DELETED_ERROR = 'Credential has already been deleted';

@Injectable()
export class HidCredentialDataService extends AndroidCredentialDataService {
  constructor(
    protected readonly storageStateService: StorageStateService,
    protected readonly authFacadeService: AuthFacadeService,
    protected readonly institutionFacadeService: InstitutionFacadeService,
    protected readonly httpClient: HttpClient,
    protected readonly settingsFacadeService: SettingsFacadeService,
    protected readonly contentStringFacade: ContentStringsFacadeService,
    protected readonly apiService: APIService,
    protected readonly http: HttpClient
  ) {
    super(
      resourceUrls,
      storageStateService,
      authFacadeService,
      contentStringFacade,
      institutionFacadeService,
      apiService,
      http
    );
  }

  deleteCredential$(): Observable<boolean> {
    return this.getCredentialFromCacheOrUserSettings$().pipe(
      first(),
      switchMap((cachedCredential: Persistable) => {
        if (cachedCredential) {
          return super.deleteCredential$(cachedCredential.id).pipe(
            map(() => true),
            tap(() => {
              this.storageStateService.deleteStateEntityByKey(this.credential_key).catch(() => {}); // just fail silently if err
              this.deleteCredentialFromUserSetting$().catch(() => {}); // just fail silently if err
            }),
            catchError((serverErrorResponse: HttpErrorResponse) => {
              let credentialAlreadyDeletedError = false;
              if (serverErrorResponse.error.detail) {
                credentialAlreadyDeletedError = serverErrorResponse.error.detail.includes(CREDENTIAL_ALREADY_DELETED_ERROR);
              }
              return of(credentialAlreadyDeletedError);
            })
          );
        } else {
          return of(false);
        }
      }),
      catchError(() => of(false))
    );
  }

  androidCredential$(androidCredential: AndroidCredential<any>): Observable<AndroidCredential<HID>> {
    let body = {
      referenceIdentifier: androidCredential.getReferenceIdentifier(),
    };
    return super.androidCredential$(body).pipe(
      map(credentialBundle => {
        androidCredential.setCredentialBundle(credentialBundle);
        return androidCredential;
      }),
      tap(credential => this.saveCredentialInLocalStorage(credential.getPersistable()))
    );
  }

  updateCredential$(credential: AndroidCredential<any>): Observable<boolean> {
    let requestBody = {
      referenceIdentifier: credential.getReferenceIdentifier(),
      status: credential.getCredStatus(),
      credentialID: credential.getId(),
    };
    return super.updateCredential$(requestBody).pipe(
      map(() => true),
      tap(() => this.saveCredentialAsUserSetting$(credential)),
      catchError(() => of(false))
    );
  }

  private saveCredentialInLocalStorage(data: Persistable): void {
    this.storageStateService.updateStateEntity(this.credential_key, data, { highPriorityKey: true });
  }

  private deleteCredentialFromUserSetting$(): Promise<boolean> {
    return this.settingsFacadeService.deleteUserSetting(User.Settings.MOBILE_CREDENTIAL_ID).toPromise();
  }

  private saveCredentialAsUserSetting$(credential: AndroidCredential<any>): Promise<boolean> {
    return this.settingsFacadeService
      .saveUserSetting(User.Settings.MOBILE_CREDENTIAL_ID, credential.getId())
      .pipe(take(1))
      .toPromise();
  }

  private getCredentialFromCacheOrUserSettings$(): Observable<Persistable> {
    return this.storageStateService.getStateEntityByKey$<Persistable>(this.credential_key).pipe(
      switchMap(data => {
        if (data) {
          return of(data.value);
        }
        return this.settingsFacadeService.getUserSetting(User.Settings.MOBILE_CREDENTIAL_ID).pipe(
          map(settingInfo => {
            return {
              id: settingInfo.value,
            };
          })
        );
      })
    );
  }
}
