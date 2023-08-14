import { AppleWalletCredentialStatus, AppleWalletInfo } from '@core/provider/native-provider/native.provider';
import { MobileCredentialState } from '../shared/credential-state';
import { CredentialProviders } from '../shared/credential-utils';
import { MOBILE_CREDENTIAL_CONFIGS, MobileCredentialConfig } from '../shared/mobile-credential-configs';

export class AppleWalletCredentialState implements MobileCredentialState {
  private cardStatusMessage: string;
  private appleWalletMessageImage: string;
  private appleWalletEnabled = false;
  private appleWalletButtonHidden: boolean;

  constructor(private appleWalletInfo: AppleWalletInfo) {
    this.setAppleWalletMessage();
  }

  setStatus(): void {
    throw new Error('Method not implemented.');
  }

  revoked(): boolean {
    return false;
  }

  providedBy(provider: CredentialProviders): boolean {
     return provider == CredentialProviders.APPLE;
  }

  getUiIconUrl(): string {
    return this.appleWalletMessageImage ? `/assets/images/${this.appleWalletMessageImage}.png` : null;
  }

  updateStatusMsg(): void {
    this.setAppleWalletMessage();
  }

  getStatusMsg(): string {
    return this.cardStatusMessage;
  }

  isProvisioned(): boolean {
    return this.appleWalletEnabled && this.appleWalletButtonHidden;
  }

  isEnabled(): boolean {
    return this.appleWalletEnabled;
  }

  isAvailable(): boolean {
    return !this.appleWalletButtonHidden;
  }

  getIssuer(): string {
    return CredentialProviders.APPLE;
  }

  getConfig(): MobileCredentialConfig {
    return MOBILE_CREDENTIAL_CONFIGS[this.getIssuer()];
  }

  private setAppleWalletMessage() {
    if (this.appleWalletInfo && this.appleWalletInfo.isAppleWalletEnabled && this.appleWalletInfo.canAddPass) {
      this.appleWalletEnabled = this.appleWalletInfo.isAppleWalletEnabled;
      const isIPhoneAlreadyProvisioned = this.appleWalletInfo.iPhoneProvisioned;
      const isWatchPaired = this.appleWalletInfo.watchPaired;
      const isIWatchAlreadyProvisioned = this.appleWalletInfo.watchProvisioned;
      const watchCredStatus = this.appleWalletInfo.watchCredStatus;
      const iPhoneCredStatus = this.appleWalletInfo.iPhoneCredStatus;

      /// code ported from iOS with some unused parts left commented out, which we might use later
      if (isIPhoneAlreadyProvisioned && !isWatchPaired) {
        //no watch, only phone
        this.appleWalletMessageImage = 'iphonex';
        this.cardStatusMessage = 'Added to iPhone';
        this.appleWalletButtonHidden = true;
      } else if (isIPhoneAlreadyProvisioned && isWatchPaired && !isIWatchAlreadyProvisioned) {
        this.appleWalletMessageImage = 'iphonex';
        this.cardStatusMessage = 'Added to iPhone';
        this.appleWalletButtonHidden = watchCredStatus == AppleWalletCredentialStatus.Disabled;
      } else if (isWatchPaired && isIWatchAlreadyProvisioned && !isIPhoneAlreadyProvisioned) {
        this.appleWalletMessageImage = 'applewatch';
        this.cardStatusMessage = 'Added to Watch';
        this.appleWalletButtonHidden = iPhoneCredStatus == AppleWalletCredentialStatus.Disabled;
      } else if (isIPhoneAlreadyProvisioned && isIWatchAlreadyProvisioned && isWatchPaired) {
        this.cardStatusMessage = 'Added to iPhone and Watch';
        this.appleWalletMessageImage = 'iphonex_applewatch';
        this.appleWalletButtonHidden = true;
      } else {
        this.cardStatusMessage = 'Card not added to Wallet';
        this.appleWalletMessageImage = null;
        this.appleWalletButtonHidden = false;
      }
    } else {
      this.cardStatusMessage = null;
      this.appleWalletMessageImage = null;
      this.appleWalletButtonHidden = true;
      this.appleWalletEnabled = false;
    }
  }
}
