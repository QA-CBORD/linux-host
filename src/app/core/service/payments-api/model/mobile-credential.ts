export class MobileCredential{

  static CREDENTIAL_AVAILABLE = 1;
  static CREDENTIAL_PROVISIONED = 20

   data: ActivePasses;
    constructor(data: ActivePasses){
      this.data = data;
    }

    isAvailable(): boolean {
       return this.data.passes.android_hid == MobileCredential.CREDENTIAL_AVAILABLE;
    }

    isProvisioned(): boolean{
        return this.data.passes.android_hid == MobileCredential.CREDENTIAL_PROVISIONED;
    }

}



export interface ActivePasses{
    passes: { android_hid: number, android_nxp: number}, 
    referenceIdentifier: string, 
    credStatus: { android_hid: number, android_nxp: number}, 
    deviceModel: string, 
    osVersion: string, 
    manufacturer: string
}