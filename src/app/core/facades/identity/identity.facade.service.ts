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
import { SessionData, VaultMigrateResult, VaultIdentityService, VaultTimeoutOptions } from '@core/service/identity/vault.identity.service';
import { UserPreferenceService } from '@shared/services/user-preferences/user-preference.service';
import { ConnectivityAwareFacadeService } from 'src/app/non-authorized/pages/startup/connectivity-aware-facade.service';

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
    private readonly identityService: VaultIdentityService,
    private readonly userFacadeService: UserFacadeService,
    private readonly merchantFacadeService: MerchantFacadeService,
    private readonly contentStringFacade: ContentStringsFacadeService,
    private readonly routingService: NavigationService,
    private readonly userPreferenceService: UserPreferenceService,
    private readonly connectivityFacade: ConnectivityAwareFacadeService
  ) {
    super();
  }


  async pinLoginSetup(
    biometricEnabled: boolean,
    navigateToDashboard = true,
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
        return this.initAndUnlock({ pin: data, biometricEnabled }, navigateToDashboard);
    }
  }

  /// will attempt to use pin and/or biometric - will fall back to passcode if needed
  /// will require pin set
  private initAndUnlock(session: SessionData, navigateToDashboard: boolean) {
    if (navigateToDashboard) {
      this.navigateToDashboard()
    }
    this.identityService.login(session);
  }

  migrateIfLegacyVault(): Promise<VaultMigrateResult> {
    return this.identityService.migrateIfLegacyVault();
  }

  updateVaultTimeout(options: VaultTimeoutOptions) {
    return this.identityService.updateVaultTimeout(options);
  }

  unlockVault(biometricEnabled: boolean): Promise<{ pin: string, biometricEnabled: boolean }> {
    return this.identityService.unlockVault(biometricEnabled);
  }


  public navigateToDashboard() {
    this.connectivityFacade.execute({
      promise: async () => await this.routingService.navigate([APP_ROUTES.dashboard], {
        replaceUrl: true, queryParams: { skipLoading: true }
      })
    });
  }

  async logoutUser(): Promise<boolean> {
    await this.redirectToEntry();
    this.clearAll();
    return true;
  }


  clearAll() {
    this._pinEnabledUserPreference = true;
    this._biometricsEnabledUserPreference = true;
    this.resetAll();
    this.identityService.logout();
  }


  private redirectToEntry(): Promise<boolean> {
    return this.routingService.navigateAnonymous(ANONYMOUS_ROUTES.entry, { replaceUrl: true });
  }


  isVaultLocked() {
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

  isPinEnabled(sessionId: string, institutionId: string): Promise<boolean> {
    return firstValueFrom(this.settingsFacadeService
      .getSetting(Settings.Setting.PIN_ENABLED, sessionId, institutionId)
      .pipe(
        map(({ value }) => parseInt(value) === 1),
        take(1)
      ));
  }

  isBiometricAvailable(): Promise<boolean> {
    return this.identityService.isBiometricAvailable();
  }


  getAvailableBiometricHardware(): Promise<string[]> {
    return this.identityService.getAvailableBiometricHardware();
  }

  async setBiometricsEnabled(isBiometricsEnabled: boolean): Promise<void> {
    await this.identityService.setBiometricsEnabled(isBiometricsEnabled);
    this._biometricsEnabledUserPreference = isBiometricsEnabled;
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

  private resetAll() {
    firstValueFrom(this.userFacadeService.logoutAndRemoveUserNotification());
    this.merchantFacadeService.clearState();
    this.settingsFacadeService.cleanCache();
    this.contentStringFacade.clearState();
  }
}
