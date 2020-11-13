import { MobileCredentialState, MobileCredentialStatuses } from '../shared/credential-state';
import { ActivePasses, CredentialProviders, MobileCredentialProvider } from '../shared/credential-utils';
import { MobileCredentialConfig, MOBILE_CREDENTIAL_CONFIGS } from '../shared/mobile-credential-configs';

export class AppleWalletState implements MobileCredentialState {
  constructor(private activePasses: ActivePasses) {}

  providedBy(provider: CredentialProviders): boolean {
    return provider == CredentialProviders.APPLE;
  }

  updateStatusMsg(): void {}
  getStatusMsg(): string {
    return null; // for now
  }

  isProvisioned(): boolean {
    // is everything provisioned already, watch, iphone, etc.
    return (
      this.activePasses.credStatus.iPhone == MobileCredentialStatuses.IS_PROVISIONED &&
      this.activePasses.credStatus.iWatch == MobileCredentialStatuses.IS_PROVISIONED
    );
  }

  isEnabled(): boolean {
    return this.isAvailable() || this.isProvisioned();
  }

  isAvailable(): boolean {
    return (
      this.activePasses.credStatus.iPhone == MobileCredentialStatuses.IS_AVAILABLE ||
      this.activePasses.credStatus.iWatch == MobileCredentialStatuses.IS_AVAILABLE
    );
  }

  getIssuer(): string {
    return CredentialProviders.APPLE;
  }

  getConfig(): MobileCredentialConfig {
    return MOBILE_CREDENTIAL_CONFIGS[this.getIssuer()];
  }
  getUiIconUrl(): string {
    throw new Error('Method not implemented.');
  }
  setStatus(status: number): void {}

  iWatchPaired(): boolean {
    return this.activePasses.credStatus.iWatch == MobileCredentialStatuses.IS_PROVISIONED;
  }

  iPhoneProvisioned(): boolean {
    return this.activePasses.credStatus.iPhone == MobileCredentialStatuses.IS_PROVISIONED;
  }
}
