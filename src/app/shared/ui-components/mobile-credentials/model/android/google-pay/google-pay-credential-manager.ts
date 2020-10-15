import { MobileCredentialManager, CredentialStateChangeSubscription } from '../../shared/mobile-credential-manager';
import { MobileCredential } from '../../shared/mobile-credential';
import { Observable, of } from 'rxjs';
import { GoogleCredential } from '../android-credentials';
import { Plugins } from '@capacitor/core';
const { GooglePayPlugin } = Plugins;

export class GooglePayCredentialManager implements MobileCredentialManager {
  private mCredential: GoogleCredential;
  private credentialStateChangeSubscription: CredentialStateChangeSubscription;

  constructor() {}

  initialize(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  setCredential(mobileCredential: MobileCredential): void {
    this.mCredential = mobileCredential as GoogleCredential;
  }
  onUiImageClicked(event?: any): void {
    // will execute
    console.log('onUiImageClicked')
    GooglePayPlugin.getGooglePayNonce().then((nonce) => {
      console.log("getGooglePayNonce: ", nonce.googlePayNonce);
    });

    // TODO: call android credential
    // TODO: call openGooglePay from Android plugin
  }
  credentialEnabled$(): Observable<boolean> {
    return of(this.mCredential.isEnabled());
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
  setCredentialStateChangeSubscrption(credentialStateChangeSubscription: CredentialStateChangeSubscription): void {
    this.credentialStateChangeSubscription = credentialStateChangeSubscription;
  }
  refresh(): void {
    //
  }
}
