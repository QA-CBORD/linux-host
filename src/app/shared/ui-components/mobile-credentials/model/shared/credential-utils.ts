export interface ActivePasses {
  passes: { android_hid: number; android_nxp: number, iPhone: number, iWatch: number, android_hid_wallet?: number };
  credStatus: { android_hid: number; android_nxp: number, iPhone: number, iWatch: number, android_hid_wallet?: number  };
  referenceIdentifier: string;
}


export enum CredentialProviders{
  HID = "HID",
  HID_WALLET = "HID_WALLET",
  GOOGLE = "ALLEGION",
  APPLE= "APPLE"
}

export class MobileCredentialProvider {

  name: string

  constructor(public provider: CredentialProviders) {
    this.name = provider.valueOf();
  }

  toString():string{
    return this.provider.valueOf();
  }

}

export enum HIDPluginEvents {
  INSTALL_SUCCESS = 'INSTALL_SUCCESS',
  INSTALL_FAILURE = 'INSTALL_FAILURE',
  STARTUP_SUCCESS = 'STARTUP_SUCCESS',
  STARTUP_FAILURE = 'STARTUP_FAILURE',
  DUPLICATED_CREDENTIAL = 'DUPLICATED_CREDENTIAL',
  INACTIVE_CREDENTIAL = 'INACTIVE_CREDENTIAL',
  ENDPOINT_NOT_SETUP = 'ENDPOINT_NOT_SETUP',
  ENDPOINT_DELETE_FAILURE = 'ENDPOINT_DELETE_FAILURE',
  ENDPOINT_DELETE_SUCCESS = 'ENDPOINT_DELETE_SUCCESS',
}
