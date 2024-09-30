import { Injectable, Injector } from '@angular/core';
import { iif, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HIDSeosCredentialManager } from '../model/android/hid/hid-credential-manager';
import { MobileCredentialManager } from '../model/shared/mobile-credential-manager';
import { CredentialProviders } from '../model/shared/credential-utils';
import { MobileCredential } from '../model/shared/mobile-credential';
import { HIDCredential, GoogleCredential } from '../model/android/android-credential.model';
import { GooglePayCredentialManager } from '../model/android/google-pay/google-pay-credential-manager';
import { IOSCredentialManager } from './ios-credential-manager';
import { MobileCredentialDataService } from '../model/shared/mobile-credential-data.service';
import { Platform } from '@ionic/angular';
import { HIDWalletCredentialManager } from '../model/android/hid/hid-wallet-credential-manager';

export enum CredentialManagerType {
  IosCredential = 'IOS_CREDENTIAL',
  AndroidCredential = 'ANDROID_CREDENTIAL',
}

@Injectable({
  providedIn: 'root',
})
export class MobileCredentialManagerFactory {
  constructor(
    private injector: Injector,
    private readonly platform: Platform) {}

  createCredentialManager(credentialManagerType: CredentialManagerType): Observable<MobileCredentialManager> {
    return iif(
      () => credentialManagerType == CredentialManagerType.IosCredential && this.platform.is('cordova'),
      this.appleCredentialManager(),
      this.androidCredentialManager()
    );
  }

  private androidCredentialManager(): Observable<MobileCredentialManager> {
    let credentialManager: MobileCredentialManager = null;
    const srvc = this.injector.get(MobileCredentialDataService);
    return srvc.activePasses$().pipe(
      map((mobileCredential: MobileCredential) => {
        if (mobileCredential.providedBy(CredentialProviders.HID)) {
          credentialManager = this.createHidSeosCredentialManagerFor(<HIDCredential>mobileCredential);
        } else if (mobileCredential.providedBy(CredentialProviders.HID_WALLET)) {
          credentialManager = this.createHidWalletCredentialManagerFor(<HIDCredential>mobileCredential); 
        } else if (mobileCredential.providedBy(CredentialProviders.GOOGLE)) {
          credentialManager = this.createGoogleCredentialManagerFor(<GoogleCredential>mobileCredential); // google/nxp credential manager not implemented yet
        }
        return credentialManager;
      }),
      switchMap(manager => {
        if (manager) {
          manager.contentStringAsync(true);
        }
        return of(manager);
      }),
      catchError(() => of(null))
    );
  }

  private createHidSeosCredentialManagerFor(mCredential: HIDCredential): HIDSeosCredentialManager {
    const credentialManager = this.injector.get(HIDSeosCredentialManager);
    credentialManager.setCredential(mCredential);
    return credentialManager;
  }

  private createHidWalletCredentialManagerFor(mCredential: HIDCredential): HIDWalletCredentialManager {
    const credentialManager = this.injector.get(HIDWalletCredentialManager);
    credentialManager.setCredential(mCredential);
    return credentialManager;
  }

  private createGoogleCredentialManagerFor(mCredential: GoogleCredential): GooglePayCredentialManager {
    const credentialManager = this.injector.get(GooglePayCredentialManager);
    credentialManager.setCredential(mCredential);
    return credentialManager;
  }

  private appleCredentialManager(): Observable<MobileCredentialManager> {
    return of(this.injector.get(IOSCredentialManager));
  }
}
