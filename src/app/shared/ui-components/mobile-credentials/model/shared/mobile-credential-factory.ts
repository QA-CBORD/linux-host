import {
  AndroidCredentialState,
  CredentialStateResolver,
  GoogleCredential,
  HIDCredential,
} from '../android/android-credential.model';
import { AppleWalletCredential } from '../ios/apple-wallet-credential';
import { ActivePasses, CredentialProviders } from './credential-utils';
import { MobileCredential } from './mobile-credential';

export class MobileCredentialFactory {
  static fromActivePasses(data: ActivePasses): MobileCredential {
    const credentialState = CredentialStateResolver.fromActivePasses(data);
    if (credentialState.providedBy(CredentialProviders.HID) || credentialState.providedBy(CredentialProviders.HID_WALLET)) {
      return new HIDCredential(credentialState as AndroidCredentialState);
    } else if (credentialState.providedBy(CredentialProviders.GOOGLE)) {
      return new GoogleCredential(credentialState as AndroidCredentialState);
    } else if (credentialState.providedBy(CredentialProviders.APPLE)) {
      return new AppleWalletCredential(credentialState);
    }
  }
}

