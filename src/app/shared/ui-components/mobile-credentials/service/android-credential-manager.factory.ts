import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HIDCredentialManager } from '../model/android/hid/hid-credential-manager';
import { MobileCredentialManager } from '../model/shared/mobile-credential-manager';
import { CredentialProviders } from '../model/shared/credential-utils';
import { MobileCredentialDataService } from '../model/shared/mobile-credential-data.service';
import { MobileCredential } from '../model/shared/mobile-credential';
import { HIDCredential, GoogleCredential } from '../model/android/android-credential.model';
import { GooglePayCredentialManager } from '../model/android/google-pay/google-pay-credential-manager';


@Injectable({
  providedIn: 'root'
})
export class AndroidCredentialManagerFactory {
  constructor(private injector: Injector) {}

  getCredentialManager(): Observable<MobileCredentialManager> {
    let credentialManager = null;
    const mCredentialDataService = this.injector.get(MobileCredentialDataService);
    return mCredentialDataService.activePasses$().pipe(
      map((mobileCredential: MobileCredential) => {
        if (mobileCredential.providedBy(CredentialProviders.HID)) {
          credentialManager = this.createHidCredentialManagerFor(<HIDCredential>mobileCredential);
        } else if (mobileCredential.providedBy(CredentialProviders.GOOGLE)) {
          credentialManager = this.createGoogleCredentialManagerFor(<GoogleCredential>mobileCredential); // google/nxp credential manager not implemented yet
        }
        return credentialManager;
      }),
    );
  }

  private createHidCredentialManagerFor(mCredential: HIDCredential): HIDCredentialManager {
    let credentialManager = this.injector.get(HIDCredentialManager);
    credentialManager.setCredential(mCredential);
    return credentialManager;
  }

  private createGoogleCredentialManagerFor(mCredential: GoogleCredential): any {
    let credentialManager = this.injector.get(GooglePayCredentialManager);
    credentialManager.setCredential(mCredential);
    return credentialManager;
  }
}
