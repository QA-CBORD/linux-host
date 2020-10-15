import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { PartnerPaymentApiService } from '@core/service/payments-api/partner-payment-api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { User } from 'src/app/app.global';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { MobileCredentialSharedDataService } from '../shared/mobile-credential-shared-data.service';
import { AndroidCredential, Persistable } from './android-credentials';

@Injectable({
  providedIn: 'root',
})
export class HidCredentialDataService extends MobileCredentialSharedDataService {
  constructor(
    protected partnerPaymentApi: PartnerPaymentApiService,
    protected readonly storageStateService: StorageStateService,
    protected readonly authFacadeService: AuthFacadeService,
    protected readonly institutionFacadeService: InstitutionFacadeService,
    protected readonly httpClient: HttpClient,
    protected readonly settingsFacadeService: SettingsFacadeService,
    protected readonly contentStringFacade: ContentStringsFacadeService
  ) {
    super(partnerPaymentApi, storageStateService, authFacadeService, institutionFacadeService, httpClient);
  }

  deleteCredential(): Observable<boolean> {
    return this.getCredentialFromCacheOrUserSettings$().pipe(
      switchMap(cachedCredentials => {
        if (cachedCredentials) {
          return this.omniIDJwtToken$().pipe(
            switchMap(jwt => this.partnerPaymentApi.deleteCredentials(jwt, cachedCredentials.id).pipe(map(() => true))),
            tap(() => this.storageStateService.deleteStateEntityByKey(this.credential_key)),
            catchError(err => of(false))
          );
        }
        return of(false);
      }),
      catchError(err => of(false))
    );
  }

  loadContentString$(contentStringSettings: {
    domain: CONTENT_STRINGS_DOMAINS;
    category: CONTENT_STRINGS_CATEGORIES;
    name: string;
  }): Observable<string> {
    let { domain, category, name } = contentStringSettings;
    return this.contentStringFacade.fetchContentString$(domain, category, name).pipe(
      map(data => {
        return data.value;
      }),
      take(1)
    );
  }

  updateCredential(credential: AndroidCredential<any>): Observable<boolean> {
    return this.omniIDJwtToken$().pipe(
      switchMap(omniIDJwtToken => {
        let requestBody = {
          referenceIdentifier: credential.getCredentialState().referenceIdentifier,
          status: credential.getCredentialState().credStatus,
          credentialID: credential.getCredentialData<any>().id,
        };
        return this.partnerPaymentApi.updateCredential(omniIDJwtToken, requestBody).pipe(map(() => true));
      }),
      tap(() => {
        const persistable = credential.getPersistable<Persistable>();
        this.saveCredentialInLocalStorage(persistable);
      }),
      catchError(err => of(false))
    );
  }

  private getAndroidCredentialFor(referenceIdentifier: string): Observable<any> {
    /**
     * uses data obtained from activePasses to Create/allocate/retrieve a credential for native Android use
     *
     */

    // return this.httpClient.get('/assets/mock/android_credentials.json').pipe(map(data => data[0]));
    const omniIDJwtToken$ = this.omniIDJwtToken$();
    return omniIDJwtToken$.pipe(
      switchMap(omniIDJwtToken => {
        return this.partnerPaymentApi
          .androidCredential(omniIDJwtToken, referenceIdentifier)
          .pipe(map(credData => credData[0]));
      })
    );
  }

  getCredentialFromServer$(credential: AndroidCredential<any>): Observable<AndroidCredential<any>> {
    return this.getAndroidCredentialFor(credential.getCredentialState().referenceIdentifier).pipe(
      take(1),
      map((credentialData: any) => {
        credential.setCredentialData(credentialData);
        return credential;
      })
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
