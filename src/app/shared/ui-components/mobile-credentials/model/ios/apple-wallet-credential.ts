import { MobileCredentialState } from '../shared/credential-state';
import { MobileCredential } from '../shared/mobile-credential';

export class AppleWalletCredential extends MobileCredential {

    constructor(credentialState: MobileCredentialState){
        super(credentialState);
    }

    getCredentialData<T>(): any {
       return null;
    }

    setCredentialData<T>(data: T): void {
       this.getCredentialData = <any>data;
    }

}