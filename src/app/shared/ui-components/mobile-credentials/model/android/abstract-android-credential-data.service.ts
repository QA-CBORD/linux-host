import { HttpClient } from '@angular/common/http';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { PartnerPaymentApiService } from '@core/service/payments-api/partner-payment-api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { MobileCredentialSharedDataService } from '../shared/mobile-credential-shared-data.service';
import { AndroidCredential, Persistable } from './android-credentials';

export abstract class AbstractAndroidCredentialDataService extends MobileCredentialSharedDataService {
  constructor(
    protected partnerPaymentApi: PartnerPaymentApiService,
    protected readonly storageStateService: StorageStateService,
    protected readonly authFacadeService: AuthFacadeService,
    protected readonly institutionFacadeService: InstitutionFacadeService,
    protected readonly httpClient: HttpClient
  ) {
    super(partnerPaymentApi, storageStateService, authFacadeService, institutionFacadeService, httpClient);
  }

  deleteCredential(): Observable<boolean> {
    return this.getCredentialFromCache$().pipe(
      switchMap(credential => {
        if (credential) {
          return this.omniIDJwtToken$().pipe(
            switchMap(jwt => {
              return this.partnerPaymentApi.deleteCredentials(jwt, credential.id);
            }),
            switchMap(() => {
              return from(this.storageStateService.deleteStateEntityByKey(this.credential_key)).pipe(map(() => true));
            })
          );
        }
        return of(false);
      })
    );
  }

  updateCredential(credential: AndroidCredential<any>): Observable<AndroidCredential<any>> {
    let requestBody = {
      referenceIdentifier: credential.getCredentialState().referenceIdentifier,
      status: credential.getCredentialState().credStatus,
      credentialID: credential.getCredentialData<any>().id,
    };

    // this.saveCredentialInLocalStorage(credential.getPersistable());
    // return of(credential);

    return this.omniIDJwtToken$().pipe(
      switchMap(omniIDJwtToken => {
        return this.partnerPaymentApi.updateCredential(omniIDJwtToken, requestBody).pipe(map(() => credential));
      }),
      tap(resp => {
        const data = credential.getPersistable<Persistable>();
        this.saveCredentialInLocalStorage(data);
      })
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

  private getCredentialFromCache$(): Observable<Persistable> {
    return this.storageStateService.getStateEntityByKey$<Persistable>(this.credential_key).pipe(
      take(1),
      map(data => {
        if (data) {
          return data.value;
        }
        return null;
      })
    );
  }
}
