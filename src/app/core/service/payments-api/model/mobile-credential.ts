import { DomainContentString } from '@sections/settings/models/setting-items-config.model';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { AndroidCredential } from './android-credentials';
import { CredentialState } from './credential-state';
import { ActivePasses, CredentialProviders, CredentialStateInterface } from './credential-utils';

export class CredentialFactory {
  static toCredential(activePasses: ActivePasses, credentialData: any): AndroidCredential {
    let credentialState = CredentialState.from(activePasses);
    if (credentialState.isHID()) {
      return new HidCredential(credentialState, credentialData);
    } else if (credentialState.isGoogle()) {
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

  getTermsConditionConfig(): DomainContentString {
    return null; // not sure if terms and conditions will be needed for nxp.
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

  getTermsConditionConfig(): DomainContentString {
    return {
      domain: CONTENT_STRINGS_DOMAINS.get_web_gui, 
      category: CONTENT_STRINGS_CATEGORIES.termsScreen,
      name: "terms"
    }; // currently using main terms and condition text, since we don't one for HID yet.
  }
}
