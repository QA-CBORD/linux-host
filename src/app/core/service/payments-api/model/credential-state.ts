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
  public credential: any = {};
  public referenceIdentifier: string;

  constructor(activePasses: ActivePasses) {
    this.checkState(activePasses);
    this.referenceIdentifier = activePasses.referenceIdentifier;
    this.updateStatusMsg();
  }

  private checkState(state: ActivePasses) {
    if (this.hasHidCredential(state)) {
      this.credential = {
        credStatus: state.credStatus.android_hid,
        passes: state.passes.android_hid,
        issuer: CredentialProviders.HID,
      };
    } else if (this.hasGoogleCredential(state)) {
      this.credential = {
        credStatus: state.credStatus.android_nxp,
        passes: state.passes.android_nxp,
        issuer: CredentialProviders.GOOGLE,
      };
    }
  }

  getCredential(): { credStatus: number; passes: number; issuer: string; statusMsg: string } {
    return this.credential;
  }

  static from(activePasses: ActivePasses): CredentialState {
    return new CredentialState(activePasses);
  }

  static buildFrom(state: {
    credential: { credStatus: number; passes: number; issuer: string; statusMsg: string };
    referenceIdentifier: string;
  }): CredentialState {
    if (state.credential.issuer == CredentialProviders.HID) {
      return CredentialState.from({
        credStatus: {
          android_hid: state.credential.credStatus,
          android_nxp: 0,
        },
        passes: {
          android_hid: state.credential.passes,
          android_nxp: 0,
        },
        referenceIdentifier: state.referenceIdentifier,
      });
    } else if (state.credential.issuer == CredentialProviders.GOOGLE) {
      return CredentialState.from({
        credStatus: {
          android_hid: 0,
          android_nxp: state.credential.credStatus,
        },
        passes: {
          android_hid: 0,
          android_nxp: state.credential.passes,
        },
        referenceIdentifier: state.referenceIdentifier,
      });
    } else {
      throw new Error('Unable to parse into ');
    }
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

  updateStatusMsg(): void {
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
    return this.getCredential().credStatus == CredentialState.IS_PROVISIONED;
  }

  isEnabled(): boolean {
    return this.getCredential().credStatus && !(this.getCredential().credStatus == CredentialState.IS_DISABLED);
  }

  canProvision(): boolean {
    return this.getCredential().credStatus == CredentialState.IS_AVAILABLE;
  }

  issuer(): string {
    return this.getCredential().issuer;
  }

  isHID(): boolean {
    return this.issuer() == CredentialProviders.HID;
  }
  isGoogle(): boolean {
    return this.issuer() == CredentialProviders.GOOGLE;
  }
}
