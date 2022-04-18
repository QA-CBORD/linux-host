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
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { RetryHandler } from '@shared/no-connectivity-screen/model/retry-handler';

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


  constructor(
    private readonly storageStateService: StorageStateService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly identityService: IdentityService,
  ) {
    super();
  }

  async tryPinLogin(): Promise<string> {
    return await this.identityService.tryPinLogin();
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
        this.identityService
          .initAndUnlock({ username: undefined, token: undefined, pin: data }, biometricEnabled, navigateToDashboard)
          .pipe(take(1))
          .toPromise();
        return Promise.resolve();
    }
  }

  loginUser(useBiometric: boolean) {
    if (useBiometric) {
      return this.identityService.unlockVault();
    } else {
      return this.identityService.unlockVaultPin();
    }
  }

  get pinEntryInProgress(): boolean {
    return this.identityService.unclockPinInProgress;
  }

  logoutUser(): Promise<void> {
    this._pinEnabledUserPreference = true;
    this._biometricsEnabledUserPreference = true;
    return this.identityService.logoutUser();
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

  async showNoConnectivityScreen(retryHandler: RetryHandler) {
    return this.identityService.showNoConnectivityModal(retryHandler);
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
}
