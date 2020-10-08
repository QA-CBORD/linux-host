import { AndroidCredentialStateResolver, HIDCredential } from '../android/android-credentials';
import { ActivePasses } from './credential-utils';
import { MobileCredential } from './mobile-credential';

export class MobileCredentialFactory {
  static fromActivePasses(data: ActivePasses): MobileCredential {
    const credentialState = AndroidCredentialStateResolver.resolveStateFromActivePasses(data);
    if (credentialState.isHID()) {
      return new HIDCredential(credentialState);
    }
  }
}
