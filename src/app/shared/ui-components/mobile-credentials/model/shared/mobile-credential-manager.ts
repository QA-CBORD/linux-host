import { Observable } from 'rxjs';
import { MobileCredential } from './mobile-credential';

export interface MobileCredentialManagerAdapter {}

export interface CredentialStateChangeListener {
  onCredentialStateChanged(): void;
}

export interface MobileCredentialManager extends MobileCredentialManagerAdapter {
  setCredential(mobileCredential: MobileCredential): void;
  onUiImageClicked(event?: any): void;
  credentialEnabled$(): Observable<boolean>;
  credentialAvailable$(): Observable<boolean>;
  getCredential(): MobileCredential;
  onUiIconClicked(): void;
  setCredentialStateChangeListener(CredentialStateChangeListener: CredentialStateChangeListener): void;
  refresh(): void;
}
