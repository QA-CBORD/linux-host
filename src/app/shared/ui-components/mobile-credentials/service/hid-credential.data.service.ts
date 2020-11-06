import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { from, Observable, of } from 'rxjs';
import { catchError, first, map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/app.global';
import { AndroidCredential, HID, Persistable } from '../model/android/android-credential.model';
import { AndroidCredentialDataService } from '../model/shared/android-credential-data.service';
import { APIService } from '@core/service/api-service/api.service';
import { EndpointStatuses } from '../model/android/hid/hid-plugin.wrapper';

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
    return this.getCachedCredential$().pipe(
      switchMap((cachedCredential: Persistable) => {
        if (cachedCredential) {
          return super.deleteCredential$(cachedCredential.id).pipe(
            map(() => true),
            tap(() => this.deleteCachedCredential$()),
            catchError((response: HttpErrorResponse) => {
              let credentialAlreadyDeletedError = false;
              if (response.error.detail) {
                credentialAlreadyDeletedError = response.error.detail.includes(CREDENTIAL_ALREADY_DELETED_ERROR);
                if (credentialAlreadyDeletedError) {
                  this.deleteCachedCredential$();
                }
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
      })
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
      tap(() => this.saveUserSetting(credential.getPersistable())),
      catchError(() => of(false))
    );
  }

  saveCredentialInLocalStorage(data: Persistable): void {
    this.storageStateService.updateStateEntity(this.credential_key, data, { highPriorityKey: true });
  }

  private async deleteCachedCredential$(): Promise<boolean> {
    return this.settingsFacadeService
      .deleteUserSetting(User.Settings.MOBILE_CREDENTIAL_ID)
      .pipe(
        switchMap(() =>
          from(this.storageStateService.deleteStateEntityByKey(this.credential_key)).pipe(map(() => true))
        ),
        catchError(() =>
          from(this.storageStateService.deleteStateEntityByKey(this.credential_key)).pipe(map(() => false))
        )
      )
      .toPromise()
      .catch(() => false);
  }

  private saveUserSetting(data: Persistable): Promise<boolean> {
    const credentialData = `${data.id}||${data.endpointStatus}`;
    return this.settingsFacadeService
      .saveUserSetting(User.Settings.MOBILE_CREDENTIAL_ID, credentialData)
      .pipe(tap(() => this.saveCredentialInLocalStorage(data)))
      .toPromise()
      .catch(() => false);
  }

  public updateCachedCredential$(): Promise<boolean> {
    return this.getCachedCredential$()
      .pipe(
        switchMap(credentialStateInfo => {
          if (credentialStateInfo.endpointStatus == EndpointStatuses.SETUP_INACTIVE) {
            credentialStateInfo.endpointStatus = 1;
            return this.saveUserSetting(credentialStateInfo);
          } else {
            return of(true);
          }
        })
      )
      .toPromise();
  }

  public getEndpointStateInfo$(): Promise<Persistable> {
    return this.getCachedCredential$().toPromise();
  }

  private getCachedCredential$(): Observable<Persistable> {
    return this.storageStateService.getStateEntityByKey$<Persistable>(this.credential_key).pipe(
      first(),
      switchMap(data => {
        if (data && data.value) {
          return of(data.value);
        }
        return this.settingsFacadeService.getUserSetting(User.Settings.MOBILE_CREDENTIAL_ID).pipe(
          map(settingInfo => {
            if (settingInfo.value) {
              const [credentialId, endpointStatusString] = settingInfo.value.split('||');
              let id = credentialId;
              let endpointStatus = Number(endpointStatusString || -1);
              this.saveCredentialInLocalStorage({ id, endpointStatus });
              return { id, endpointStatus };
            } else {
              return {
                id: null,
              };
            }
          })
        );
      })
    );
  }
}
