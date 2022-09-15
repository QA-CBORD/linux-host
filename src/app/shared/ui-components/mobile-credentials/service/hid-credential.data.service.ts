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
import {
  AndroidCredential,
  EndpointState,
  HidCredentialBundle,
  Persistable,
} from '../model/android/android-credential.model';
import { AndroidCredentialDataService } from '../model/shared/android-credential-data.service';
import { APIService } from '@core/service/api-service/api.service';
import { EndpointStatuses, MobileCredentialStatuses } from '../model/shared/credential-state';
import { UserFacadeService } from '@core/facades/user/user.facade.service';

const api_version = 'v1';

const resourceUrls = {
  credentialUrl: `/android/${api_version}/credential`,
};

const CREDENTIAL_ALREADY_DELETED_ERROR = 'Credential has already been deleted';

@Injectable({ providedIn: 'root' })
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
      http,
      userFacade
    );
  }

  deleteCredential$(endpoint?: EndpointState): Observable<boolean> {
    const source$ = endpoint ? of(endpoint).toPromise() : this.getSavedEndpointState$();
    return from(source$).pipe(
      switchMap((cachedCredential: EndpointState) => {
        if (!cachedCredential.id) {
          return of(true);
        }

        return super.deleteCredential$(cachedCredential.id).pipe(
          map(() => true),
          tap(() => (endpoint ? this.deleteLocalCachedEndpoint() : this.deleteAllCachedEndpoint$())),
          catchError((response: HttpErrorResponse) => {

            if (!response.error.detail) {
              return of(false);
            }

            const credentialAlreadyDeletedError = response.error.detail.includes(CREDENTIAL_ALREADY_DELETED_ERROR);
            
            if (credentialAlreadyDeletedError && endpoint) {
              this.deleteLocalCachedEndpoint();
            } else {
              this.deleteAllCachedEndpoint$();
            }

            return of(credentialAlreadyDeletedError); 
          })
        );
      }),
      catchError(() => of(false))
    );
  }

  async deleteLocalCachedEndpoint(): Promise<boolean> {
    await this.storageStateService.deleteStateEntityByKey(this.credential_key, true);
    return true;
  }

  androidCredentialBundle$(referenceIdentifier: string): Observable<HidCredentialBundle> {
    return super.androidCredentialBundle$({ referenceIdentifier }).pipe(map(bundle => bundle as HidCredentialBundle));
  }

  updateCredential$(credential: AndroidCredential<any>): Observable<boolean> {
    const requestBody = {
      referenceIdentifier: credential.getReferenceIdentifier(),
      status: credential.isProcessing() ? MobileCredentialStatuses.PROVISIONED : credential.getCredStatus(),
      credentialID: credential.getId(),
    };
    return super.updateCredential$(requestBody).pipe(
      map(() => true),
      tap(() => {
        this.getUserId()
          .pipe(
            map(userId => {
              const state = new EndpointState(credential.getCredStatus(), requestBody.credentialID, userId);
              credential.setEndpointState(state);
              this.saveEnpointStateInCache(state);
            })
          )
          .toPromise();
      }),
      catchError(() => of(false))
    );
  }

  private async saveEndpointStateInLocalStorage(data: EndpointState): Promise<void> {
    this.storageStateService.updateStateEntity(this.credential_key, data, {
      highPriorityKey: true,
      keepOnLogout: true,
    });
  }

  async deleteAllCachedEndpoint$(): Promise<boolean> {
    return this.settingsFacadeService
      .deleteUserSetting(User.Settings.MOBILE_CREDENTIAL_ID)
      .pipe(
        switchMap(() => from(this.deleteLocalCachedEndpoint())),
        catchError(() => from(this.deleteLocalCachedEndpoint()).pipe(map(() => false)))
      )
      .toPromise()
      .catch(() => false);
  }

  private saveEnpointStateInCache(data: EndpointState): Promise<boolean> {
    const credentialData = `${data.id}||${data.status}`;
    return this.settingsFacadeService
      .saveUserSetting(User.Settings.MOBILE_CREDENTIAL_ID, credentialData)
      .pipe(tap(() => this.saveEndpointStateInLocalStorage(data)))
      .toPromise()
      .catch(() => false);
  }

  async updateCachedCredential$(status: EndpointStatuses): Promise<boolean> {
    const savedState = await this.getSavedEndpointState$();
    const newState = new EndpointState(status, savedState.id, savedState.userId);
    if (savedState.notEqual(newState)) {
      return this.saveEnpointStateInCache(newState);
    }
    return true;
  }

  getEndpointStateFromLocalCache(forAnyUser?: boolean): Promise<EndpointState> {
    return this.getLocalStoredUserData<Persistable>(this.credential_key, forAnyUser)
      .pipe(
        first(),
        map(data => {
          if (data) {
            return EndpointState.from(data);
          }
          return null;
        })
      )
      .toPromise();
  }

  getEndpointStateFromUserSettings(): Promise<EndpointState> {
    return this.settingsFacadeService
      .getUserSetting(User.Settings.MOBILE_CREDENTIAL_ID)
      .pipe(
        map(settingInfo => {
          if (settingInfo.value) {
            const [credentialId, endpointStatusString] = settingInfo.value.split('||');
            const id = credentialId;
            const endpointStatus = Number(endpointStatusString || -1);
            const endpointState = new EndpointState(endpointStatus, id, settingInfo.userId);
            this.saveEndpointStateInLocalStorage(endpointState);
            return endpointState;
          } else {
            return new EndpointState(EndpointStatuses.NOT_SETUP, null, null);
          }
        })
      )
      .toPromise();
  }

  async getSavedEndpointState$(): Promise<EndpointState> {
    return (await this.getEndpointStateFromLocalCache()) || (await this.getEndpointStateFromUserSettings());
  }
}
