import { Plugins } from '@capacitor/core';
import { of } from 'rxjs';
const { HIDPlugin } = Plugins;

export class HIDSdkAdapter {

  private static instance: HIDSdkAdapter;

  private constructor(){}

  initializeSdk(): Promise<boolean> {
    console.log('SDK Initialization called....');
    return HIDPlugin.initializeOrigo().then(initializeResult => {
      console.log('SDK Initialization completed: ', initializeResult);
      return HIDPlugin.startupOrigo()
        .then(startupResult => {
          console.log('SDK startup completed: ', startupResult);
          return of(true).toPromise();
        })
        .catch(error => {
          console.log('error from HID SDK initialization: ', error);
          return of(false).toPromise();
        });
    });
  }


static getInstance(): HIDSdkAdapter {
    if(!this.instance){
        this.instance =  new HIDSdkAdapter();
    }
    return this.instance;
}

  installCredential(invitationCode: string): Promise<any> {
    return HIDPlugin.addCredential({invitationCode: invitationCode});
  }

  deleteCurrentCredential(): Promise<any> {
    return HIDPlugin.deleteCredential();
  }

  get installedCredentialInfo$(): Promise<any>{
      return HIDPlugin.loadCredentialData();
  }

}
