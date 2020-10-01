import { DomainContentString } from '@sections/settings/models/setting-items-config.model';


export interface ActivePasses {
    passes: CredentialStatus;
    referenceIdentifier: string;
    credStatus: CredentialStatus;
    deviceModel?: string;
    osVersion?: string;
    manufacturer?: string;
  }

  
export interface CredentialStatus{
  android_hid: number; 
  android_nxp: number;
  statusMsg?: string;
  issuer?: string;
}

export enum AndroidCredentialStateMsg {
    AVAILABLE = 'Enable Mobile Credential',
    PROVISIONED = 'Start scan whoohoo',
  }


  export enum CredentialProviders {
    HID = 'HID',
    GOOGLE = 'ALLEGION',
  }
  

  export interface MobileCredential extends ICredential {
    getId(): string;
    getTermsConditionConfig(): DomainContentString | any;
  }

  
  export interface CredentialStateInterface extends ICredential {
    isHID(): boolean;
    isGoogle(): boolean;
    referenceIdentifier:string
  }

  export interface ICredential{
    statusMsg(): string;
    isProvisioned(): boolean;
    isEnabled(): boolean;
    canProvision(): boolean;
    issuer(): string;
  }


  export enum HIDPluginEvents{
    INSTALL_SUCCESS = "installation_successful",
    INSTALL_FAILURE = "installation_failure",
    STARTUP_SUCCESS = "startup_successful",
    STARTUP_FAILURE = "startup_failure",
  }



