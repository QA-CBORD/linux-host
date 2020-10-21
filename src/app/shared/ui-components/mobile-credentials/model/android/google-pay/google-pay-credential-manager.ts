import { MobileCredentialManager, CredentialStateChangeListener } from '../../shared/mobile-credential-manager';
import { MobileCredential } from '../../shared/mobile-credential';
import { Observable, of } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { map } from 'rxjs/operators';
import { GoogleCredential, AndroidCredentialState, GOOGLE } from '../android-credential.model';
import { GooglePayCredentialDataService } from '@shared/ui-components/mobile-credentials/service/google-pay-credential.data.service';
import { Injectable } from '@angular/core';
import { MobileCredentialStatuses } from '../../shared/credential-state';
const { GooglePayPlugin } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class GooglePayCredentialManager implements MobileCredentialManager {
  private mCredential: GoogleCredential;
  private credentialStateChangeSubscription: CredentialStateChangeListener;

  constructor(private googlePayCrendential: GooglePayCredentialDataService) {}

  initialize(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  setCredential(mobileCredential: MobileCredential): void {
    this.mCredential = mobileCredential as GoogleCredential;
  }
  onUiImageClicked(event?: any): void {
    console.log('onUiImageClicked');
    (async () => {
      const nonce = await GooglePayPlugin.getGooglePayNonce();
      const refObj = await this.getAndroidCredential(
        nonce.googlePayNonce,
        this.mCredential.getCredentialState().referenceIdentifier
      );
      const plugin = await GooglePayPlugin.openGooglePay({ uri: refObj.digitizationReference });
      // Update active passes / Update credential
      this.mCredential.setStatus(MobileCredentialStatuses.IS_PROVISIONED);
      this.googlePayCrendential.updateCredential$(this.mCredential);
    })();
  }
  credentialEnabled$(): Observable<boolean> {
    console.log('credentialEnabled: ', this.mCredential.isEnabled())
    return of(this.mCredential.isEnabled()).pipe(
      map(googleCredentialEnabled => {
        if (googleCredentialEnabled) {
           GooglePayPlugin.getGoogleClient();
        }
        return googleCredentialEnabled;
      })
    );
  }
  credentialAvailable$(): Observable<boolean> {
    return of(this.mCredential.isAvailable());
  }
  getCredential(): MobileCredential {
    return this.mCredential;
  }
  onUiIconClicked(): void {
    //
  }
  setCredentialStateChangeListener(credentialStateChangeSubscription: CredentialStateChangeListener): void {
    this.credentialStateChangeSubscription = credentialStateChangeSubscription;
  }
  refresh(): void {
    //
  }

  private async getAndroidCredential(googlePayNonce: string, referenceIdentifier: string): Promise<GOOGLE> {
    return this.googlePayCrendential
      .androidCredential$({
        referenceIdentifier,
        googlePayNonce,
      })
      .toPromise();
  }
}
