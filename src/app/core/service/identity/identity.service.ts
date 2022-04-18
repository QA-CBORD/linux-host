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
import { catchError, finalize, switchMap, take } from 'rxjs/operators';
import { ROLES } from '../../../app.global';
import { ANONYMOUS_ROUTES } from '../../../non-authorized/non-authorized.config';
import { LoadingService } from '@core/service/loading/loading.service';
import { Capacitor } from '@capacitor/core';
import { PLATFORM } from '@shared/accessibility/services/accessibility.service';
import { ConnectionService } from '@shared/services/connection-service';
import { NavigationService } from '@shared/services/navigation.service';
import { APP_ROUTES } from '@sections/section.config';
import { NoConnectivityScreen } from '@shared/no-connectivity-screen/no-connectivity-screen';
import { CommonService } from '@shared/services/common.service';
import { firstValueFrom } from '@shared/utils';
import { ConnectivityScreenCsModel } from '@shared/no-connectivity-screen/model/no-connectivity.cs.model';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { RetryHandler } from '@shared/no-connectivity-screen/model/retry-handler';

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
  private isLocked: boolean = true;
  unclockInProgress: boolean;
  unclockPinInProgress: boolean;
  canRetryPinLogin: boolean = true;
  wasPinLogin: boolean;

  constructor(
    private browserAuthPlugin: BrowserAuthPlugin,
    private modalController: ModalController,
    private router: Router,
    private plt: Platform,
    private readonly authFacadeService: AuthFacadeService,
    private readonly loadingService: LoadingService,
    private readonly connectionService: ConnectionService,
    private readonly routingService: NavigationService,
    private readonly commonService: CommonService
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
    if (Capacitor.getPlatform() == PLATFORM.ios) {
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
    debugger
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

  async tryPinLogin(): Promise<string> {
    if (this.canRetryPinLogin) {
      const sessionPin = await this.onPasscodeRequest(false);
      if (sessionPin) await this.navigateToDashboard();
      return sessionPin
    }
    return Promise.reject({ code: VaultErrorCodes.TooManyFailedAttempts });
  }


  /// used for pin set and validation
  async onPasscodeRequest(isPasscodeSetRequest: boolean): Promise<string> {

    console.log('onPasscodeRequest: ',)

    if (isPasscodeSetRequest) {
      /// will happen on pin set
      return Promise.resolve(this.temporaryPin);
    } else {
      /// will happen on pin login
      this.canRetryPinLogin = false;
      const { data, role } = await this.presentPinModal(PinAction.LOGIN_PIN);
      console.log('onPasscodeRequest: ', role)
      switch (role) {
        case 'cancel': /// identity vault cancel role
          throw {
            code: VaultErrorCodes.UserCanceledInteraction,
            message: 'User has canceled pin login',
          };
        case PinCloseStatus.MAX_FAILURE:
          console.log('onPasscodeRequest PinCloseStatus.MAX_FAILURE')
          this.router.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.entry], { state: { logoutUser: true } });
          throw {
            code: VaultErrorCodes.TooManyFailedAttempts,
            message: 'User has exceeded max pin attempts',
          };
        case PinCloseStatus.LOGIN_SUCCESS:
          console.log('DATA: ', data);
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

  async presentPinModal(pinAction: PinAction, pinModalProps?: any): Promise<any> {
    this.wasPinLogin = true;
    let componentProps = { pinAction, ...pinModalProps };
    const pinModal = await this.modalController.create({
      backdropDismiss: false,
      component: PinPage,
      componentProps,
    });
    await pinModal.present();
    return await pinModal.onDidDismiss();
  }

  async showNoConnectivityModal(retryHandler: RetryHandler) {
    const { content } = await firstValueFrom(this.commonService.loadContentString(ContentStringCategory.noConnectivity));
    console.log('got content strings: ', content);
    const modal = await this.modalController.create({
      backdropDismiss: false,
      componentProps: {
        strings: content,
        retryHandler
      },
      component: NoConnectivityScreen,
    });
    await modal.present();
    return await modal.onDidDismiss();
  }


  private async onAuthenticateUserPinFailed(error): Promise<any> {
    if ((await this.connectionService.deviceOffline())) {
      return await this.showNoConnectivityModal({
        onRetry: this.authenticateUserPin
      });
    } else {
      return this.navigateToDashboard();
    }
  }

  private async onAuthenticateUserPinSuccess() {
    try {
      console.log('Navigating to dashboard after user pin authentication succeeded.');
      this.navigateToDashboard();
    } catch (error) {
      console.log('Got Errors while navigating to dashboard: ', error);
    }
  }

  private async authenticateUserPin() {
    await this.loadingService.showSpinner();
    this.getVaultData()
      .pipe(
        switchMap(({ pin }) => this.authFacadeService.authenticatePin$(pin)),
        take(1),
        catchError((error) => this.onAuthenticateUserPinFailed(error)))
      .subscribe({
        next: () => this.onAuthenticateUserPinSuccess()
      });
  }

  public async navigateToDashboard() {
    console.log('identityService.navigateToDashboard');
    this.canRetryPinLogin = true;
    return await this.routingService.navigate([APP_ROUTES.dashboard], { replaceUrl: true });
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
    console.log('config: **** ', config)
    this.setIsLocked(false);
    if (this.wasPinLogin) {
      this.wasPinLogin = false;
      this.navigateToDashboard();
    } else {
      console.log('onVaultUnlocked loginUser');
      this.authenticateUserPin();
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
