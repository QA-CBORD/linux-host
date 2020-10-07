import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { PartnerPaymentApiService } from '@core/service/payments-api/partner-payment-api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { MobileCredentialFactory } from '../shared/mobile-credential-factory';
import { MobileCredentialSharedDataService } from '../shared/mobile-credential-shared-data.service';
import { AndroidCredential, AndroidCredentialAttrs } from './android-credentials';

export abstract class AbstractAndroidCredentialDataService extends MobileCredentialSharedDataService {
  constructor(
    protected partnerPaymentApi: PartnerPaymentApiService,
    protected readonly storageStateService: StorageStateService,
    protected readonly authFacadeService: AuthFacadeService,
    protected readonly institutionFacadeService: InstitutionFacadeService
  ) {
    super(partnerPaymentApi, storageStateService, authFacadeService, institutionFacadeService);
  }

  updateLocalCache(
    newState: { status: number },
    shouldDeleteCredentialData = false
  ): Observable<AndroidCredential<any>> {
    return this.storageStateService.getStateEntityByKey$<AndroidCredentialAttrs>(this.credential_key).pipe(
      take(1),
      switchMap(data => {
        if (data) {
          const credential = <AndroidCredential<any>>MobileCredentialFactory.androidCredentialFrom(data.value);
          credential.credentialState.credStatus = newState.status;
          credential.updateStatusMsg();
          if (shouldDeleteCredentialData) {
            delete credential.credentialData;
          }
          return of(credential);
        }
        return of(null);
      }),
      tap(state => this.storageStateService.updateStateEntity(this.credential_key, state, { highPriorityKey: true }))
    );
  }

  deleteCredential(): Observable<{ success: boolean; current: AndroidCredential<any> }> {
    return this.storageStateService
      .getStateEntityByKey$<AndroidCredentialAttrs>(this.credential_key)
      .pipe(
        take(1),
        switchMap(data => {
          if (data) {
            return this.omniIDJwtToken$().pipe(
              switchMap(jwt => {
                return this.partnerPaymentApi.deleteCredentials(jwt, data.value.credentialData.id);
              }),
              switchMap(() => {
                return this.updateLocalCache({ status: 1 }, true);
              })
            );
          }
        })
      )
      .pipe(
        map(updatedCredential => {
          return {
            success: true,
            current: updatedCredential,
          };
        })
      );
  }

  updateCredential(newState: { status: number }): Observable<AndroidCredential<any>> {
    console.log('inside updateCredential():');
    const omniIDJwtToken$ = this.omniIDJwtToken$().pipe(take(1));
    const savedCredential$ = this.androidCredential(true).pipe(take(1));
    return forkJoin(omniIDJwtToken$, savedCredential$).pipe(
      map(([omniIDJwtToken, credential]) => {
        const reqBody = {
          referenceIdenfier: credential.getCredentialState().referenceIdentifier,
          credentialID: credential.credentialData.id,
          ...newState,
          omniIDJwtToken,
        };
        return reqBody;
      }),
      switchMap(({ omniIDJwtToken, credentialID, status, referenceIdenfier }) => {
        return this.partnerPaymentApi.updateCredential(omniIDJwtToken, { credentialID, status, referenceIdenfier });
      }),
      switchMap(resp => {
        console.log('partnerPaymentApi.updateCredential responded: ', resp);
        return this.updateLocalCache(newState);
      }),
      take(1)
    );
  }

  private getAndroidCredential(requestBody: any): Observable<any> {
    /**
     * uses data obtained from activePasses to Create/allocate/retrieve a credential for native Android use
     *
     */
    const omniIDJwtToken$ = this.omniIDJwtToken$();
    return omniIDJwtToken$.pipe(
      switchMap(omniIDJwtToken => {
        return this.partnerPaymentApi
          .androidCredential(omniIDJwtToken, requestBody.referenceIdentifier)
          .pipe(map(credData => credData[0]));
      })
    );
  }

  private getCredentialFromCache$(): Observable<AndroidCredential<any>> {
    return this.storageStateService.getStateEntityByKey$<AndroidCredentialAttrs>(this.credential_key).pipe(
      switchMap(data => {
        if(data) {
          const androidCredentials = MobileCredentialFactory.androidCredentialFrom(data.value);
          console.log('retrieved Credential From local Store: ', androidCredentials);
          return of(androidCredentials);
        }
        return of(null);
      })
    );
  }

  androidCredential(shouldFindInLocalCache: boolean = false): Observable<AndroidCredential<any>> {
    return this.getCredentialFromCache$().pipe(
      take(1),
      switchMap(credential => {
        if(credential && credential.credentialData) {
           return of(credential);
        }
        if (shouldFindInLocalCache) {
          throw new Error('Credential not stored.');
        }
        return this.getAndroidCredential(credential.credentialState).pipe(
          map(credentialData => {
            credential.setCredentialData(credentialData); //= credentialData;
            console.log('retrieved Credential From server: ', credential);
            return credential;
          }),
          tap(mCredential =>
            this.storageStateService.updateStateEntity(this.credential_key, mCredential, { highPriorityKey: true })
          ),
        );
      })
    );
  }
}
