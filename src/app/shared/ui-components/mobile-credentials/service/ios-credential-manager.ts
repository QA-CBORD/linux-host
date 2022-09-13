import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { registerPlugin } from '@capacitor/core';
import { CredentialStateChangeListener, MobileCredentialManager } from '../model/shared/mobile-credential-manager';
import { MobileCredential } from '../model/shared/mobile-credential';
import { AppleWalletCredential } from '../model/ios/apple-wallet-credential';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { AppleWalletCredentialState } from '../model/ios/applet-wallet-credential.state';
import { Injectable } from '@angular/core';
import { MobileCredentialDataService } from '../model/shared/mobile-credential-data.service';
import { AndroidCredentialCsModel } from '../model/android/android-credential-content-strings.model';
const  IOSDevice  = registerPlugin<any>('IOSDevice');


@Injectable({providedIn: 'root'})
export class IOSCredentialManager implements MobileCredentialManager {
  private mCredential: AppleWalletCredential;
  private appletWalletEventListener: any;
  private credentialStateChangeSubscription: CredentialStateChangeListener;
  constructor(
    private readonly userFacadeService: UserFacadeService,
    private readonly authFacadeService: AuthFacadeService
  ) {}
  
  onUiIconClicked(): void {
    throw new Error('Method not implemented.');
  }

  onWillLogout(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  onCredentialStateChanged(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async contentStringAsync(): Promise<AndroidCredentialCsModel> {
    return null;
  }

  getService(): MobileCredentialDataService {
     return null; // is not in use for now.
  }

  refresh(): void {
    this.loadCredentials().then(freshCredentials => {
      this.mCredential = freshCredentials;
      this.credentialStateChangeSubscription
        ? this.credentialStateChangeSubscription.onCredentialStateChanged()
        : undefined;
    });
  }

  setCredentialStateChangeListener(credentialStateChangeSubscription: CredentialStateChangeListener): void {
    this.credentialStateChangeSubscription = credentialStateChangeSubscription;
  }

  getCredential(): MobileCredential {
    return this.mCredential;
  }

  uiImageUrl(): string {
    return this.mCredential.getUiImageUrl();
  }

  setCredential(mobileCredential: MobileCredential): void {
    this.mCredential = mobileCredential;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    const isAvailable = this.mCredential ? this.mCredential.isAvailable() : false;
    return of(isAvailable);
  }

  // if this user has mobile credential access...
  credentialEnabled$(): Observable<boolean> {
    return from(this.loadCredentials()).pipe(
      take(1),
      map(appleWalletCredential => {
        this.mCredential = appleWalletCredential;
        const appleWalletEnabled = this.mCredential.isEnabled();
        if (appleWalletEnabled) {
          this.registerAppletWalletEvent();
        }
        return appleWalletEnabled;
      })
    );
  }

  private loadCredentials(): Promise<AppleWalletCredential> {
    return this.authFacadeService.cachedAuthSessionToken$
      .pipe(
        take(1),
        switchMap(sessionId => from(IOSDevice.getAppleWalletInfo({ sessionId: sessionId }))),
        map((appleWalletInfo: any) => {
          return new AppleWalletCredential(new AppleWalletCredentialState(appleWalletInfo));
        })
      )
      .toPromise();
  }

  private registerAppletWalletEvent() {
    if (!this.appletWalletEventListener) {
      this.appletWalletEventListener = IOSDevice.addListener('AppleWalletEvent', () => {
        this.refresh();
      });
    }
  }
}
