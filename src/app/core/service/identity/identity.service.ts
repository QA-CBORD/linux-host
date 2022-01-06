import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { from, Observable, of, throwError } from 'rxjs';

import { ModalController, Platform } from '@ionic/angular';
import {
  AuthMode,
  DefaultSession,
  IonicIdentityVaultUser,
  IonicNativeAuthPlugin,
  LockEvent,
  VaultConfig,
  VaultError,
  VaultErrorCodes,
} from '@ionic-enterprise/identity-vault';

import { BrowserAuthPlugin } from '../browser-auth/browser-auth.plugin';
import { PinAction, PinCloseStatus, PinPage } from '@shared/ui-components/pin/pin.page';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { catchError, finalize, switchMap, take, tap } from 'rxjs/operators';
import { GUEST_NAVIGATION, PATRON_NAVIGATION, ROLES } from '../../../app.global';
import { ANONYMOUS_ROUTES } from '../../../non-authorized/non-authorized.config';
import { LoadingService } from '@core/service/loading/loading.service';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';
import { Capacitor } from '@capacitor/core';
import { PLATFORM } from '@shared/accessibility/services/accessibility.service';
import { ToastService } from '../toast/toast.service';

export class VaultSessionData implements DefaultSession {
  token: string; /// unused
  username: string;
  pin?: string;
}

@Injectable({
  providedIn: 'root',
})
export class IdentityService extends IonicIdentityVaultUser<VaultSessionData> {
  private temporaryPin: string = undefined;
  private wasPinLogin: boolean = false;
  private isLocked: boolean = true;
  canRetryUnlock: boolean = true;
  unclockInProgress: boolean;
  unclockPinInProgress: boolean;

  constructor(
    private browserAuthPlugin: BrowserAuthPlugin,
    private http: HttpClient,
    private modalController: ModalController,
    private router: Router,
    private plt: Platform,
    private readonly nativeStartupFacadeService: NativeStartupFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly loadingService: LoadingService,
    private readonly ngZone: NgZone,
    private readonly toastService: ToastService
  ) {
    // TODO: hideScreenOnBackground hangs promises on permissions prompt.
    // if this is needed have to find a fix/workaround.
    super(plt, {
      restoreSessionOnReady: false,
      unlockOnReady: false,
      unlockOnAccess: false,
      lockAfter: 5000,
      hideScreenOnBackground: false,
      allowSystemPinFallback: false,
      shouldClearVaultAfterTooManyFailedAttempts: false,
    });
  }

  /// get string of available biometric types
  getAvailableBiometricHardware(): Observable<string[]> {
    return from(super.getAvailableHardware());
  }

  /// Check whether or not biometrics is supported by the device and has been configured by the current user of the device
  areBiometricsAvailable(): Observable<boolean> {
    return from(super.isBiometricsAvailable());
  }

  logoutUser(): Promise<void> {
    return super.logout();
  }

  async isVaultLocked() {
    if (Capacitor.platform == PLATFORM.ios) {
      await this.hasStoredSession(); // Hack: for unexpected vault behavior with the pin not showing up
    }
    return this.isLocked && (await this.hasStoredSession());
  }

  /// will attempt to use pin and/or biometric - will fall back to passcode if needed
  /// will require pin set
  initAndUnlock(
    session: VaultSessionData,
    biometricEnabled: boolean,
    navigateToDashboard: boolean = true
  ): Observable<void> {
    if (navigateToDashboard) {
      this.navigateToDashboard();
    }
    this.temporaryPin = session.pin;
    return from(
      super.login(session, biometricEnabled ? AuthMode.BiometricAndPasscode : AuthMode.PasscodeOnly).then(res => {
        this.setIsLocked(false);
        return res;
      })
    );
  }

  /// unlock the vault to make data accessible with identity controlled method
  unlockVault(): Observable<void> {
    this.unclockInProgress = true;
    return from(super.unlock()).pipe(
      take(1),
      finalize(() => (this.unclockInProgress = false))
    );
  }

  /// unlock the vault to make data accessible with pin
  unlockVaultPin(): Observable<void> {
    this.unclockPinInProgress = true;
    return from(super.unlock(AuthMode.PasscodeOnly)).pipe(
      take(1),
      finalize(() => {
        this.unclockPinInProgress = false;
      })
    );
  }

  /// unlock the vault to make data accessible with biometric and pin backup
  unlockVaultBiometricAndPinBackup(): Observable<void> {
    return from(super.unlock(AuthMode.BiometricAndPasscode));
  }

  /// save data to vault
  setVaultData(data: VaultSessionData): Observable<void> {
    return from(super.saveSession(data));
  }

  /// lock the vault to make data inaccessible
  lockVault(): Observable<void> {
    return from(super.lockOut());
  }

  /// restore session will attempt to login the user if a session exists
  /// if no session exists, will return undefined
  /// if vault locked, will return error code 1
  getVaultData(): Observable<any> {
    try {
      return from(super.restoreSession());
    } catch (error) {
      throwError(error['code']);
    }
  }

  /// will lock vault and clear all data
  logoutVault(): Observable<void> {
    return from(super.logout());
  }

  // isVaultLocked(): Observable<void> {
  //   return from(super.isLocked());
  // }

  /// used for pin set and validation
  async onPasscodeRequest(isPasscodeSetRequest: boolean): Promise<string> {
    if (isPasscodeSetRequest) {
      /// will happen on pin set
      return Promise.resolve(this.temporaryPin);
    } else {
      /// will happen on pin login
      this.canRetryUnlock = false;
      const { data, role } = await this.presentPinModal(PinAction.LOGIN_PIN);
      switch (role) {
        case 'cancel': /// identity vault cancel role
          throw {
            code: VaultErrorCodes.UserCanceledInteraction,
            message: 'User has canceled pin login',
          };
        case PinCloseStatus.MAX_FAILURE:
          this.router.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.entry], { state: { logoutUser: true } });
          throw {
            code: VaultErrorCodes.TooManyFailedAttempts,
            message: 'User has exceeded max pin attempts',
          };
        case PinCloseStatus.LOGIN_SUCCESS:
          this.wasPinLogin = true;
          break;
        default:
          throw {
            code: VaultErrorCodes.UserCanceledInteraction,
            message: 'User has canceled pin login',
          };
      }
      return Promise.resolve(data);
    }
  }

  async onAppStateChanged(stateActive) {
    // do only for android platform

    const redoRequestPin = async () => {
      if ((!stateActive && this.unclockInProgress) || (!stateActive && this.unclockPinInProgress)) {
        // console.log('REDO PIN');
        await this.onPasscodeRequest(false);
        this.unclockInProgress = false;
        this.unclockPinInProgress = false;
      }
    };

    /**
     * 
     * Commenting this out and suggesting regression testing on pinPage. 
     * Solving issue GET3478
     */

    // if (Capacitor.platform == PLATFORM.android) {
    //   redoRequestPin();
    // }
  }

  async presentPinModal(pinAction: PinAction, pinModalProps?: any): Promise<any> {
    let componentProps = { pinAction, ...pinModalProps };
    const pinModal = await this.modalController.create({
      backdropDismiss: false,
      component: PinPage,
      componentProps,
    });
    await pinModal.present();
    return await pinModal.onDidDismiss();
  }

  private async loginUser() {
    await this.loadingService.showSpinner();
    this.getVaultData()
      .pipe(
        switchMap(({ pin }) => this.authFacadeService.authenticatePin$(pin)),
        take(1),
        catchError(err => {
          const timeOutError = /Timeout has occurred/;
          if (timeOutError.test(err.message)) {
            this.logoutUser();
            this.ngZone.run(async () => {
              this.router.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.login], { replaceUrl: true })
                .then(() => this.toastService.showToast({ position: 'top', message: `${err.message}`, duration: 6000 }));
            });
          }
          return of(err);
        }),
        finalize(() => this.loadingService.closeSpinner())
      )
      .subscribe(
        next => {},
        error => {},
        () => {
          this.navigateToDashboard();
        }
      );
  }

  private navigateToDashboard() {
    this.ngZone.run(async () => {
      const isGuest = await this.authFacadeService.isGuestUser().toPromise();
      (isGuest && this.router.navigate([GUEST_NAVIGATION.dashboard], { replaceUrl: true })) ||
        this.router.navigate([PATRON_NAVIGATION.dashboard], { replaceUrl: true });
    });
  }

  /// used to determine storage method
  /// uses capacitor secure storage for mobile
  /// uses our custom method for web
  getPlugin(): IonicNativeAuthPlugin {
    if (this.plt.is('capacitor')) {
      return super.getPlugin();
    }
    /// we do not want to do this on web.
    return this.browserAuthPlugin;
  }

  onSessionRestored(session: VaultSessionData) {
    // console.log('Session Restored: ', session);
  }

  onSetupError(error: VaultError): void {
    // console.error('Get error during setup', error);
  }

  onConfigChange(config: VaultConfig): void {
    // console.log('Got a config update: ', config);
    if (!this.config.isPasscodeSetupNeeded) {
      this.temporaryPin = undefined;
    }
  }

  onVaultReady(config: VaultConfig): void {
    // console.log('The service is ready with config: ', config);
  }

  onVaultUnlocked(config: VaultConfig): void {
    this.setIsLocked(false);
    // console.log('The vault was unlocked with config: ', config);
    if (this.wasPinLogin) {
      this.wasPinLogin = false;
      // console.log('Vault unlocked with pin, navigate to dashboard');
      this.navigateToDashboard();
    } else {
      // console.log('Vault unlocked with biometrics, login using pin');
      this.loginUser();
    }
  }

  onVaultLocked(event: LockEvent): void {
    this.setIsLocked();
    // console.log('The vault was locked by event: ', event);
  }

  setIsLocked(lock: boolean = true) {
    this.isLocked = lock;
  }

  getIsLocked() {
    return this.isLocked;
  }
}
