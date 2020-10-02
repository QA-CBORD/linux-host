import { AccessCardComponent } from '@sections/dashboard/containers/access-card/access-card.component';
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
     INSTALL_SUCCESS="INSTALL_SUCCESS",
     INSTALL_FAILURE="INSTALL_FAILURE",
     STARTUP_SUCCESS="STARTUP_SUCCESS",
     STARTUP_FAILURE="STARTUP_FAILURE",
     DUPLICATED_CREDENTIAL="DUPLICATED_CREDENTIAL",
     INACTIVE_CREDENTIAL="INACTIVE_CREDENTIAL",
     ENDPOINT_NOT_SETUP="ENDPOINT_NOT_SETUP",
     ENDPOINT_DELETE_FAILURE="ENDPOINT_DELETE_FAILURE",
     ENDPOINT_DELETE_SUCCESS="ENDPOINT_DELETE_SUCCESS"
  }

  const event = HIDPluginEvents;


  export class HandlerUtil{

    constructor(){
      
    }
  }


  export class HIDPlugginEventHandler {
    


    constructor(private client: AccessCardComponent)
    {
      
    }
   
    handle(pluginEvent: HIDPluginEvents)
    { 
      pluginEvent == HIDPluginEvents.DUPLICATED_CREDENTIAL
    }
    

    handleInstallSuccess(): void {
      


    }

  }



