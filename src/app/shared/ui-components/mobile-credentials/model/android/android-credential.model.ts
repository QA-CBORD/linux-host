import { AppleWalletCredentialState } from '../ios/applet-wallet-credential.state';
import { AppleWalletState } from '../ios/applet-wallet.state';
import { MobileCredentialState, MobileCredentialStatuses } from '../shared/credential-state';
import { ActivePasses, CredentialProviders } from '../shared/credential-utils';
import { MobileCredential } from '../shared/mobile-credential';
import { MobileCredentialConfig, MOBILE_CREDENTIAL_CONFIGS } from '../shared/mobile-credential-configs';

export interface AndroidCredentialAttrs {
  credentialBundle: any;
  credentialState: AndroidCredentialState;
}

export interface AndroidCredentialState extends MobileCredentialState {
  referenceIdentifier: string;
  statusMsg: string;
  credStatus: number;
  passes: number;
  issuer: string;
}

export class CredentialStateResolver {
  private constructor() {}

  static fromActivePasses(activePasses: ActivePasses): MobileCredentialState {
    if (CredentialStateResolver.hasHidCredential(activePasses)) {
      return new AndroidCredentialStateEntity(
        activePasses.credStatus.android_hid,
        activePasses.passes.android_hid,
        CredentialProviders.HID,
        activePasses.referenceIdentifier
      );
    } else if (CredentialStateResolver.hasGoogleCredential(activePasses)) {
      return new AndroidCredentialStateEntity(
        activePasses.credStatus.android_nxp,
        activePasses.passes.android_nxp,
        CredentialProviders.GOOGLE,
        activePasses.referenceIdentifier
      );
    } else if (CredentialStateResolver.hasAppleWallet(activePasses)) {
      return new AppleWalletState(activePasses);
    }
  }

  private static hasAppleWallet(activePasses: ActivePasses): boolean {
    return (
      activePasses.credStatus.iPhone == MobileCredentialStatuses.IS_AVAILABLE ||
      activePasses.credStatus.iPhone == MobileCredentialStatuses.IS_PROVISIONED ||
      (activePasses.credStatus.iWatch == MobileCredentialStatuses.IS_AVAILABLE ||
        activePasses.credStatus.iWatch == MobileCredentialStatuses.IS_PROVISIONED)
    );
  }

  private static hasGoogleCredential(activePasses: ActivePasses): boolean {
    return (
      activePasses.credStatus.android_nxp == MobileCredentialStatuses.IS_AVAILABLE ||
      activePasses.credStatus.android_nxp == MobileCredentialStatuses.IS_PROVISIONED
    );
  }

  private static hasHidCredential(activePasses: ActivePasses): boolean {
    return (
      activePasses.credStatus.android_hid == MobileCredentialStatuses.IS_AVAILABLE ||
      activePasses.credStatus.android_hid == MobileCredentialStatuses.IS_PROVISIONED
    );
  }
}

export class AndroidCredentialStateEntity implements AndroidCredentialState {
  statusMsg: string;

  constructor(
    public credStatus: number,
    public passes: number,
    public issuer: string,
    public referenceIdentifier: string
  ) {
    this.updateStatusMsg();
  }

  providedBy(provider: CredentialProviders): boolean {
    return this.getIssuer() == provider.toString();
  }
  setStatus(status: number): void {
    this.credStatus = status;
  }

  getUiIconUrl(): string {
    return this.getConfig().uiHelpIcon;
  }

  isHID(): boolean {
    return this.getIssuer() == CredentialProviders.HID;
  }
  isGOOGLE(): boolean {
    return this.getIssuer() == CredentialProviders.GOOGLE;
  }

  getConfig(): MobileCredentialConfig {
    return MOBILE_CREDENTIAL_CONFIGS[this.getIssuer()];
  }

  getStatusMsg(): string {
    return this.statusMsg;
  }
  isProvisioned(): boolean {
    return this.credStatus == MobileCredentialStatuses.IS_PROVISIONED;
  }

  isEnabled(): boolean {
    return this.credStatus != MobileCredentialStatuses.IS_DISABLED;
  }

  isAvailable(): boolean {
    return this.credStatus == MobileCredentialStatuses.IS_AVAILABLE;
  }

  getIssuer(): string {
    return this.issuer;
  }

  updateStatusMsg(): void {
    this.statusMsg = this.isProvisioned()
      ? this.getConfig().UI_MSG.WHEN_PROVISIONED
      : this.isAvailable()
      ? this.getConfig().UI_MSG.WHEN_AVAILABLE
      : null;
  }
}

// android credentials implementations.

export abstract class AndroidCredential<T> extends MobileCredential implements AndroidCredentialAttrs {
  public credentialBundle: T;
  constructor(public credentialState: AndroidCredentialState) {
    super(credentialState);
  }

  getCredentialBundle<T>(): T {
    return this.credentialBundle as any;
  }

  setCredentialBundle<T>(data: T): void {
    this.credentialBundle = <any>data;
  }

  getCredentialState(): AndroidCredentialState {
    return this.credentialState;
  }

  providedBy(credentialProvider: CredentialProviders){
    return this.credentialState.providedBy(credentialProvider);
  }

  abstract getPersistable(): T;

  getReferenceIdentifier(): string{
    return this.credentialState.referenceIdentifier;
  }

  getId(): string{
    return this.credentialBundle ? this.getCredentialBundle<any>().id : null;
  }

  getCredStatus(): number{
    return this.credentialState.credStatus;
  }

}

export interface HID extends Persistable {
  invitationId: number;
  issuerToken: string;
  invitationCode: string;
  issuer: string;
}

export interface GOOGLE extends Persistable {
  virtualCardUid: string;
  digitizationReference: string;
  issuer: string;
}

export interface Persistable {
  id: string;
  referenceIdentifier?: string;
}

export class HIDCredential extends AndroidCredential<HID> {
  constructor(public credentialState: AndroidCredentialState) {
    super(credentialState);
  }

  getPersistable<T>(): T {
    let { id, issuer } = this.credentialBundle;
    let { referenceIdentifier } = this.credentialState;
    return <any>{ id, issuer, referenceIdentifier };
  }

  getInvitationCode():string{
    return this.credentialBundle ? this.credentialBundle.invitationCode : null;
  }
}

export class GoogleCredential extends AndroidCredential<GOOGLE> {
  constructor(public credentialState: AndroidCredentialState) {
    super(credentialState);
  }

  getPersistable<T>(): T {
    let { id, virtualCardUid, digitizationReference, issuer } = this.credentialBundle;
    let { referenceIdentifier } = this.credentialState;
    return <any>{ id, virtualCardUid, digitizationReference, issuer, referenceIdentifier };
  }
}
