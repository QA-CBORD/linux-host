import { MobileCredentialState } from '../shared/credential-state';
import { MobileCredential } from '../shared/mobile-credential';

export class AppleWalletCredential extends MobileCredential {

    getId(): string {
        return this.credentialState.getIssuer(); // not well implemented
    }

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