import { MobileCredentialState, MobileCredentialStatuses } from './credential-state';
import { CredentialProviders } from './credential-utils';
import { MobileCredentialConfig } from './mobile-credential-configs';

export abstract class MobileCredential implements MobileCredentialState {

  constructor(public credentialState: MobileCredentialState) {}

  providedBy(provider: CredentialProviders): boolean {
    return  this.credentialState.providedBy(provider);
  }

  getUiIconUrl(): string {
    return this.credentialState.getUiIconUrl();
  }

  setStatus(status: MobileCredentialStatuses): void{
    this.credentialState.setStatus(status);
    this.updateStatusMsg()
  }

  updateStatusMsg(): void {
    return this.credentialState.updateStatusMsg();
  }
  getStatusMsg(): string {
    return this.credentialState.getStatusMsg();
  }
  isProvisioned(): boolean {
    return this.credentialState.isProvisioned();
  }
  isEnabled(): boolean {
    return this.credentialState.isEnabled();
  }
  isAvailable(): boolean {
    return this.credentialState.isAvailable();
  }
  getIssuer(): string {
    return this.credentialState.getIssuer();
  }

  getConfig(): MobileCredentialConfig {
    return this.credentialState.getConfig();
  }
  getCredentialState(): MobileCredentialState {
    return this.credentialState;
  }

  getUiImageUrl(): string {
    return this.getConfig().uiImageUrl;
  }

  getProvider(): string{
    return this.getIssuer();
  }

  abstract getId():string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract getCredentialBundle(): any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract setCredentialBundle(data: any): void;
}
