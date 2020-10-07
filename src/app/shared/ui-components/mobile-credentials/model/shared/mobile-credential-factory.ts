import { AndroidCredentialAttrs, AndroidCredentialStateResolver, HIDCredential } from '../android/android-credentials';
import { ActivePasses } from './credential-utils';
import { MobileCredential } from './mobile-credential';

export class MobileCredentialFactory {
  static androidCredentialFrom(data: ActivePasses | AndroidCredentialAttrs): MobileCredential {
    console.log('MobileCredentialFactory: ', data);
    const credentialState = AndroidCredentialStateResolver.from(data);
    if (credentialState.isHID()) {
       return new HIDCredential(credentialState, 'credentialData' in data ? data.credentialData: undefined );
    }
  }
}

