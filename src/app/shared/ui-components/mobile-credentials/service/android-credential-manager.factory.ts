import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HIDCredentialManager } from '../model/android/hid/hid-credential-manager';
import { MobileCredentialManager } from '../model/shared/mobile-credential-manager';
import { CredentialProviders } from '../model/shared/credential-utils';
import { MobileCredentialDataService } from '../model/shared/mobile-credential-data.service';
import { MobileCredential } from '../model/shared/mobile-credential';
import { HIDCredential } from '../model/android/android-credential.model';

@Injectable()
export class AndroidCredentialManagerFactory {
  constructor(private mobileCredentialDataService: MobileCredentialDataService, private injector: Injector) {}

  getCredentialManager(): Observable<MobileCredentialManager> {
    let credentialManager = null;
    return this.mobileCredentialDataService.activePasses$().pipe(
      map((mobileCredential: MobileCredential) => {
        if (mobileCredential.providedBy(CredentialProviders.HID)) {
          credentialManager = this.createHidCredentialManagerFor(<HIDCredential>mobileCredential);
        } else if (mobileCredential.providedBy(CredentialProviders.GOOGLE)) {
          credentialManager = this.createGoogleCredentialManagerFor(); // google/nxp credential manager not implemented yet
        }
        return credentialManager;
      }),
      catchError(() => of(null))
    );
  }

  private createHidCredentialManagerFor(mCredential: HIDCredential): HIDCredentialManager {
    let credentialManager = this.injector.get(HIDCredentialManager);
    credentialManager.setCredential(mCredential);
    return credentialManager;
  }

  private createGoogleCredentialManagerFor(): any {
    return null;
  }
}
