import { ModalController } from '@ionic/angular';


export interface ActivePasses {
    passes: { android_hid: number; android_nxp: number };
    referenceIdentifier: string;
    credStatus: { android_hid: number; android_nxp: number };
    deviceModel: string;
    osVersion: string;
    manufacturer: string;
  }

  

  
export enum AndroidCredentialStateMsg {
    AVAILABLE = 'Enable Mobile Credential',
    PROVISIONED = 'Mobile Credential Enabled',
  }


  export enum CredentialProviders {
    HID = 'HID',
    GOOGLE = 'ALLEGION',
  }
  

  export interface MobileCredential extends ICredential {
    getId(): string;
    showModal(controller: ModalController): Promise<any>;
  }

  
  export interface CredentialStateInterface extends ICredential {
    isHID(): boolean;
    isGoogle(): boolean;
  }

  export interface ICredential{
    statusMsg(): string;
    isProvisioned(): boolean;
    isEnabled(): boolean;
    canProvision(): boolean;
    issuer(): string;
  }



