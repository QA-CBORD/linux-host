import { Injectable } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AndroidCredential } from '../payments-api/model/android-credentials';
import { CredentialState } from '../payments-api/model/credential-state';
import { ActivePasses, CredentialStateInterface } from '../payments-api/model/credential-utils';
import { CredentialFactory } from '../payments-api/model/mobile-credential';
import { PartnerPaymentApiService } from '../payments-api/partner-payment-api.service';
import { MobileCredentialFacade } from './mobile-credential.facade';

@Injectable({
  providedIn: 'root',
})
export class MobileCredentialService extends MobileCredentialFacade {
  private credential_state: string = 'credential_state';
  private mobile_credential: string = 'mobile_credential';
  constructor(
    protected readonly partnerPaymentApi: PartnerPaymentApiService,
    protected readonly storageStateService: StorageStateService,
    protected readonly authFacadeService: AuthFacadeService,
    protected readonly institutionFacadeService: InstitutionFacadeService
  ) {
    super(partnerPaymentApi, storageStateService, authFacadeService, institutionFacadeService);
  }

  androidActivePasses(): Observable<CredentialState> {
    return this.storageStateService.getStateEntityByKey$<any>(this.credential_state).pipe(
      switchMap(data => {
        if (data) {
          const result = CredentialState.buildFrom(data.value);
          console.log('converted to states: ', result);
          return of(result);
        }
        return super.androidActivePasses().pipe(
          take(1),
          map(activePasses => {
            console.log('newly loaded passes: ', activePasses);
            return CredentialState.from(<ActivePasses>activePasses);
          }),
          tap(credentialState => this.storageStateService.updateStateEntity(this.credential_state, credentialState))
        );
      })
    );
  }

  androidCredential(state: CredentialState | ActivePasses): Observable<AndroidCredential> {
    return this.storageStateService.getStateEntityByKey$<any>(this.mobile_credential).pipe(
      switchMap(data => {
        console.log('credential found: ', data);
        if(data) {
           return of(CredentialFactory.toCredential(state, data.value));
        }
        return super.androidCredential(state).pipe(
          map(resp => resp),
          tap(mCredential => this.storageStateService.updateStateEntity(this.mobile_credential, mCredential))
        );
      })
    );
  }

  loadCredentialState(): Observable<CredentialStateInterface> {
    return this.androidActivePasses();
  }

  getSavedCredential(): Observable<AndroidCredential> {
    return this.androidActivePasses().pipe(
      switchMap(activePasses => {
            return this.androidCredential(activePasses);
      })
    );
  }

  deleteCredential(): Observable<boolean> {
    return this.storageStateService.getStateEntityByKey$<any>(this.mobile_credential).pipe(
      switchMap(data => {
        if(data) {
           return this.omniIDJwtToken$().pipe(
            switchMap(jwt => {
              return this.partnerPaymentApi.deleteCredentials(jwt, data.value.id);
            })
          );
        }
        return of(false);
      })
    );
  }

  updateLocalCache(newState: { status: number }): Observable<CredentialState>{
    return this.storageStateService.getStateEntityByKey$<any>(this.credential_state).pipe(
      map(data => {
         if( data ){
            const state = CredentialState.buildFrom(data.value);
            console.log('const state:: ', state);
            state.credential.credStatus = newState.status;
            state.updateStatusMsg();
            return state;
         }
         return null;
      }),
      tap(state =>  this.storageStateService.updateStateByKey(this.credential_state, state)),
      take(1)
    )

  }


  updateCredential(newState: { status: number }): Observable<CredentialState> {
    console.log("inside updateCredential():");
    const omniIDJwtToken$ = this.omniIDJwtToken$().pipe(take(1));
    const savedCredential$ = this.getSavedCredential().pipe(take(1));
    return forkJoin(omniIDJwtToken$, savedCredential$).pipe(
      switchMap(([omniIDJwtToken, credential]) => {
        const reqBody = {
          referenceIdenfier: credential.getState().referenceIdentifier,
          credentialID: credential.getId(),
          ...newState,
          omniIDJwtToken
        };
        return of(reqBody)
      }),
      switchMap(({ omniIDJwtToken, credentialID, status, referenceIdenfier }) => {
        return this.partnerPaymentApi.updateCredential(omniIDJwtToken, {credentialID, status, referenceIdenfier })
      }),
      switchMap(resp => {
        console.log("partnerPaymentApi.updateCredential responded: ", resp);
        return this.updateLocalCache(newState);
      })
    );
  }
}
