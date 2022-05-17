import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { Settings } from '../../../app.global';
import { map, take } from 'rxjs/operators';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Institution } from '@core/model/institution';
import { AuthenticationType } from '@core/model/authentication/authentication-info.model';
import { PinAction, PinCloseStatus } from '@shared/ui-components/pin/pin.page';
import { UserFacadeService } from '../user/user.facade.service';
import { MerchantFacadeService } from '../merchant/merchant-facade.service';
import { ContentStringsFacadeService } from '../content-strings/content-strings.facade.service';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';
import { firstValueFrom } from '@shared/utils';
import { APP_ROUTES } from '@sections/section.config';
import { NavigationService } from '@shared/services/navigation.service';
import { DEVICE_MARKED_LOST } from '@shared/model/generic-constants';
import { EventInfo, SessionData, VaultMigrateResult, VaultService } from '@core/service/identity/vault.identity.service';
import { UserPreferenceService } from '@shared/services/user-preferences/user-preference.service';
import { StartupService } from 'src/app/non-authorized/pages/startup/startup-helper.service';

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
    private readonly userPreferenceService: UserPreferenceService,
    private readonly startupService: StartupService
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
        return this.initAndUnlock({ pin: data, useBiometric: biometricEnabled }, navigateToDashboard);
    }
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

  async migrateIfLegacyVault(): Promise<VaultMigrateResult> {
    return this.identityService.migrateIfLegacyVault();
  }

  onNavigateExternal(e: EventInfo){
    return this.identityService.onNavigateExternal(e);
  }

  shouldLogoutUser(error): boolean {
    return !(error?.code === PinCloseStatus.CLOSED_NO_CONNECTION);
  }

  async unlockVault(useBiometric: boolean): Promise<{ pin: string, biometricUsed: boolean }> {
    return this.identityService.unlockVault(useBiometric);
  }

  deviceMarkedAsLost({ message }) {
    return DEVICE_MARKED_LOST.test(message);
  }

  async handleDeviceLostException() {
    this.logoutUser();
  }

  public async navigateToDashboard() {
    this.startupService.executePromise({
      actualMethod: async () => await this.routingService.navigate([APP_ROUTES.dashboard], {
        replaceUrl: true, queryParams: { skipLoading: true }
      })
    });
  }

  async logoutUser(): Promise<boolean> {
    return this.redirectToEntry().then(() => {
      this.clearAll();
      return true;
    });
  }


  async clearAll() {
    this._pinEnabledUserPreference = true;
    this._biometricsEnabledUserPreference = true;
    this.resetAll();
    this.identityService.logout();
  }


  async redirectToEntry(): Promise<boolean> {
    console.log("redirectToEntry: redirectToEntry")
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
    return firstValueFrom(this.settingsFacadeService
      .getSetting(Settings.Setting.PIN_ENABLED, sessionId, institutionId)
      .pipe(
        map(({ value }) => parseInt(value) === 1),
        take(1)
      ));
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
