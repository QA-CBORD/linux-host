import { Inject, Injectable, Injector, NgZone } from "@angular/core";
import { App } from "@capacitor/app";
import { PluginListenerHandle } from "@capacitor/core";
import { PinLoginProps } from "@core/model/authentication/pin-login-props.model";
import {
  BiometricPermissionState,
  BrowserVault,
  Device,
  DeviceSecurityType,
  Vault,
  VaultError,
  VaultErrorCodes,
  VaultType,
} from "@ionic-enterprise/identity-vault";
import { ModalController } from "@ionic/angular";
import { NavigationService } from "@shared/services/navigation.service";
import { UserPreferenceService } from "@shared/services/user-preferences/user-preference.service";
import { ROLES } from "src/app/app.global";
import { ANONYMOUS_ROUTES } from "src/app/non-authorized/non-authorized.config";
import { LoadingService } from "../loading/loading.service";
import {
  TIME_OUT_WITH_EXTRA,
  VaultMigrateResult,
  VaultTimeoutOptions,
  VaultSession,
  VAULT_DEFAULT_TIME_OUT_IN_MILLIS,
  PinAction,
  PinCloseStatus,
} from "./model.identity";
import { PinAuthenticator } from "./pin-authentication";
import { VaultFactory } from "./vault-factory.service";

const key = "sessionPin";
const APP_STATE_CHANGE = "appStateChange";

@Injectable({ providedIn: "root" })
export class VaultIdentityService {
  public state: VaultSession = { biometricUsed: false, pin: null };
  private vault: Vault | BrowserVault;
  private pluginListenerHandle: PluginListenerHandle;
  private setTimeoutId;
  pinAuthenticator: PinAuthenticator;

  constructor(
    @Inject(Injector) private injector: Injector,
    private readonly ngZone: NgZone,
    public userPreferenceService: UserPreferenceService
  ) {}

  get routingService(): NavigationService {
    return this.injector.get(NavigationService);
  }
  get modalController(): ModalController {
    return this.injector.get(ModalController);
  }

  get loadingService(): LoadingService {
    return this.injector.get(LoadingService);
  }

  async init(vault?: Vault | BrowserVault) {
    this.pinAuthenticator = new PinAuthenticator(this.modalController);
    this.vault = vault || VaultFactory.newVaultInstance();
    await Device.setHideScreenOnBackground(false, false);
    this.vault.onPasscodeRequested((isPasscodeSetRequest) => {
      if (isPasscodeSetRequest) return this.state.pin;
      return this.pinAuthenticator
        .onPasscodeRequested()
        .then((code) => this.vault.setCustomPasscode(code) && code);
    });

    this.vault.onLock(({ timeout }) => {
      this.ngZone?.run(() => {
        this.setUserPin(null);
        this.setIsLocked(true);
        if (timeout) {
          this.doUnlockVault(this.state.biometricUsed);
        }
      });
    });

    this.vault?.onError(async (err: VaultError) => {
      switch (err.code) {
        case 7:
          {
            const allData = await this.getValues();
            this.vault.clear();
            this.init();
            this.setValues(allData);
          }
          break;
      }
    });
  }

   // Assuming Identity Vault is properly initialized
   async getValues() {
    try {
      const allData = {};

      const keys = await this.vault.getKeys();
      for (const key of keys) {
        const value = await this.vault.getValue(key);
        allData[key] = value;
      }

      return allData; // Return all retrieved data
    } catch (error) {
      console.error('Error retrieving data from Identity Vault:', error);
      throw error; // Handle error appropriately
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async setValues(values: { [key: string]: any }) {
    try {
      for (const [key, value] of Object.entries(values)) {
        await this.vault.setValue(key, value);
      }
    } catch (error) {
      console.error('Error setting data to Identity Vault:', error);
      throw error; // Handle error appropriately
    }
  }

  async isBiometricPermissionDenied({ code }: { code: VaultErrorCodes }): Promise<boolean> {
    const biometric = await Device.isBiometricsAllowed();

    const userDeniedBiometricPermission = [
      VaultErrorCodes.SecurityNotAvailable,
      VaultErrorCodes.AuthFailed,
      VaultErrorCodes.TooManyFailedAttempts,
    ].includes(code);

    if (userDeniedBiometricPermission && biometric === BiometricPermissionState.Denied)
      this.userPreferenceService.setBiometricPermissionDenied();
    return userDeniedBiometricPermission;
  }

  /**
   * Will migrate data from old vault to new vault if needed. called externally.
   * @returns
   */
  async migrateIfLegacyVault(): Promise<VaultMigrateResult> {
    this.loadingService.closeSpinner();
    const { biometricUsed, pin, migrationResult } =
      await VaultFactory.newVaultMigrationInstance(this).doVaultMigration();
    if (migrationResult == VaultMigrateResult.MIGRATION_SUCCESS)
      this.onVaultMigratedSuccess({ pin, biometricUsed });
    return migrationResult;
  }

  /**
   * Called when we successfully migrated data from old vault config to new vault.
   */
  async onVaultMigratedSuccess(session: VaultSession): Promise<void> {
    try {
      await this.login(session);
    } catch (error) {
      /**Ignored on purpose */
    }
  }

  /**
   * Called to start vault setup.
   * @param session
   * session must contain the pin.
   */
  async login(session: VaultSession): Promise<void> {
    this.setIsLocked(false);
    await this.setState(session);
    await this.setUnlockMode(session);
  }

  /**
   * We want to able to change vault's config on the fly, from biometrics to customPasscode and vice versa.
   * @param session
   */
  async setUnlockMode(session: VaultSession) {
    let type = VaultType.CustomPasscode;
    let deviceSecurityType = DeviceSecurityType.None;
    this.state.biometricUsed = session.biometricUsed;
    if (session.biometricUsed) {
      type = VaultType.DeviceSecurity;
      deviceSecurityType = DeviceSecurityType.Biometrics;
    }
    await this.patchVaultConfig({ type, deviceSecurityType });
  }

  async isVaultLocked(): Promise<boolean> {
      const hasStoredSession = await this.hasStoredSession();
      const isVaultLocked = await this.vault.isLocked();

    return hasStoredSession && isVaultLocked;
  }

  async presentPinModal(
    pinAction: PinAction,
    pinModalProps?: PinLoginProps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    return this.pinAuthenticator.presentPinModal(
      pinAction,
      null,
      pinModalProps
    );
  }

  private setUserPin(pin: string) {
    this.state.pin = pin;
  }

  private async setState(session: VaultSession) {
    const sessionPin = session.pin || (await this.getPin());
    this.setUserPin(sessionPin);
    this.state.biometricUsed = session.biometricUsed;
    await this.vault.setCustomPasscode(sessionPin);
    this.vault.setValue(key, sessionPin);
  }

  private async getPin() {
    return this.state.pin || (await this.vault.getValue(key));
  }

  async logout(): Promise<void> {
    this.setUserPin(undefined);
    this.setIsLocked(false);
    await this.vault.clear();
  }

  async isBiometricAvailable(): Promise<boolean> {
      const isEnabled = await Device.isBiometricsEnabled();
      const isAllowed = await this.isBiometricAllowed();

    return isEnabled && isAllowed;
  }

  async getAvailableBiometricHardware(): Promise<string[]> {
    return Device.getAvailableHardware();
  }

  private setIsLocked(locked: boolean) {
    this.state.isLocked = locked;
  }

  getIsLocked() {
    return this.state.isLocked;
  }

  async setBiometricsEnabled(biometricUsed: boolean): Promise<void> {
    return this.login({ biometricUsed });
  }

  async lockVault(): Promise<void> {
    return this.vault.lock();
  }

  /**
   * checks if user has denied biometric usage for this app.
   * currently using a custom mechanism to detect if user has denied permission, since current vault version does not detect that.
   * issue has been submitted to ionic support and they will add support for that on next release.
   *
   * @returns boolean, is biometric allowed or not
   */
  private async isBiometricAllowed(): Promise<boolean> {
    return !(await this.userPreferenceService.getBiometricPermissionDenied());
  }

  async patchVaultConfig(config) {
    await this.vault.updateConfig({
      ...this.vault.config,
      ...config,
    });
  }

  /**
   *
   * @returns VaultSession
   */
  async unlockVaultIfLocked(): Promise<VaultSession> {
    if (await this.hasStoredSession()) {
      return this.unlockVault(
        await this.userPreferenceService.cachedBiometricsEnabledUserPreference()
      );
    }
    return { pin: null };
  }

  private async unlockVaultPin(resolve, reject) {
    this.pinAuthenticator
      .try(() => this.vault.unlock())
      .then(async () =>
        resolve({ pin: await this.getPin(), biometricUsed: false })
      )
      .catch((e) => reject(e));
  }

  onVaultUnlockSuccess(pin: string) {
    this.setIsLocked(false);
    this.setUserPin(pin);
  }

  private async unlockVaultBiometric(resolve, reject) {
    try {
      await this.vault.unlock();
      const pin = await this.vault.getValue(key);
      this.onVaultUnlockSuccess(pin);
      resolve({ pin, biometricUsed: true });
    } catch (error) {
      this.retryPinUnlock(error)
        .then((session) => resolve(session))
        .catch((e) => reject(e));
    }
  }

  async retryPinUnlock(e): Promise<VaultSession> {
    await !this.isBiometricPermissionDenied(e);
    const biometric = await Device.isBiometricsAllowed();
    const { pin, status } = await this.pinAuthenticator.tryUnlock0();
    if (status == PinCloseStatus.LOGIN_SUCCESS) {
      await this.logout();
      this.login({ pin, biometricUsed: biometric === BiometricPermissionState.Granted });
      return { pin, biometricUsed: false };
    } else {
      throw {
        code: status,
      };
    }
  }

  /**
   * Called to unlock vault. will ask user to enter biometrics (fingerprint, faceID) or pin, but will only do that if vault is locked.
   * @param biometricEnabled
   * @returns
   */
  async unlockVault(biometricEnabled: boolean): Promise<VaultSession> {
    const isBiometricAvailable = await this.isBiometricAvailable();
    this.state.biometricUsed = isBiometricAvailable && biometricEnabled;
    await this.closeAllModals();
    return new Promise<VaultSession>((resolve, reject) => {
      if (this.state.biometricUsed) {
        this.unlockVaultBiometric(resolve, reject);
      } else {
        this.unlockVaultPin(resolve, reject);
      }
    });
  }

  private async doUnlockVault(biometricEnabled: boolean) {
    return this.openStartupPage(biometricEnabled);
  }

  async hasStoredSession(): Promise<boolean> {
    return !(await this.vault.isEmpty());
  }

  async openStartupPage(biometricEnabled: boolean) {
    return this.showSplashScreen({ skipLoginFlow: true, biometricEnabled });
  }

  async showSplashScreen(state: {
    skipLoginFlow: boolean;
    biometricEnabled: boolean;
  }): Promise<boolean> {
    return this.routingService.navigate(
      [ROLES.anonymous, ANONYMOUS_ROUTES.startup],
      { replaceUrl: true, state }
    );
  }

  async closeAllModals(): Promise<void> {
    /// check for all loaders and remove them
    this.loadingService.closeSpinner();
    let topModal = await this.modalController.getTop();

    while (topModal) {
      const isDismmised = await topModal.dismiss();
      if (isDismmised) {
        topModal = await this.modalController.getTop();
      } else {
        topModal = null;
      }
    }
  }

  /**
   * this method should be called when this app (GetApp) is going to open another app (or an activity from another app), because vault will lock this app while you're still in the other app.
   * We may not want vault to lock itself if we're expecting a result from the other app.
   * otherwise the user will be asked to authenticate and you will probably lose the results from the other app.
   * @param e
   *  e.makeVaultUnLockable=true means you don't want GetApp to lock itself, defaults to "false"
   *  e.estimatedTimeInMillis means for how long you want vault to wait before it locks itself. defaults to "TIME_OUT_WITH_EXTRA" (10min)
   *  e.keepVaultUnLockableOnResume=true means you don't want vaultIdentityService to auto-adjust it's "lockAfterBackgrounded" setting back to "VAULT_DEFAULT_TIME_OUT_IN_MILLIS (5000)" once you get back from the app you opened.
   *  this defaults to false, meaning that vault will try to adjust the "lockAfterBackgrounded" setting back to 5000 millis unless otherwise specified.
   * @returns
   */
  async updateVaultTimeout(e: VaultTimeoutOptions) {
    if (!e.extendTimeout) {
      return this.setNewVaultTimeoutValue().finally(() => {
        this.pluginListenerHandle?.remove();
        clearTimeout(this.setTimeoutId);
      });
    }
    const estimatedTimeInMillis =
      e.estimatedTimeInMillis || TIME_OUT_WITH_EXTRA;
    this.setNewVaultTimeoutValue(estimatedTimeInMillis);
    if (e.keepTimeoutExtendedOnResume) {
      clearTimeout(this.setTimeoutId);
      this.setTimeoutId = setTimeout(
        () => this.setNewVaultTimeoutValue(),
        estimatedTimeInMillis
      );
    } else {
      this.pluginListenerHandle = await App.addListener(
        APP_STATE_CHANGE,
        ({ isActive }) => {
          if (isActive) {
            setTimeout(() => this.setNewVaultTimeoutValue(), 1000);
            this.pluginListenerHandle?.remove();
          }
        }
      );
    }
  }

  async setNewVaultTimeoutValue(
    estimatedTime: number = VAULT_DEFAULT_TIME_OUT_IN_MILLIS
  ): Promise<boolean> {
    const isVaultCurrentlyNotLocked = !(await this.isVaultLocked());
    if (isVaultCurrentlyNotLocked) {
      this.patchVaultConfig({ lockAfterBackgrounded: estimatedTime });
      return true;
    }
    return false;
  }
}
