import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { from, Observable, throwError } from 'rxjs';

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
import { finalize, switchMap, take } from 'rxjs/operators';
import { PATRON_NAVIGATION, ROLES } from '../../../app.global';
import { GUEST_ROUTES } from '../../../non-authorized/non-authorized.config';
import { LoadingService } from '@core/service/loading/loading.service';

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

  constructor(
    private browserAuthPlugin: BrowserAuthPlugin,
    private http: HttpClient,
    private modalController: ModalController,
    private router: Router,
    private plt: Platform,
    private readonly authFacadeService: AuthFacadeService,
    private readonly loadingService: LoadingService,
    private readonly ngZone: NgZone
  ) {
    super(plt, {
      restoreSessionOnReady: false,
      unlockOnReady: false,
      unlockOnAccess: false,
      lockAfter: 5000,
      hideScreenOnBackground: true,
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

  logoutUser() {
    super.logout();
  }

  async isVaultLocked() {
    return this.isLocked && await this.hasStoredSession();
  }

  /// will attempt to use pin and will fall back to passcode if needed
  /// will require pin set
  initAndUnlockPasscodeOnly(session: VaultSessionData): Observable<void> {
    this.temporaryPin = session.pin;
    return from(
      super.login(session, AuthMode.PasscodeOnly).then(res => {
        this.isLocked = false;
        this.navigateToDashboard();
        return res;
      })
    );
  }

  /// will attempt to use biometric and will fall back to passcode if needed
  /// will require pin set
  initAndUnlockBiometricAndPasscode(session: VaultSessionData): Observable<void> {
    this.temporaryPin = session.pin;
    return from(
      super.login(session, AuthMode.BiometricAndPasscode).then(res => {
        this.isLocked = false;
        this.navigateToDashboard();
        return res;
      })
    );
  }

  /// unlock the vault to make data accessible with identity controlled method
  unlockVault(): Observable<void> {
    return from(super.unlock());
  }

  /// unlock the vault to make data accessible with pin
  unlockVaultPin(): Observable<void> {
    return from(super.unlock(AuthMode.PasscodeOnly));
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
      const { data, role } = await this.presentPinModal(PinAction.LOGIN_PIN);
      switch (role) {
        case 'cancel': /// identity vault cancel role
          throw {
            code: VaultErrorCodes.UserCanceledInteraction,
            message: 'User has canceled pin login',
          };
        case PinCloseStatus.MAX_FAILURE:
          this.router.navigate([ROLES.guest, GUEST_ROUTES.entry], { state: { logoutUser: true } });
          throw {
            code: VaultErrorCodes.TooManyFailedAttempts,
            message: 'User has exceeded max pin attempts',
          };
        case PinCloseStatus.LOGIN_SUCCESS:
          this.wasPinLogin = true;
          break;
      }
      return Promise.resolve(data);
    }
  }

  async presentPinModal(pinAction: PinAction): Promise<any> {
    let componentProps = { pinAction };
    const pinModal = await this.modalController.create({
      backdropDismiss: false,
      component: PinPage,
      componentProps,
    });
    pinModal.present();
    return await pinModal.onDidDismiss();
  }

  private async loginUser() {
    await this.loadingService.showSpinner();
    this.getVaultData()
      .pipe(
        switchMap(({ pin }) => this.authFacadeService.authenticatePin$(pin)
        ),
        take(1),
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
    this.ngZone.run(() => this.router.navigate([PATRON_NAVIGATION.dashboard]));
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
    this.isLocked = false;
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
    this.isLocked = true;
    // console.log('The vault was locked by event: ', event);
  }
}
