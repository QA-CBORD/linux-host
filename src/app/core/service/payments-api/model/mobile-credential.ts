import { AndroidCredential } from './android-credentials';
import { CredentialState } from './credential-state';
import { ActivePasses, CredentialProviders, CredentialStateInterface } from './credential-utils';

export class CredentialFactory {
  static toCredential(activePasses: ActivePasses, credentialData: any): AndroidCredential {
    let credentialState = CredentialState.from(activePasses);
    if (credentialState.isHID() && CredentialFactory.is(credentialData, CredentialProviders.HID)) {
      return new HidCredential(credentialState, credentialData);
    } else if (credentialState.isGoogle() && CredentialFactory.is(credentialData, CredentialProviders.GOOGLE)) {
      return new GoogleCredential(credentialState, credentialData);
    }
    throw new Error('There is a conflict with your mobile credentials');
  }

  static googleCredential(activePasses: ActivePasses, credentialData): GoogleCredential {
    let credentialState = CredentialState.from(activePasses);
    return new GoogleCredential(credentialState, credentialData);
  }

  static HidCredential(activePasses: ActivePasses, credentialData): HidCredential {
    let credentialState = CredentialState.from(activePasses);
    return new HidCredential(credentialState, credentialData);
  }

  private static is(data: any, credentialProvider: CredentialProviders) {
    return data.issuer === credentialProvider;
  }
}

class GoogleCredential extends AndroidCredential {
  private digitizationReference: string;
  private virtualCardUid: string;

  constructor(state: CredentialStateInterface, credentialData: any) {
    super(state);
    this.id = credentialData.id;
    this.digitizationReference = credentialData.digitizationReference;
    this.virtualCardUid = credentialData.virtualCardUid;
  }

  getId(): string {
    return this.id;
  }
  getDigitizationReference(): string {
    return this.digitizationReference;
  }

  getVirtualCardUid(): string {
    return this.virtualCardUid;
  }
}

class HidCredential extends AndroidCredential {
  private issuerToken: string;
  private invitationCode: string;
  private invitationId: number;

  constructor(state: CredentialStateInterface, credentialData: any) {
    super(state);
    this.id = credentialData.id;
    this.issuerToken = credentialData.issuerToken;
    this.invitationCode = credentialData.invitationCode;
    this.invitationId = credentialData.invitationId;
  }

  getId(): string {
    return this.id;
  }

  getIssuerToken(): string {
    return this.issuerToken;
  }

  getInvitationCode(): string {
    return this.invitationCode;
  }

  getInvitationId(): number {
    return this.invitationId;
  }
}
