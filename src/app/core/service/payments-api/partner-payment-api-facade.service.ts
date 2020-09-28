import { Injectable } from '@angular/core';
import { PartnerPaymentApiService } from './partner-payment-api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CredentialFactory } from './model/mobile-credential';
import { ActivePasses } from './model/credential-utils';
import { AndroidCredential } from './model/android-credentials';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class PartnerPaymentApiFacadeService {
  constructor(private partnerPaymentApi: PartnerPaymentApiService) {}

  androidActivePasses(debug=false): Observable<ActivePasses> {
    /**
     * calls api gw android/version/actipasses to obtain activaPasses info for current patron/user.
     * this data is then used to get a credential for the patron/user.
     */
    if (debug) {
      return this.partnerPaymentApi.mockActivePasses();
    }
    return this.partnerPaymentApi.androidActivePasses();
  }

  androidCredential(debug=false, activePasses: ActivePasses): Observable<AndroidCredential> {
    /**
     * uses data obtained from activePasses to Create/allocate/retrieve a credential for native Android use
     *
     */
    if (debug) {
      return this.partnerPaymentApi.mockAndroidCredentials().pipe(
        map(credentialData => {
          return CredentialFactory.toCredential(activePasses, credentialData);
        })
      );
    }

    return this.partnerPaymentApi.androidCredential(activePasses).pipe(
      map(credentialData => {
        return CredentialFactory.toCredential(activePasses, credentialData);
      })
    );
  }

  deleteCredential(): Observable<boolean> {
    return this.partnerPaymentApi.deleteCredentials();
  }

}
