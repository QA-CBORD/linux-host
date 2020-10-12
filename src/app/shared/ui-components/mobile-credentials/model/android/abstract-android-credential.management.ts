import { Observable, of } from 'rxjs';
import { MobileCredential } from '../shared/mobile-credential';
import { CredentialStateChangeSubscription, MobileCredentialManager } from '../shared/mobile-credential-manager';
import { AndroidCredential } from './android-credentials';

export abstract class AbstractAndroidCredentialManager implements MobileCredentialManager {
  protected mCredential: AndroidCredential<any>;

  protected credentialStateChangeSubscription: CredentialStateChangeSubscription;

  constructor() {}

  refresh(): void {
    // do nothing
  }

  setCredentialStateChangeSubscrption(credentialStateChangeSubscription: CredentialStateChangeSubscription): void {
    this.credentialStateChangeSubscription = credentialStateChangeSubscription;
  }

  get credentialUsageContentString$(): Promise<string> {
    let text =
      'This is a generic content string describing how to use android mobile credentials; This is a generic content string describing how to use android mobile credentials; This is a generic content string describing how to use android mobile credentials';
    return of(text).toPromise();
  }

  abstract onDeleteCredential(event?: any): void;

  abstract onUiIconClicked(): void;

  getCredential(): MobileCredential {
    return this.mCredential;
  }

  credentialAvailable$(): Observable<boolean> {
    return of(this.mCredential.isAvailable());
  }

  setCredential(mobileCredential: AndroidCredential<any>): void {
    this.mCredential = mobileCredential;
  }

  abstract credentialEnabled$(): Observable<boolean>;

  isMobileCredentialEnabled(): boolean {
    return this.mCredential.isEnabled();
  }
  
  abstract onUiImageClicked(event?: any): void;

  abstract onTermsAndConditionsAccepted(): void;
  abstract onTermsAndConditionsDeclined(): void;
  abstract get termsAndConditions$(): Promise<string>;
}
