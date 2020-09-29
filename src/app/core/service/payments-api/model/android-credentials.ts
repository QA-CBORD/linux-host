import { DomainContentString } from '@sections/settings/models/setting-items-config.model';
import { CredentialStateInterface, MobileCredential } from './credential-utils';

export abstract class AndroidCredential implements MobileCredential {
  protected id: string;
  private state: CredentialStateInterface;

  constructor(state: CredentialStateInterface) {
    this.state = state;
  }

  abstract getTermsConditionConfig(): DomainContentString;

  statusMsg(): string {
    return this.state.statusMsg();
  }
  isProvisioned(): boolean {
    return this.state.isProvisioned();
  }
  isEnabled(): boolean {
    return this.state.isEnabled();
  }
  canProvision(): boolean {
    return this.state.canProvision();
  }

  issuer(): string {
    return this.state.issuer();
  }

  abstract getId(): string;
}
