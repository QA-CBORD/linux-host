import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { User } from 'src/app/app.global';
import { AndroidCredential, HID, Persistable } from '../model/android/android-credential.model';
import { AndroidCredentialDataService } from '../model/shared/android-credential-data.service';
import { APIService } from '@core/service/api-service/api.service';

const api_version = 'v1';

const resourceUrls = {
  credentialUrl: `/android/${api_version}/credential`,
};

@Injectable()
export class HidCredentialDataService extends AndroidCredentialDataService {
  constructor(
    protected readonly storageStateService: StorageStateService,
    protected readonly authFacadeService: AuthFacadeService,
    protected readonly institutionFacadeService: InstitutionFacadeService,
    protected readonly httpClient: HttpClient,
    protected readonly settingsFacadeService: SettingsFacadeService,
    protected readonly contentStringFacade: ContentStringsFacadeService,
    protected readonly apiService: APIService
  ) {
    super(
      resourceUrls,
      storageStateService,
      authFacadeService,
      contentStringFacade,
      institutionFacadeService,
      apiService
    );
  }

  deleteCredential$(): Observable<boolean> {
    return this.getCredentialFromCacheOrUserSettings$().pipe(
      switchMap(cachedCredentials => {
        if (cachedCredentials) {
          return super.deleteCredential$(cachedCredentials.id).pipe(
            map(() => true),
            tap(() => this.storageStateService.deleteStateEntityByKey(this.credential_key)),
            catchError(() => of(false))
          );
        }
        return of(false);
      }),
      catchError(() => of(false))
    );
  }

  androidCredential$(credential: AndroidCredential<any>): Observable<AndroidCredential<HID>> {
    let body = {
      referenceIdentifier: credential.credentialData.referenceIdentifier,
    };
    return super.androidCredential$(body).pipe(
      map(credentialData => {
        credential.setCredentialData(credentialData);
        return credential;
      })
    );
  }

  updateCredential$(credential: AndroidCredential<any>): Observable<boolean> {
    let requestBody = {
      referenceIdentifier: credential.getCredentialState().referenceIdentifier,
      status: credential.getCredentialState().credStatus,
      credentialID: credential.getCredentialData<any>().id,
    };
    return super.updateCredential$(requestBody).pipe(
      map(() => true),
      tap(() => {
        const persistable = credential.getPersistable<Persistable>();
        this.saveCredentialInLocalStorage(persistable);
      }),
      catchError(() => of(false))
    );
  }

  private saveCredentialInLocalStorage(data: Persistable): void {
    this.storageStateService.updateStateEntity(this.credential_key, data, { highPriorityKey: true });
  }

  public saveCredentialAsUserSetting$(credential: AndroidCredential<any>): Observable<boolean> {
    return this.settingsFacadeService
      .saveUserSetting(User.Settings.MOBILE_CREDENTIAL_ID, credential.getCredentialData<any>().id)
      .pipe(take(1));
  }

  private getCredentialFromCacheOrUserSettings$(): Observable<Persistable> {
    return this.storageStateService.getStateEntityByKey$<Persistable>(this.credential_key).pipe(
      take(1),
      switchMap(data => {
        if (data) {
          return of(data.value);
        }
        return this.settingsFacadeService.getUserSetting(User.Settings.MOBILE_CREDENTIAL_ID).pipe(
          take(1),
          map(settingInfo => {
            return {
              id: settingInfo.value,
              referenceIdentifier: null,
            };
          })
        );
      })
    );
  }
}
