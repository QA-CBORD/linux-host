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
  revoked(): boolean;
  isProcessing(): boolean;
  updateUiMsg(msg: string);
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
      activePasses.credStatus.iPhone != MobileCredentialStatuses.DISABLED ||
      activePasses.credStatus.iWatch != MobileCredentialStatuses.DISABLED
    );
  }

  private static hasGoogleCredential(activePasses: ActivePasses): boolean {
    return activePasses.credStatus.android_nxp != MobileCredentialStatuses.DISABLED;
  }

  private static hasHidCredential(activePasses: ActivePasses): boolean {
    return activePasses.credStatus.android_hid != MobileCredentialStatuses.DISABLED;
  }
}

export class AndroidCredentialStateEntity implements AndroidCredentialState {
  statusMsg: string;

  constructor(
    public credStatus: MobileCredentialStatuses,
    public passes: MobileCredentialStatuses,
    public issuer: string,
    public referenceIdentifier: string
  ) {
    this.updateStatusMsg();
  }

  isProcessing(): boolean {
    return this.credStatus == MobileCredentialStatuses.PROCESSING;
  }

  providedBy(provider: CredentialProviders): boolean {
    return this.getIssuer() == provider.toString();
  }
  setStatus(status: MobileCredentialStatuses): void {
    this.credStatus = status;
  }

  getUiIconUrl(): string {
    return this.getConfig().uiHelpIcon;
  }

  updateUiMsg(msg: string) {
    this.statusMsg = msg;
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
    return this.credStatus == MobileCredentialStatuses.PROVISIONED;
  }

  revoked(): boolean {
    return this.credStatus == MobileCredentialStatuses.REVOKED;
  }

  isEnabled(): boolean {
    console.log('Credential status: ' + this.credStatus);
    return this.credStatus !== MobileCredentialStatuses.DISABLED;
  }

  isAvailable(): boolean {
    return this.credStatus == MobileCredentialStatuses.AVAILABLE;
  }

  getIssuer(): string {
    return this.issuer;
  }

  updateStatusMsg(): void {
    if (this.isProvisioned()) {
      this.statusMsg = this.getConfig().UI_MSG.WHEN_PROVISIONED;
    } else if (this.isAvailable()) {
      this.statusMsg = this.getConfig().UI_MSG.WHEN_AVAILABLE;
    } else if (this.revoked()) {
      this.statusMsg = this.getConfig().UI_MSG.WHEN_REVOKED;
    } else if (this.isProcessing()) {
      this.statusMsg = this.getConfig().UI_MSG.WHEN_PROCESSING;
    } else {
      this.statusMsg = null;
    }
  }
}

// android credentials implementations.

export abstract class AndroidCredential<T> extends MobileCredential implements AndroidCredentialAttrs {
  public credentialBundle: T;
  constructor(public credentialState: AndroidCredentialState) {
    super(credentialState);
  }

  getCredentialBundle(): any {
    return this.credentialBundle;
  }

  setCredentialBundle(data: T): void {
    this.credentialBundle = data as any;
  }

  setCredentialState(credentialState: AndroidCredentialState) {
    this.credentialState = credentialState;
  }

  getCredentialState(): AndroidCredentialState {
    return this.credentialState;
  }

  revoked(): Boolean {
    return this.credentialState.revoked();
  }

  updateUiMsg(msg: string) {
    this.credentialState.updateUiMsg(msg);
  }

  providedBy(credentialProvider: CredentialProviders) {
    return this.credentialState.providedBy(credentialProvider);
  }

  isProcessing(): boolean {
    return this.credentialState.isProcessing();
  }

  abstract getPersistable(): Persistable;

  getReferenceIdentifier(): string {
    return this.credentialState.referenceIdentifier;
  }

  getId(): string {
    return this.credentialBundle ? this.getCredentialBundle().id : null;
  }

  getCredStatus(): number {
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

export class Persistable {
  constructor(
    public id?: string,
    public endpointStatus?: number,
    public referenceIdentifier?: string,
    public userId?: string
  ) {}
}

export class HIDCredential extends AndroidCredential<HID> {
  constructor(public credentialState: AndroidCredentialState) {
    super(credentialState);
  }

  getPersistable(): Persistable {
    let { id } = this.credentialBundle;
    return new Persistable(id, 0);
  }

  getInvitationCode(): string {
    return this.credentialBundle ? this.credentialBundle.invitationCode : null;
  }
}

export class GoogleCredential extends AndroidCredential<GOOGLE> {
  constructor(public credentialState: AndroidCredentialState) {
    super(credentialState);
  }

  getPersistable(): Persistable {
    let { id } = this.credentialBundle;
    return { id };
  }
}
