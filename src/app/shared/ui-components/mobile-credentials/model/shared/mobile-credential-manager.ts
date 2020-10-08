import { Observable } from 'rxjs';
import { MobileCredential } from './mobile-credential';

export interface MobileCredentialManagerAdapter{
    
}


export interface CredentialStateChangeSubscription{
    onCredentialStateChanged(): void;
  }

export interface MobileCredentialManager extends MobileCredentialManagerAdapter{
    initialize(): Promise<any>;
    setCredential(mobileCredential: MobileCredential): void;
    onUiImageClicked(event?: any): void;
    credentialEnabled$(): Observable<boolean>;
    credentialAvailable$(): Observable<boolean>;
    getCredential(): MobileCredential;
    onUiIconClicked(): void;
    setCredentialStateChangeSubscrption(credentialStateChangeSubscription: CredentialStateChangeSubscription): void;
    refresh(): void;
}
