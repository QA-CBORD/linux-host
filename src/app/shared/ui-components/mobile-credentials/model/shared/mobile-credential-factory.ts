import { AndroidCredentialStateResolver, HIDCredential, GoogleCredential } from '../android/android-credentials';
import { ActivePasses } from './credential-utils';
import { MobileCredential } from './mobile-credential';

export class MobileCredentialFactory {
  static fromActivePasses(data: ActivePasses): MobileCredential {
    const credentialState = AndroidCredentialStateResolver.resolveStateFromActivePasses(data);
    console.log(credentialState)
    if (credentialState.isHID()) {
      return new HIDCredential(credentialState);
    }else if(credentialState.isGOOGLE()){
      return new GoogleCredential(credentialState);
    }
  }
}
