import { MobileCredentialState } from '../shared/credential-state';
import { MobileCredential } from '../shared/mobile-credential';

export class AppleWalletCredential extends MobileCredential {

    getId(): string {
        return this.credentialState.getIssuer(); // not well implemented
    }

    constructor(credentialState: MobileCredentialState){
        super(credentialState);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getCredentialBundle<T>(): any {
       return null;
    }

    setCredentialBundle<T>(data: T): void {
       this.getCredentialBundle = <any>data;
    }

}