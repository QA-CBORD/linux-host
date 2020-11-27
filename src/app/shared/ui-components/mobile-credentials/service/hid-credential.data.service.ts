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
import { UserFacadeService } from '@core/facades/user/user.facade.service';

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
    protected readonly http: HttpClient,
    protected readonly userFacade: UserFacadeService
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
    return from(this.getCachedEndpointState$()).pipe(
      switchMap((cachedCredential: Persistable) => {
        if (cachedCredential.id) {
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
          // no credential id found to delete, so will assume it's been deleted in payment system and proceed.
          return of(true);
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
      tap(() => this.saveEnpointStateInCache(credential.getPersistable())),
      catchError(() => of(false))
    );
  }

  async saveEndpointStateInLocalStorage(data: Persistable): Promise<void> {
    let { id } = await this.userFacade
      .getUserData$()
      .pipe(first())
      .toPromise();
    data.userId = id;
    this.storageStateService.updateStateEntity(this.credential_key, data, {
      highPriorityKey: true,
      keepOnLogout: true,
    });
  }

  private async deleteCachedCredential$(): Promise<boolean> {
    return this.settingsFacadeService
      .deleteUserSetting(User.Settings.MOBILE_CREDENTIAL_ID)
      .pipe(
        switchMap(() =>
          from(this.storageStateService.deleteStateEntityByKey(this.credential_key, true)).pipe(map(() => true))
        ),
        catchError(() =>
          from(this.storageStateService.deleteStateEntityByKey(this.credential_key, true)).pipe(map(() => false))
        )
      )
      .toPromise()
      .catch(() => false);
  }

  private saveEnpointStateInCache(data: Persistable): Promise<boolean> {
    const credentialData = `${data.id}||${data.endpointStatus}`;
    return this.settingsFacadeService
      .saveUserSetting(User.Settings.MOBILE_CREDENTIAL_ID, credentialData)
      .pipe(tap(() => this.saveEndpointStateInLocalStorage(data)))
      .toPromise()
      .catch(() => false);
  }

  async updateCachedCredential$(newEndpointStatus: EndpointStatuses = EndpointStatuses.SETUP_ACTIVE): Promise<boolean> {
    const credentialState = await this.getCachedEndpointState$();
    if (credentialState.endpointStatus != newEndpointStatus) {
      credentialState.endpointStatus = newEndpointStatus;
      return this.saveEnpointStateInCache(credentialState);
    }
    return true;
  }

  getEndpointStateFromLocalCache(): Promise<Persistable> {
    return this.storageStateService
      .getStateEntityByKey$<Persistable>(this.credential_key)
      .pipe(
        first(),
        switchMap(data => {
          if (data && data.value) {
            return this.userFacade.getUserData$().pipe(
              first(),
              map(({ id }) => (data.value.userId === id ? data.value : null))
            );
          } else {
            return of(null);
          }
        })
      )
      .toPromise();
  }

  getEndpointStateFromUserSettings(): Promise<Persistable> {
    return this.settingsFacadeService
      .getUserSetting(User.Settings.MOBILE_CREDENTIAL_ID)
      .pipe(
        map(settingInfo => {
          if (settingInfo.value) {
            const [credentialId, endpointStatusString] = settingInfo.value.split('||');
            let id = credentialId;
            let endpointStatus = Number(endpointStatusString || -1);
            this.saveEndpointStateInLocalStorage({ id, endpointStatus });
            return { id, endpointStatus };
          } else {
            return {
              id: null,
              endpointStatus: -1,
            };
          }
        })
      )
      .toPromise();
  }

  async getCachedEndpointState$(): Promise<Persistable> {
    const cachedEndpointState = await this.getEndpointStateFromLocalCache();
    return cachedEndpointState || (await this.getEndpointStateFromUserSettings());
  }
}
