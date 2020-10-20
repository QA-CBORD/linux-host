import { Plugins } from '@capacitor/core';
import { of } from 'rxjs';
const { HIDPlugin } = Plugins;

export class HIDSdkManager {

  private static instance: HIDSdkManager;

  private constructor(){}

  initializeSdk(): Promise<string> {
    return HIDPlugin.initializeOrigo().then(() => {
      return HIDPlugin.startupOrigo()
        .then((hidSdkTransactionResponse) => {
          let { hidSdkTransactionResult } = hidSdkTransactionResponse;
          return hidSdkTransactionResult;
        })
        .catch((error) => {
          return of('error').toPromise();
        });
    });
  }


static getInstance(): HIDSdkManager {
    if(!this.instance){
        this.instance =  new HIDSdkManager();
    }
    return this.instance;
}

  installCredential(invitationCode: string): Promise<string> {
    return HIDPlugin.addCredential({invitationCode: invitationCode})
    .then(hidSdkTransactionResponse => {
      let { hidSdkTransactionResult } = hidSdkTransactionResponse;
      return hidSdkTransactionResult
    });
  }

  deleteCurrentCredential(): Promise<string> {
    return HIDPlugin.deleteCredential().then(hidSdkTransactionResponse => {
      let { hidSdkTransactionResult } = hidSdkTransactionResponse;
      return hidSdkTransactionResult
    });;
  }

  get installedCredentialInfo$(): Promise<any>{
      return HIDPlugin.loadCredentialData();
  }

  get checkIfEndpointSetup$(): Promise<boolean>{
    return HIDPlugin.checkIfEndpointIsSetup().then((hidSdkTransactionResponse) => {
        let { hidSdkTransactionResult } = hidSdkTransactionResponse;
        return hidSdkTransactionResult;
      }
    );
  }

}
