import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Device } from '@capacitor/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AndroidCredential } from '../payments-api/model/android-credentials';
import { CredentialState } from '../payments-api/model/credential-state';
import { ActivePasses } from '../payments-api/model/credential-utils';
import { CredentialFactory } from '../payments-api/model/mobile-credential';
import { PartnerPaymentApiService } from '../payments-api/partner-payment-api.service';

export class MobileCredentialFacade {
  private ttl: number = 600000; // 10min
  private jwtToken_key: string = 'jwt_token';
  private authBlob_key: string = 'auth_blob';

  constructor(
    protected partnerPaymentApi: PartnerPaymentApiService,
    protected readonly storageStateService: StorageStateService,
    protected readonly authFacadeService: AuthFacadeService,
    protected readonly institutionFacadeService: InstitutionFacadeService
  ) {}

  androidActivePasses(): Observable<ActivePasses | CredentialState> {
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


  androidCredential(state: CredentialState | ActivePasses): Observable<AndroidCredential> {
    /**
     * uses data obtained from activePasses to Create/allocate/retrieve a credential for native Android use
     *
     */
    const omniIDJwtToken$ = this.omniIDJwtToken$();
    return omniIDJwtToken$.pipe(
      switchMap(omniIDJwtToken => {
        return this.partnerPaymentApi.androidCredential(omniIDJwtToken, state.referenceIdentifier).pipe(
          map(credData => {
            console.log("cred Data: ", credData)
            return CredentialFactory.toCredential(state, credData[0]);
          })
        );
      })
    );
  }

  private retrieveAuthorizationBlob$(deviceModel: string, osVersion: string): Observable<string> {
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

  private retrieveOmniIDJwtToken$(): Observable<string> {
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





}
