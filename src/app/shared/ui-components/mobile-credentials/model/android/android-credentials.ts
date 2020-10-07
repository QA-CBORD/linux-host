import { MobileCredentialState } from '../shared/credential-state';
import { ActivePasses, CredentialProviderEnum } from '../shared/credential-utils';
import { MobileCredential } from '../shared/mobile-credential';
import {  MobileCredentialConfig, MOBILE_CREDENTIAL_CONFIGS } from '../shared/mobile-credential-configs';


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
  private constructor() {}

  static from(data: ActivePasses | AndroidCredentialAttrs): AndroidCredentialStateEntity {
    const me = AndroidCredentialStateResolver;
    if('referenceIdentifier' in data) {
       return me.resolveStateFromActivePasses(<ActivePasses>data);
    }
    const state = (<AndroidCredentialAttrs>data).credentialState;
    return new AndroidCredentialStateEntity(state.credStatus, state.passes, state.issuer, state.referenceIdentifier);
  }

  private static resolveStateFromActivePasses(activePasses: ActivePasses): AndroidCredentialStateEntity {
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
      activePasses.credStatus.android_nxp == AndroidCredentialStateEntity.IS_AVAILABLE ||
      activePasses.credStatus.android_nxp == AndroidCredentialStateEntity.IS_PROVISIONED
    );
  }

  private static hasHidCredential(activePasses: ActivePasses): boolean {
    return (
      activePasses.credStatus.android_hid == AndroidCredentialStateEntity.IS_AVAILABLE ||
      activePasses.credStatus.android_hid == AndroidCredentialStateEntity.IS_PROVISIONED
    );
  }
}

export class AndroidCredentialStateEntity implements AndroidCredentialState {
  
  static IS_AVAILABLE = 1;
  static IS_PROVISIONED = 20;
  static IS_DISABLED = 0;

  statusMsg: string;

  constructor(
    public credStatus: number,
    public passes: number,
    public issuer: string,
    public referenceIdentifier: string
  ) {
    this.updateStatusMsg();
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
    console.log('getting config for: ' + this.getIssuer())
    return MOBILE_CREDENTIAL_CONFIGS[this.getIssuer()];
  }

  getStatusMsg(): string {
    return this.statusMsg;
  }
  isProvisioned(): boolean {
    return this.credStatus == AndroidCredentialStateEntity.IS_PROVISIONED;
  }

  isEnabled(): boolean {
    return this.credStatus != AndroidCredentialStateEntity.IS_DISABLED;
  }

  isAvailable(): boolean {
    return this.credStatus == AndroidCredentialStateEntity.IS_AVAILABLE;
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

export interface HID {
  id: string;
  invitationId: number;
  invitationCode: string;
  issuer: string;
  issuerToken: string;
}

interface GOOGLE {
  id: string;
  virtualCardUid: string;
  digitizationReference: string;
}


export abstract class AndroidCredential<T> extends MobileCredential implements AndroidCredentialAttrs{
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

  getCredentialState():AndroidCredentialState{
    return this.credentialState;
  }

  isHID(): boolean{
    return this.credentialState.isHID();
  }

  isGOOGLE(): boolean{
    return this.credentialState.isGOOGLE();
  }
}

export class HIDCredential extends AndroidCredential<HID> {
  constructor(public credentialState: AndroidCredentialState, data?: any) {
    super(credentialState);
    if( data ){
      this.credentialData = data;
    }
  }
}

export class GoogleCredential extends AndroidCredential<GOOGLE>  {
  constructor(public credentialState: AndroidCredentialState) {
    super(credentialState);
  }

}
