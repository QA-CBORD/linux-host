import { AppleWalletState } from '../ios/applet-wallet.state';
import { EndpointStatuses, MobileCredentialState, MobileCredentialStatuses } from '../shared/credential-state';
import { ActivePasses, CredentialProviders } from '../shared/credential-utils';
import { MobileCredential } from '../shared/mobile-credential';
import { MobileCredentialConfig, MOBILE_CREDENTIAL_CONFIGS } from '../shared/mobile-credential-configs';
import { CredentialStatusCs } from './android-credential-content-strings.model';


export interface CredentialBundle {
  id?: string;
}

export interface HidCredentialBundle extends CredentialBundle {
  invitationCode: string;
  invitationId: string;
  issuer: string;
  issuerToken: string
}


export interface GooglePayCredentialBundle extends CredentialBundle {
  digitizationReference: string;
  virtualCardUid: string;
}

export interface AndroidCredentialAttrs {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  credentialBundle: any;
  credentialState: AndroidCredentialState;
}

export interface AndroidCredentialState extends MobileCredentialState {
  referenceIdentifier: string;
  statusMsg: string;
  credStatus: number;
  passes: number;
  issuer: string;
  endpointState: EndpointState;
  setUiString$?: (cs: CredentialStatusCs) => void;
  revoked(): boolean;
  isProcessing(): boolean;
  updateUiMsg(msg: string);
}

export class CredentialStateResolver {

  static fromActivePasses(activePasses: ActivePasses): MobileCredentialState {
    if (CredentialStateResolver.hasHidSeosCredential(activePasses)) {
      return new AndroidCredentialStateEntity(
        activePasses.credStatus.android_hid,
        activePasses.passes.android_hid,
        CredentialProviders.HID,
        activePasses.referenceIdentifier
      );
    } else if (CredentialStateResolver.hasHidWalletCredential(activePasses)) {
      return new AndroidCredentialStateEntity(
        activePasses.credStatus.android_hid_wallet,
        activePasses.passes.android_hid_wallet,
        CredentialProviders.HID_WALLET,
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

  private static hasHidSeosCredential(activePasses: ActivePasses): boolean {
    return activePasses.credStatus.android_hid != MobileCredentialStatuses.DISABLED;
  }

  private static hasHidWalletCredential(activePasses: ActivePasses): boolean {
    return activePasses.credStatus.android_hid_wallet != MobileCredentialStatuses.DISABLED;
  }
}

export class AndroidCredentialStateEntity implements AndroidCredentialState {
  statusMsg: string;
  endpointState: EndpointState;
  private contentString$: CredentialStatusCs;
  constructor(
    public credStatus: MobileCredentialStatuses,
    public passes: MobileCredentialStatuses,
    public issuer: string,
    public referenceIdentifier: string
  ) {
    this.updateStatusMsg();
  }

  setEndpointState(state: EndpointState): void {
    this.endpointState = state;
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
    return this.credStatus !== MobileCredentialStatuses.DISABLED;
  }

  isAvailable(): boolean {
    return this.credStatus == MobileCredentialStatuses.AVAILABLE;
  }

  isCreated(): boolean {
    return this.credStatus == MobileCredentialStatuses.CREATED;
  }

  setUiString$(cs: CredentialStatusCs): void {
    this.contentString$ = cs;
    this.updateStatusMsg();
  }

  getIssuer(): string {
    return this.issuer;
  }

  updateStatusMsg(): void {
    if (this.contentString$) {
      this.statusMsg = this.contentString$.statusText(this.isHID(), this.credStatus);
    } else if (this.isProvisioned()) {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class AndroidCredential<T> extends MobileCredential implements AndroidCredentialAttrs {
  public credentialBundle: CredentialBundle;

  constructor(public credentialState: AndroidCredentialState) {
    super(credentialState);
  }

  getCredentialBundle(): CredentialBundle {
    return this.credentialBundle;
  }

  setUicString$(cs: CredentialStatusCs): void {
    this.credentialState.setUiString$(cs);
  }

  setCredentialBundle(bundle: CredentialBundle): void {
    this.credentialBundle = bundle;
  }

  setCredentialState(credentialState: AndroidCredentialState) {
    this.credentialState = credentialState;
  }

  getCredentialState(): AndroidCredentialState {
    return this.credentialState;
  }

  revoked(): boolean {
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

  endpointState(): EndpointState {
    return this.credentialState.endpointState;
  }

  setEndpointState(endpointState: EndpointState): void {
    this.credentialState.endpointState = endpointState;
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
    public status?: number,
    public referenceIdentifier?: string,
    public userId?: string
  ) { }
}

export class HIDCredential extends AndroidCredential<HID> {
  constructor(public credentialState: AndroidCredentialState) {
    super(credentialState);
  }

  getPersistable(): Persistable {
    const { id } = this.credentialBundle;
    return new Persistable(id, MobileCredentialStatuses.PROCESSING);
  }

  getInvitationCode(): string {
    return this.credentialBundle ? (this.credentialBundle as HidCredentialBundle).invitationCode : null;
  }
}

export class GoogleCredential extends AndroidCredential<GOOGLE> {
  constructor(public credentialState: AndroidCredentialState) {
    super(credentialState);
  }

  getPersistable(): Persistable {
    const { id } = this.credentialBundle;
    return { id };
  }
}

export class EndpointState {
  constructor(public status: EndpointStatuses, public id?: string, public userId?: string) { }

  setStatus(status: EndpointStatuses): void {
    this.status = status;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  static from(data: Persistable): EndpointState {
    return new EndpointState(data.status, data.id, data.userId);
  }

  isRevoked(): boolean {
    return this.status == EndpointStatuses.REVOKED;
  }

  isProvisioned(): boolean {
    return this.status == EndpointStatuses.PROVISIONED_ACTIVE;
  }

  isInactive(): boolean {
    return this.status == EndpointStatuses.PROVISIONED_INACTIVE;
  }

  isProcessing(): boolean {
    return this.status == EndpointStatuses.PROVISIONED_PROCESSING;
  }

  notSetup(): boolean {
    return this.status == EndpointStatuses.NOT_SETUP;
  }

  equal(other: EndpointState): boolean {
    return this.status == other.status;
  }

  deletionPermissionGranted(): boolean {
    return this.status == EndpointStatuses.DELETE_CONFIRMED;
  }

  notEqual(other: EndpointState) {
    return !this.equal(other);
  }
}
