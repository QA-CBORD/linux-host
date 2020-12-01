import { Injectable, Injector } from '@angular/core';
import { iif, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HIDCredentialManager } from '../model/android/hid/hid-credential-manager';
import { MobileCredentialManager } from '../model/shared/mobile-credential-manager';
import { CredentialProviders } from '../model/shared/credential-utils';
import { MobileCredentialDataService } from '../model/shared/mobile-credential-data.service';
import { MobileCredential } from '../model/shared/mobile-credential';
import { HIDCredential, GoogleCredential } from '../model/android/android-credential.model';
import { GooglePayCredentialManager } from '../model/android/google-pay/google-pay-credential-manager';
import { IOSCredentialManager } from './ios-credential-manager';

export enum CredentialManagerType {
  IosCredential = 'IOS_CREDENTIAL',
  AndroidCredential = 'ANDROID_CREDENTIAL',
}

@Injectable()
export class MobileCredentialManagerFactory {
  constructor(private injector: Injector) {}

  createCredentialManager(credentialManagerType: CredentialManagerType): Observable<MobileCredentialManager> {
    return iif(
      () => credentialManagerType == CredentialManagerType.IosCredential,
      this.appleCredentialManager(),
      this.androidCredentialManager()
    );
  }

  private androidCredentialManager(): Observable<MobileCredentialManager> {
    let credentialManager = null;
    return this.injector
      .get(MobileCredentialDataService)
      .activePasses$()
      .pipe(
        map((mobileCredential: MobileCredential) => {
          if (mobileCredential.providedBy(CredentialProviders.HID)) {
            credentialManager = this.createHidCredentialManagerFor(<HIDCredential>mobileCredential);
          } else if (mobileCredential.providedBy(CredentialProviders.GOOGLE)) {
            credentialManager = this.createGoogleCredentialManagerFor(<GoogleCredential>mobileCredential); // google/nxp credential manager not implemented yet
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

  private createGoogleCredentialManagerFor(mCredential: GoogleCredential): GooglePayCredentialManager {
    let credentialManager = this.injector.get(GooglePayCredentialManager);
    credentialManager.setCredential(mCredential);
    return credentialManager;
  }

  private appleCredentialManager(): Observable<MobileCredentialManager> {
    return of(this.injector.get(IOSCredentialManager));
  }
}
