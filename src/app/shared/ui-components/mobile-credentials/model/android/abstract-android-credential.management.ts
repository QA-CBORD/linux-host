import { Observable, of } from 'rxjs';
import { MobileCredential } from '../shared/mobile-credential';
import { CredentialStateChangeListener, MobileCredentialManager } from '../shared/mobile-credential-manager';
import { AndroidCredential } from './android-credential.model';

export abstract class AbstractAndroidCredentialManager implements MobileCredentialManager {
  protected mCredential: AndroidCredential<any>;

  protected credentialStateChangeListener: CredentialStateChangeListener;

  constructor() {}

  refresh(): void {
    // do nothing
  }

  setCredentialStateChangeListener(credentialStateChangeSubscription: CredentialStateChangeListener): void {
    this.credentialStateChangeListener = credentialStateChangeSubscription;
  }

  protected credentialUsageContentString$(): Promise<string> {
    let text =
      'This is a generic content string describing how to use android mobile credentials; This is a generic content string describing how to use android mobile credentials';
    return of(text).toPromise();
  }

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

  abstract onUiImageClicked(event?: any): void;
}
