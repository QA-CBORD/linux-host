import { ChangeDetectorRef, Injectable } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
import { CredentialStateChangeSubscription, MobileCredentialManager } from '../model/shared/mobile-credential-manager';
import { MobileCredential } from '../model/shared/mobile-credential';
import { AppleWalletCredential } from '../model/ios/apple-wallet-credential';
import { AppleWalletCredentialState } from '../model/ios/applet-wallet-state';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { AppleWalletInfo } from '@core/provider/native-provider/native.provider';
const { IOSDevice } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class IOSCredentialManager implements MobileCredentialManager {
  private mCredential: AppleWalletCredential;
  private myPluginEventListener: any;
  private credentialStateChangeSubscription: CredentialStateChangeSubscription;
  constructor(
    private readonly userFacadeService: UserFacadeService,
    private readonly authFacadeService: AuthFacadeService
  ) {}

  refresh(): void {
    this.loadCredentials().then(freshCredentials => {
      this.mCredential = freshCredentials;
      this.credentialStateChangeSubscription
        ? this.credentialStateChangeSubscription.onCredentialStateChanged()
        : undefined;
    });
  }

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
    return from(this.loadCredentials()).pipe(
      map(appleWalletCredential => {
        this.mCredential = appleWalletCredential;
        return this.mCredential.isEnabled();
      })
    );
  }

  private loadCredentials(): Promise<AppleWalletCredential> {
    return this.authFacadeService.cachedAuthSessionToken$
      .pipe(
        switchMap(sessionId => from(IOSDevice.getAppleWalletInfo({ sessionId: sessionId }))),
        map(appleWalletInfo => {
          return new AppleWalletCredential(new AppleWalletCredentialState(appleWalletInfo));
        })
      )
      .toPromise();
  }

  private enableAppleWalletEvents() {
    if (!this.myPluginEventListener) {
      this.myPluginEventListener = IOSDevice.addListener('AppleWalletEvent', () => {
        this.refresh();
      });
    }
  }
}
