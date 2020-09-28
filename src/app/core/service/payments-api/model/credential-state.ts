import {
  ActivePasses,
  AndroidCredentialStateMsg,
  CredentialProviders,
  CredentialStateInterface,
} from './credential-utils';

export class CredentialState implements CredentialStateInterface {
  static IS_AVAILABLE = 1;
  static IS_PROVISIONED = 20;
  static IS_DISABLED = 0;
  private credential: any = {};

  constructor(activePasses: ActivePasses) {
    this.checkState(activePasses);
  }

  private checkState(activePasses: ActivePasses) {
    if (this.hasHidCredential(activePasses)) {
      this.credential = {
        credStatus: activePasses.credStatus.android_hid,
        passes: activePasses.passes.android_hid,
        issuer: CredentialProviders.HID,
      };
    } else if (this.hasGoogleCredential(activePasses)) {
      this.credential = {
        credStatus: activePasses.credStatus.android_nxp,
        passes: activePasses.passes.android_nxp,
        issuer: CredentialProviders.GOOGLE,
      };
    }
    console.log(this.credential);
    this.setStatusMsg();
  }

  getCredential(): { credStatus: number; passes: number; issuer: string; statusMsg: string } {
    return this.credential;
  }

  static from(activePasses: ActivePasses): CredentialState {
    return new CredentialState(activePasses);
  }

  private hasGoogleCredential(activePasses: ActivePasses): boolean {
    return (
      activePasses.credStatus.android_nxp == CredentialState.IS_AVAILABLE ||
      activePasses.credStatus.android_nxp == CredentialState.IS_PROVISIONED
    );
  }

  private hasHidCredential(activePasses: ActivePasses): boolean {
    return (
      activePasses.credStatus.android_hid == CredentialState.IS_AVAILABLE ||
      activePasses.credStatus.android_hid == CredentialState.IS_PROVISIONED
    );
  }

  protected setStatusMsg(): void {
    this.getCredential().statusMsg = this.isProvisioned()
      ? AndroidCredentialStateMsg.PROVISIONED
      : this.canProvision()
      ? AndroidCredentialStateMsg.AVAILABLE
      : null;
  }

  statusMsg(): string {
    return this.getCredential().statusMsg;
  }
  isProvisioned(): boolean {
    return this.getCredential().credStatus === CredentialState.IS_PROVISIONED;
  }

  isEnabled(): boolean {
    return this.getCredential().credStatus && !(this.getCredential().credStatus === CredentialState.IS_DISABLED);
  }

  canProvision(): boolean {
    return this.getCredential().credStatus === CredentialState.IS_AVAILABLE;
  }

  issuer(): string {
    return this.getCredential().issuer;
  }

  isHID(): boolean {
    return this.issuer() === CredentialProviders.HID;
  }
  isGoogle(): boolean {
    return this.issuer() === CredentialProviders.GOOGLE;
  }
}
