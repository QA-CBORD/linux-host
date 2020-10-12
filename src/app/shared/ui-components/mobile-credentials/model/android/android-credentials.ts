import { MobileCredentialState, MobileCredentialStateEnum } from '../shared/credential-state';
import { ActivePasses, CredentialProviderEnum } from '../shared/credential-utils';
import { MobileCredential } from '../shared/mobile-credential';
import { MobileCredentialConfig, MOBILE_CREDENTIAL_CONFIGS } from '../shared/mobile-credential-configs';

export interface AndroidCredentialAttrs {
  credentialData: any;
  credentialState: AndroidCredentialState;
}

export interface AndroidCredentialState extends MobileCredentialState {
  referenceIdentifier: string;
  statusMsg: string;
  credStatus: number;
  passes: number;
  issuer: string;
  isHID(): boolean;
  isGOOGLE(): boolean;
}

export class AndroidCredentialStateResolver {
  private constructor(s) {}

  static resolveStateFromActivePasses(activePasses: ActivePasses): AndroidCredentialStateEntity {
    const me = AndroidCredentialStateResolver;
    if (me.hasHidCredential(activePasses)) {
      return new AndroidCredentialStateEntity(
        activePasses.credStatus.android_hid,
        activePasses.passes.android_hid,
        CredentialProviderEnum.HID,
        activePasses.referenceIdentifier
      );
    } else if (me.hasGoogleCredential(activePasses)) {
      return new AndroidCredentialStateEntity(
        activePasses.credStatus.android_nxp,
        activePasses.passes.android_nxp,
        CredentialProviderEnum.GOOGLE,
        activePasses.referenceIdentifier
      );
    }
  }

  private static hasGoogleCredential(activePasses: ActivePasses): boolean {
    return (
      activePasses.credStatus.android_nxp == MobileCredentialStateEnum.IS_AVAILABLE ||
      activePasses.credStatus.android_nxp == MobileCredentialStateEnum.IS_PROVISIONED
    );
  }

  private static hasHidCredential(activePasses: ActivePasses): boolean {
    return (
      activePasses.credStatus.android_hid == MobileCredentialStateEnum.IS_AVAILABLE ||
      activePasses.credStatus.android_hid == MobileCredentialStateEnum.IS_PROVISIONED
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
  setStatus(status: number): void {
    this.credStatus = status;
  }

  getUiIconUrl(): string {
    return this.getConfig().uiHelpIcon;
  }

  isHID(): boolean {
    return this.getIssuer() == CredentialProviderEnum.HID;
  }
  isGOOGLE(): boolean {
    return this.getIssuer() == CredentialProviderEnum.GOOGLE;
  }

  getConfig(): MobileCredentialConfig {
    return MOBILE_CREDENTIAL_CONFIGS[this.getIssuer()];
  }

  getStatusMsg(): string {
    return this.statusMsg;
  }
  isProvisioned(): boolean {
    return this.credStatus == MobileCredentialStateEnum.IS_PROVISIONED;
  }

  isEnabled(): boolean {
    return this.credStatus != MobileCredentialStateEnum.IS_DISABLED;
  }

  isAvailable(): boolean {
    return this.credStatus == MobileCredentialStateEnum.IS_AVAILABLE;
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
  public credentialData: T;
  constructor(public credentialState: AndroidCredentialState) {
    super(credentialState);
  }

  

  getCredentialData<T>(): T {
    return this.credentialData as any;
  }

  setCredentialData<T>(data: T): void {
    this.credentialData = <any>data;
  }

  getCredentialState(): AndroidCredentialState {
    return this.credentialState;
  }

  isHID(): boolean {
    return this.credentialState.isHID();
  }

  isGoogle(): boolean {
    return this.credentialState.isGOOGLE();
  }
  abstract getPersistable<T>(): T;
}

export interface HIDPersistable extends Persistable {
  invitationCode: string;
  issuer: string;
}

export interface HID extends HIDPersistable{
  invitationId: number;
  issuerToken: string;
}

export interface GOOGLEPersistable extends Persistable{
  virtualCardUid: string;
  digitizationReference: string;
  issuer: string;
}

export interface GOOGLE extends GOOGLEPersistable{}

export interface Persistable{
  id: string;
  referenceIdentifier: string;
}

export class HIDCredential extends AndroidCredential<HID> {
  constructor(public credentialState: AndroidCredentialState) {
    super(credentialState);
  }

  getPersistable<T>(): T {
    let { id, invitationCode, issuer } = this.credentialData;
    let { referenceIdentifier } = this.credentialState;
    return <any>{ id, invitationCode, issuer, referenceIdentifier };
  }
}

export class GoogleCredential extends AndroidCredential<GOOGLE> {
  constructor(public credentialState: AndroidCredentialState) {
    super(credentialState);
  }

  getPersistable<T>(): T {
    let { id, virtualCardUid, digitizationReference, issuer } = this.credentialData;
    let { referenceIdentifier } = this.credentialState;
    return <any>{ id, virtualCardUid, digitizationReference, issuer, referenceIdentifier };
  }
}
