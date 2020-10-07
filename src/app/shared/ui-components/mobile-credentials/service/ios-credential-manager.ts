import { ChangeDetectorRef, Injectable } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
import { CredentialStateChangeSubscription, MobileCredentialManager } from '../model/shared/mobile-credential-manager';
import { MobileCredential } from '../model/shared/mobile-credential';
import { AppleWalletCredential } from '../model/ios/apple-wallet-credential';
import { AppleWalletCredentialState } from '../model/ios/applet-wallet-state';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
const { IOSDevice } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class IOSCredentialManager implements MobileCredentialManager {
  private mCredential: AppleWalletCredential;
  private myPluginEventListener: any;
  private credentialStateChangeSubscription: CredentialStateChangeSubscription
  constructor(
    private readonly userFacadeService: UserFacadeService,
    private readonly authFacadeService: AuthFacadeService,
  ) {}


  setCredentialStateChangeSubscrption(credentialStateChangeSubscription: CredentialStateChangeSubscription): void {
    this.credentialStateChangeSubscription = credentialStateChangeSubscription;
  }

  onUiIconClicked(): void {
    // I don't think anything needs to happen here..
  }

  getCredential(): MobileCredential {
    return this.mCredential;
  }


  uiImageUrl(): string {
    return this.mCredential.getUiImageUrl();
  }

  initialize(): Promise<any> {
    return of(this.enableAppleWalletEvents()).toPromise();
  }

  setCredential(mobileCredential: MobileCredential): void {
    this.mCredential = mobileCredential;
  }

  onUiImageClicked(event?: any): void {
    this.addToAppleWallet();
  }

  addToAppleWallet() {
    this.userInfo$()
      .pipe(
        map(async userInfo => {
          if (userInfo) {
            await IOSDevice.addToAppleWallet({ user: userInfo });
          }
        })
      )
      .subscribe();
  }

  private userInfo$(): Observable<string> {
    return this.userFacadeService.getUser$().pipe(map(userInfo => JSON.stringify(userInfo)));
  }

  credentialAvailable$(): Observable<boolean> {
     let isAvailable = this.mCredential ? this.mCredential.isAvailable() : false;
     return of(isAvailable);
  }

  // if this user has mobile credential access...
  credentialEnabled$(): Observable<boolean> {
    return this.appleWalletEnabled()
      .pipe(
        map(userHasAppleWallet => {
          if (userHasAppleWallet) {
            this.initialize();
          }
          return userHasAppleWallet;
        })
      );
  }

  private appleWalletEnabled(): Observable<boolean> {
    return this.authFacadeService.cachedAuthSessionToken$.pipe(
      switchMap(sessionId => from(IOSDevice.getAppleWalletInfo({ sessionId: sessionId }))),
      map(appleWalletInfo => {
        if (appleWalletInfo) {
          this.mCredential = new AppleWalletCredential(new AppleWalletCredentialState(appleWalletInfo));
          this.credentialStateChangeSubscription.onCredentialStateChanged();
          return this.mCredential.isEnabled();
        }
        return false;
      })
    );
  }

  private enableAppleWalletEvents() {
    if (!this.myPluginEventListener) {
      this.myPluginEventListener = IOSDevice.addListener('AppleWalletEvent', () => {
        this.appleWalletEnabled().subscribe();
      });
    }
  }
}
