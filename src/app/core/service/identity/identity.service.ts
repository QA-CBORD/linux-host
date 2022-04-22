import { Injectable } from '@angular/core';
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
} from '@ionic-enterprise/identity-vault';

import { BrowserAuthPlugin } from '../browser-auth/browser-auth.plugin';
import { PinAction, PinCloseStatus, PinPage } from '@shared/ui-components/pin/pin.page';
import { Capacitor } from '@capacitor/core';
import { PLATFORM } from '@shared/accessibility/services/accessibility.service';
import { firstValueFrom } from '@shared/utils';

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

  constructor(
    private browserAuthPlugin: BrowserAuthPlugin,
    private modalController: ModalController,
    private plt: Platform) {
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
  ): Promise<void> {
    this.temporaryPin = session.pin;
    return super.login(session, biometricEnabled ? AuthMode.BiometricAndPasscode : AuthMode.PasscodeOnly).then(res => {
        this.setIsLocked(false);
        return res;
      });
  }

  // called when biometric is setup.
  /// unlock the vault to make data accessible with identity controlled method
  async unlockVault(): Promise<any> {
    this.unclockInProgress = true;
    return super.unlock(AuthMode.BiometricOnly).finally(() => (this.unclockInProgress = false));
  }

  /// unlock the vault to make data accessible with pin
  async unlockVaultPin(): Promise<void> {
    return super.unlock(AuthMode.PasscodeOnly);
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
    console.log("LOCKING VAULT YEAH BABE.")
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


  /// used for pin set and validation
  async onPasscodeRequest(isPasscodeSetRequest: boolean): Promise<string> {

    if (isPasscodeSetRequest) {
      /// will happen on pin set
      return Promise.resolve(this.temporaryPin);
    } else {
      /// will happen on pin login
      const { data, role } = await this.presentPinModal(PinAction.LOGIN_PIN);

      if (PinCloseStatus.LOGIN_SUCCESS !== role) {
        throw {
          code: role,
          message: data,
        };
      }
      return Promise.resolve(data);
    }
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

  async retrieveVaultPin(): Promise<any> {
    return await firstValueFrom(this.getVaultData());
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
    console.log("onVaultUnlocked: ", config)
    this.setIsLocked(false);
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
