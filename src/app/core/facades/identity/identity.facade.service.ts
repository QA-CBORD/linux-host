import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { Settings } from '../../../app.global';
import { map, take } from 'rxjs/operators';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Institution } from '@core/model/institution';
import { AuthenticationType } from '@core/model/authentication/authentication-info.model';
import { PinAction, PinCloseStatus } from '@shared/ui-components/pin/pin.page';
import { RetryHandler } from '@shared/ui-components/no-connectivity-screen/model/connectivity-page.model';
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
import { DEVICE_MARKED_LOST, NO_INTERNET_STATUS_CODE } from '@shared/model/generic-constants';
import { ConnectionService } from '@shared/services/connection-service';
import { SessionData, VaultService } from '@core/service/identity/vault.identity.service';
import { UserPreferenceService } from '@shared/services/user-preferences/user-preference.service';
import { ApplicationService, EventInfo } from '@shared/services/application.service';

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



  constructor(
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly identityService: VaultService,
    private readonly userFacadeService: UserFacadeService,
    private readonly merchantFacadeService: MerchantFacadeService,
    private readonly contentStringFacade: ContentStringsFacadeService,
    private readonly routingService: NavigationService,
    private readonly loadingService: LoadingService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly connectivityService: ConnectivityService,
    private readonly userPreferenceService: UserPreferenceService,
    private readonly vaultStateService: ApplicationService,
  ) {
    super();
    window['identityFacade'] = this;
    this.vaultEventSubscription();
  }



  vaultEventSubscription() {
    this.identityService.vaultAuthEventObs.subscribe(({ success, biometricUsed, error }) => {
      if (success) {
        if (biometricUsed) {
          this.handleBiometricUnlockSuccess();
        } else {
          this.handlePinUnlockSuccess();
        }
      } else {
        console.log("error event: ", error);
        if (this.shouldLogoutUser(error)) {
          this.logoutUser();
        }
      }
    });
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
        return this.initAndUnlock({ pin: data, useBiometric: biometricEnabled }, navigateToDashboard);
    }
  }



  async onNavigateExternal(e: EventInfo) {
    this.vaultStateService.onNavigateExternal(e);
  }


  /// will attempt to use pin and/or biometric - will fall back to passcode if needed
  /// will require pin set
  private async initAndUnlock(session: SessionData, navigateToDashboard: boolean): Promise<void> {
    console.log("initAndUnlock navigateToDashboard: ", navigateToDashboard)
    if (navigateToDashboard) {
      this.navigateToDashboard()
    }
    await this.identityService.login(session);
  }

  async handlePinUnlockSuccess() {
    console.log("handlePinUnlockSuccess: ")
    this.navigateToDashboard();
  }

  async handleBiometricUnlockSuccess() {
    console.log("handleBiometricUnlockSuccess: ");
    this.authenticateUserPin();
  }


  shouldLogoutUser(error): boolean {
    return !(error?.code === PinCloseStatus.CLOSED_NO_CONNECTION);
  }

  async loginUser(useBiometric: boolean) {
    this.identityService.unlockVault(useBiometric);
  }

  private async authenticateUserPin() {
    let pin: string;

    try {
      pin = await this.identityService.retrieveVaultPin();
    } catch (error) {
      return await this.logoutUser();
    }

    try {
      this.loadingService.showSpinner({ duration: 50000 });
      await firstValueFrom(this.authFacadeService.authenticatePin$(pin))
    } catch (error) {
      await this.loadingService.closeSpinner();
      return await this.onAuthenticateUserPinFailed(error);
    }
    await this.loadingService.closeSpinner();
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
        console.log("onAuthenticateUserPinFailed onRetry: ");
        const pin = await this.identityService.retrieveVaultPin();
        try {
          await this.loadingService.showSpinner();
          await firstValueFrom(this.authFacadeService.authenticatePin$(pin));
          await this.loadingService.closeSpinner();
          await this.showSplashScreen();
          console.log("onAuthenticateUserPinFailed onRetry: 222 ");
          return await this.navigateToDashboard();
        } catch (error) {
          await this.loadingService.closeSpinner();
        }
        return false;
      },
      onScanCode: async () => { }
    });
  }

  async handleDeviceLostException() {
    this.logoutUser();
  }

  public async navigateToDashboard() {
    try {
      return this.showSplashScreen()
          .then(async () => await this.routingService.navigate([APP_ROUTES.dashboard], { 
             replaceUrl: true, 
             state: { skipLoading: true },
             queryParams: { skipLoading: true }
            }));
    } catch (err) {
      this.onNavigateToDashboardFailed(err);
    }
    return false;
  }

  private async onNavigateToDashboardFailed(err): Promise<any> {
    return this.handleConnectionErrors({
      onRetry: async () => {
        try {
          await this.showSplashScreen();
          return await this.routingService.navigate([APP_ROUTES.dashboard], { replaceUrl: true });
        } catch (error) {
          //
        }
        return false;
      },
      onScanCode: async () => { }
    }, true);
  }

  private async handleConnectionErrors(retryHandler: RetryHandler, openAsModal: boolean = false): Promise<any> {
    return await this.connectivityService.handleConnectionError(retryHandler, openAsModal);
  }

  async logoutUser(): Promise<any> {
    this.redirectToEntry();
    this._pinEnabledUserPreference = true;
    this._biometricsEnabledUserPreference = true;
    this.resetAll();
    return this.identityService.logout();
  }


  async redirectToEntry() {
    return this.routingService.navigateAnonymous(ANONYMOUS_ROUTES.entry, { replaceUrl: true })
      .then((success) => !success && this.redirectToEntry());
  }


  async isVaultLocked() {
    return this.identityService.isVaultLocked();
  }

  async showSplashScreen(): Promise<boolean> {
    return this.identityService.showSplashScreen();
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
    return this.identityService.areBiometricsAvailable();
  }


  async getAvailableBiometricHardware(): Promise<string[]> {
    return this.identityService.getAvailableBiometricHardware();
  }

  async setBiometricsEnabled(isBiometricsEnabled: boolean): Promise<void> {
    return this.identityService.setBiometricsEnabled(isBiometricsEnabled).then(() => {
      this._biometricsEnabledUserPreference = isBiometricsEnabled;
    });
  }

  get cachedPinEnabledUserPreference$(): Promise<boolean> {
    return this.userPreferenceService.cachedPinEnabledUserPreference();
  }

  get cachedBiometricsEnabledUserPreference$(): Promise<boolean> {
    return this.userPreferenceService.cachedBiometricsEnabledUserPreference();
  }

  private set _pinEnabledUserPreference(value: boolean) {
    this.userPreferenceService.setPinEnabledUserPreference(value);
  }

  set _biometricsEnabledUserPreference(value: boolean) {
    this.userPreferenceService.setBiometricsEnabledUserPreference(value);
  }

  hasStoredSession(): Promise<boolean> {
    return this.identityService.hasStoredSession();
  }

  lockVault() {
    this.identityService.lockVault();
  }

  setIsLocked() {
    this.identityService.lockVault();
  }

  getIsLocked() {
    return this.identityService.getIsLocked();
  }

  private async resetAll(): Promise<void> {
    firstValueFrom(this.userFacadeService.logoutAndRemoveUserNotification());
    this.merchantFacadeService.clearState();
    this.settingsFacadeService.cleanCache();
    this.contentStringFacade.clearState();
  }
}
