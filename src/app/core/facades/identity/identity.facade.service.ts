import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { IdentityService } from '@core/service/identity/identity.service';
import { Settings } from '../../../app.global';
import { map, take } from 'rxjs/operators';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Institution } from '@core/model/institution';
import { AuthenticationType } from '@core/model/authentication/authentication-info.model';
import { PinAction, PinCloseStatus } from '@shared/ui-components/pin/pin.page';
import { RetryHandler } from '@shared/ui-components/no-connectivity-screen/model/retry-handler';
import { UserFacadeService } from '../user/user.facade.service';
import { MerchantFacadeService } from '../merchant/merchant-facade.service';
import { ContentStringsFacadeService } from '../content-strings/content-strings.facade.service';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';
import { firstValueFrom } from '@shared/utils';
import { LoadingService } from '@core/service/loading/loading.service';
import { AuthFacadeService } from '../auth/auth.facade.service';
import { ConnectivityService } from '@shared/services/connectivity.service';
import { APP_ROUTES } from '@sections/section.config';
import { NavigationService } from '@shared/services/navigation.service';
import { DEVICE_MARKED_LOST } from '@shared/model/generic-constants';

export enum LoginState {
  DONE,
  HOSTED,
  EXTERNAL,
  PIN_LOGIN,
  PIN_SET,
  BIOMETRIC_SET,
  BIOMETRIC_LOGIN,
  SELECT_INSTITUTION,
}

@Injectable({
  providedIn: 'root',
})
export class IdentityFacadeService extends ServiceStateFacade {


  private ttl: number = 600000; // 10min
  private pinEnabledUserPreference = 'get_pinEnabledUserPreference';
  private biometricsEnabledUserPreference = 'get_biometricsEnabledUserPreference';
  private isAuthenticating: boolean = false;

  constructor(
    private readonly storageStateService: StorageStateService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly identityService: IdentityService,
    private readonly userFacadeService: UserFacadeService,
    private readonly merchantFacadeService: MerchantFacadeService,
    private readonly contentStringFacade: ContentStringsFacadeService,
    private readonly routingService: NavigationService,
    private readonly loadingService: LoadingService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly connectivityService: ConnectivityService,
  ) {
    super();
  }

  async pinLoginSetup(
    biometricEnabled: boolean,
    navigateToDashboard: boolean = true,
    pinModalProps?: any
  ): Promise<any> {
    const { data, role } = await this.identityService.presentPinModal(
      biometricEnabled ? PinAction.SET_BIOMETRIC : PinAction.SET_PIN_ONLY,
      pinModalProps
    );
    switch (role) {
      case PinCloseStatus.CANCELED:
        throw {
          code: PinCloseStatus.CANCELED,
          message: 'Set pin cancelled',
        };
      case PinCloseStatus.ERROR:
        throw {
          code: PinCloseStatus.ERROR,
          message: 'There was an issue setting your pin',
        };
      case PinCloseStatus.SET_SUCCESS:
        return this.initAndUnlock({ username: undefined, token: undefined, pin: data }, biometricEnabled, navigateToDashboard);
    }
  }


  /// will attempt to use pin and/or biometric - will fall back to passcode if needed
  /// will require pin set
  initAndUnlock(data, biometricEnabled: boolean, navigateToDashboard: boolean = true): Promise<void> {
    if (navigateToDashboard) {
      this.navigateToDashboard();
    }
    return this.identityService.initAndUnlock(data, biometricEnabled);
  }

  async handlePinUnlockSuccess(data) {
    this.navigateToDashboard();
  }

  async handleBiometricUnlockSuccess(data) {
    this.authenticateUserPin();
  }


  async loginUser(useBiometric: boolean) {
    this.isAuthenticating = true;
    if (useBiometric) {
      this.unlockVaultBiometrics().finally(() => this.isAuthenticating = false);
    } else {
      this.unlockVaultPin().finally(() => this.isAuthenticating = false);
    }
  }


  async handleBiometricUnlockError({ message, code }) {
    // user has another chance of authenticating with PIN if they fail biometrics
    return this.unlockVaultPin()
  }


  private async authenticateUserPin() {
    let userPin: string;

    try {
      const vaultSession = await this.identityService.retrieveVaultPin();
      userPin = vaultSession.pin;
    } catch (error) {
      return await this.logoutUser();
    }

    try {
      await this.loadingService.showSpinner();
      await firstValueFrom(this.authFacadeService.authenticatePin$(userPin));
      await this.loadingService.showSpinner();
    } catch (error) {
      await this.loadingService.closeSpinner();
      return await this.onAuthenticateUserPinFailed(error);
    }
    return await this.navigateToDashboard();
  }

  deviceMarkedAsLost({ message }) {
    return DEVICE_MARKED_LOST.test(message);
  }

  private async onAuthenticateUserPinFailed(error): Promise<any> {
    if (this.deviceMarkedAsLost(error)) {
      return this.handleDeviceLostException();
    }
    return this.handleConnectionErrors({
      onRetry: async () => {
        const { pin: savedPin } = await this.identityService.retrieveVaultPin();
        try {
          await this.loadingService.showSpinner();
          await firstValueFrom(this.authFacadeService.authenticatePin$(savedPin));
          await this.loadingService.closeSpinner();
          return await this.navigateToDashboard();
        } catch (error) {
          await this.loadingService.closeSpinner();
        }
        return false;
      },
      onScanCode: async () => this.lockVault()
    });
  }

  async handleDeviceLostException() {
    this.logoutUser();
  }

  public async navigateToDashboard() {
    try {
      return await this.routingService.navigate([APP_ROUTES.dashboard], { replaceUrl: true });
    } catch (err) {
      this.onNavigateToDashboardFailed(err);
    }
    return false;
  }

  private async onNavigateToDashboardFailed(err): Promise<any> {
    return this.handleConnectionErrors({
      onRetry: async () => {
        try {
          return await this.routingService.navigate([APP_ROUTES.dashboard], { replaceUrl: true });
        } catch (ignored) {
          // ignored on purpose. 
        }
        return false;
      },
      onScanCode: async () => this.lockVault()
    });
  }


  userIsAuthenticating(): boolean {
    return this.isAuthenticating;
  }


  async handlePinUnlockError({ message, code }) {
    return this.logoutUser();
  }

  private async handleConnectionErrors(retryHandler: RetryHandler): Promise<any> {
    return await this.connectivityService.handleConnectionError(retryHandler);
  }

  async logoutUser(): Promise<any> {
    this.redirectToEntry();
    this._pinEnabledUserPreference = true;
    this._biometricsEnabledUserPreference = true;
    this.resetAll();
    return this.identityService.logoutUser();
  }


  async redirectToEntry() {
    return this.routingService.navigateAnonymous(ANONYMOUS_ROUTES.entry, { replaceUrl: true });
  }


  async isVaultLocked() {
    return this.identityService.isVaultLocked();
  }

  isExternalLogin(institutionInfo: Institution): boolean {
    if (!institutionInfo.authenticationInfo || !institutionInfo.authenticationInfo.authenticationType) return false;
    const authType: string = institutionInfo.authenticationInfo.authenticationType;
    return (
      authType === AuthenticationType.CAS ||
      authType === AuthenticationType.SSO_GENERIC ||
      authType === AuthenticationType.OKTA_EXT
    );
  }

  async isPinEnabled(sessionId: string, institutionId: string): Promise<boolean> {
    return this.settingsFacadeService
      .getSetting(Settings.Setting.PIN_ENABLED, sessionId, institutionId)
      .pipe(
        map(({ value }) => parseInt(value) === 1),
        take(1)
      )
      .toPromise();
  }

  async areBiometricsAvailable(): Promise<boolean> {
    return this.identityService
      .areBiometricsAvailable()
      .pipe(take(1))
      .toPromise();
  }


  async getAvailableBiometricHardware(): Promise<string[]> {
    return this.identityService
      .getAvailableBiometricHardware()
      .pipe(take(1))
      .toPromise();
  }

  setBiometricsEnabled(isBiometricsEnabled: boolean): Promise<void> {
    return this.identityService.setBiometricsEnabled(isBiometricsEnabled).then(() => {
      this._biometricsEnabledUserPreference = isBiometricsEnabled;
    });
  }

  get cachedPinEnabledUserPreference$(): Promise<boolean> {
    return this.storageStateService
      .getStateEntityByKey$<string>(this.pinEnabledUserPreference)
      .pipe(
        map(data => (data ? Boolean(data.value) : true)),
        take(1)
      )
      .toPromise();
  }

  get cachedBiometricsEnabledUserPreference$(): Promise<boolean> {
    return this.storageStateService
      .getStateEntityByKey$<string>(this.biometricsEnabledUserPreference)
      .pipe(
        map(data => (data ? Boolean(data.value) : true)),
        take(1)
      )
      .toPromise();
  }

  set _pinEnabledUserPreference(value: boolean) {
    this.storageStateService.updateStateEntity(this.pinEnabledUserPreference, value, { highPriorityKey: true });
  }

  set _biometricsEnabledUserPreference(value: boolean) {
    this.storageStateService.updateStateEntity(this.biometricsEnabledUserPreference, value, { highPriorityKey: true });
  }

  storedSession(): Promise<boolean> {
    return this.identityService.hasStoredSession();
  }

  lockVault() {
    this.identityService.lockVault();
  }

  setIsLocked() {
    this.identityService.setIsLocked();
  }

  getIsLocked() {
    return this.identityService.getIsLocked();
  }

  private async unlockVaultBiometrics() {
    return this.identityService.unlockVault()
      .then((v) => this.handleBiometricUnlockSuccess(v))
      .catch((error) => this.handleBiometricUnlockError(error))
  }

  private async unlockVaultPin() {
    return this.identityService.unlockVaultPin()
      .then((v) => this.handlePinUnlockSuccess(v))
      .catch((error) => this.handlePinUnlockError(error));
  }



  private async resetAll(): Promise<void> {
    firstValueFrom(this.userFacadeService.logoutAndRemoveUserNotification());
    this.merchantFacadeService.clearState();
    this.settingsFacadeService.cleanCache();
    this.contentStringFacade.clearState();
  }
}
