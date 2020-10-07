import { Device } from '@capacitor/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { PartnerPaymentApiService } from '@core/service/payments-api/partner-payment-api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AndroidCredentialAttrs } from '../android/android-credentials';
import { ActivePasses } from './credential-utils';
import { MobileCredential } from './mobile-credential';
import { MobileCredentialFactory } from './mobile-credential-factory';

export abstract class MobileCredentialSharedDataService {
  protected ttl: number = 600000; // 10min
  protected jwtToken_key: string = 'jwt_token';
  protected authBlob_key: string = 'auth_blob';
  protected credential_key: string = 'mobile_credential';

  constructor(
    protected partnerPaymentApi: PartnerPaymentApiService,
    protected readonly storageStateService: StorageStateService,
    protected readonly authFacadeService: AuthFacadeService,
    protected readonly institutionFacadeService: InstitutionFacadeService
  ) {}

  protected retrieveAuthorizationBlob$(deviceModel: string, osVersion: string): Observable<string> {
    return this.authFacadeService.retrieveAuthorizationBlob(deviceModel, osVersion).pipe(
      map(({ response }) => response),
      tap(response => this.storageStateService.updateStateEntity(this.authBlob_key, response, { ttl: this.ttl }))
    );
  }

  protected omniIDJwtToken$(): Observable<string> {
    return this.storageStateService.getStateEntityByKey$<string>(this.jwtToken_key).pipe(
      switchMap(data => {
        if (data != null && data.lastModified + data.timeToLive >= Date.now()) {
          return of(data.value);
        }
        return this.retrieveOmniIDJwtToken$();
      })
    );
  }

  protected retrieveOmniIDJwtToken$(): Observable<string> {
    return this.authFacadeService
      .getExternalAuthenticationToken$('OmniID')
      .pipe(tap(data => this.storageStateService.updateStateEntity(this.jwtToken_key, data, { ttl: this.ttl })));
  }

  protected authorizationBlob$(): Observable<string> {
    return this.storageStateService.getStateEntityByKey$<string>(this.authBlob_key).pipe(
      switchMap(data => {
        if (data != null && data.lastModified + data.timeToLive >= Date.now()) {
          return of(data.value);
        }
        return from(Device.getInfo()).pipe(
          switchMap(({ model, osVersion }) => {
            return this.retrieveAuthorizationBlob$(model, osVersion);
          })
        );
      })
    );
  }

  protected getPasses(): Observable<any> {
    /**
     * calls api gw android/version/actipasses to obtain activaPasses info for current patron/user.
     * this data is then used to get a credential for the patron/user.
     */
    // doing a forkJoin to ensure all requests actually complete, if one of these fails, the others are useless, just return error
    let omniIDJwtToken$ = this.omniIDJwtToken$().pipe(take(1));
    let authorizationBlob$ = this.authorizationBlob$().pipe(take(1));
    return forkJoin(omniIDJwtToken$, authorizationBlob$).pipe(
      switchMap(([omniIDJwtToken, authBlob]) => {
        const requestBody = { authorizationBlob: authBlob };
        return this.partnerPaymentApi.androidActivePasses(omniIDJwtToken, requestBody);
      })
    );
  }

  androidActivePassesFromServer(): Observable<MobileCredential> {
    return this.getPasses().pipe(
      take(1),
      map(activePasses => {
        const androidCredentials = MobileCredentialFactory.androidCredentialFrom(<ActivePasses>activePasses);
        console.log('retrieved passes From server ', androidCredentials);
        return androidCredentials;
      })
    );
  }

  protected androidActivePasses(): Observable<MobileCredential> {
    console.log('androidActivePasses called...');
    return this.storageStateService.getStateEntityByKey$<AndroidCredentialAttrs>(this.credential_key).pipe(
      switchMap(data => {
        if (data) {
          console.log('retrieved androidActivePasses From local Store: ', data);
          const androidCredentials = MobileCredentialFactory.androidCredentialFrom(data.value);
          return of(androidCredentials);
        }
        return this.androidActivePassesFromServer().pipe(
          tap(activePassesResp => this.storageStateService.updateStateEntity(this.credential_key, activePassesResp, { highPriorityKey: true }))
        );
      })
    );
  }
}
