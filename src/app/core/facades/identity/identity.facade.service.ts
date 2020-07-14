import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { IdentityService } from '@core/service/identity/identity.service';
import { Device } from '@capacitor/core';
import { Settings } from '../../../app.global';
import { map, take } from 'rxjs/operators';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Institution } from '@core/model/institution';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { AuthenticationType } from '@core/model/authentication/authentication-info.model';
import { PinAction, PinCloseStatus } from '@shared/ui-components/pin/pin.page';

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
    private readonly institutionFacadeService: InstitutionFacadeService
  ) {
    super();
  }

  async determinePostLoginState(sessionId: string, institutionId: string): Promise<LoginState> {
    const isWeb: boolean = await this.getIsWeb();
    if (isWeb) {
      return LoginState.DONE;
    } else {
      const isPinLoginEnabled = await this.isPinEnabled(sessionId, institutionId);
      const isPinEnabledForUserPreference = await this.cachedPinEnabledUserPreference$;
      if (isPinLoginEnabled && isPinEnabledForUserPreference) {
        const isBiometricsAvailable = await this.areBiometricsAvailable();
        const isBiometricsEnabledForUserPreference = await this.cachedBiometricsEnabledUserPreference$;
        if (isBiometricsAvailable && isBiometricsEnabledForUserPreference) {
          return LoginState.BIOMETRIC_SET;
        } else {
          return LoginState.PIN_SET;
        }
      }
      return LoginState.DONE;
    }
  }

  async determineInstitutionSelectionLoginState(): Promise<LoginState> {
    const institutionInfo: Institution = await this.institutionFacadeService.cachedInstitutionInfo$
      .pipe(take(1))
      .toPromise();
    return this.isExternalLogin(institutionInfo) ? LoginState.EXTERNAL : LoginState.HOSTED;
  }

  async determineFromBackgroundLoginState(sessionId: string): Promise<LoginState> {
    const institutionInfo: Institution = await this.institutionFacadeService.cachedInstitutionInfo$
      .pipe(take(1))
      .toPromise();
    const isInstitutionSelected: boolean = !!institutionInfo;
    if (!isInstitutionSelected) {
      return LoginState.SELECT_INSTITUTION;
    }
    const isWeb: boolean = await this.getIsWeb();
    const usernamePasswordLoginType: LoginState = this.isExternalLogin(institutionInfo)
      ? LoginState.EXTERNAL
      : LoginState.HOSTED;

    if (isWeb) {
      return usernamePasswordLoginType;
    }
    const isPinLoginEnabled = await this.isPinEnabled(sessionId, institutionInfo.id);
    const isPinEnabledForUserPreference = await this.cachedPinEnabledUserPreference$;

    if (isPinLoginEnabled && isPinEnabledForUserPreference) {
      const vaultLocked: boolean = await this.identityService.isVaultLocked();
      const vaultLoginSet: boolean = await this.identityService.hasStoredSession();

      /// pin not set but have logged in before, use normal login
      if (!vaultLoginSet) {
        return usernamePasswordLoginType;
      }

      if (!vaultLocked) {
        return LoginState.DONE;
      }

      const isBiometricsAvailable = await this.areBiometricsAvailable();
      const isBiometricsEnabledForUserPreference = await this.cachedBiometricsEnabledUserPreference$;
      if (isBiometricsAvailable && isBiometricsEnabledForUserPreference) {
        return LoginState.BIOMETRIC_LOGIN;
      } else {
        return LoginState.PIN_LOGIN;
      }
    }
    return usernamePasswordLoginType;
  }

  async pinOnlyLoginSetup(): Promise<any> {
    console.log('Pin only login setup');
    const { data, role } = await this.identityService.presentPinModal(PinAction.SET_PIN_ONLY);
    console.log('Pin only login setup modal resp', data, role );
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
        await this.identityService
          .initAndUnlockPasscodeOnly({ username: undefined, token: undefined, pin: data })
          .pipe(take(1))
          .toPromise();
        return Promise.resolve();
    }
  }

  async biometricLoginSetup(): Promise<any> {
    const { data, role } = await this.identityService.presentPinModal(PinAction.SET_BIOMETRIC);
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
        await this.identityService
          .initAndUnlockBiometricAndPasscode({ username: undefined, token: undefined, pin: data })
          .pipe(take(1))
          .toPromise();
        return Promise.resolve();
    }
  }

  loginUser(useBiometric: boolean) {
    if (useBiometric) {
      this.identityService.unlockVault();
    } else {
      this.identityService.unlockVaultPin();
    }
  }

  logoutUser() {
    this._pinEnabledUserPreference = true;
    this._biometricsEnabledUserPreference = true;
    this.identityService.logoutUser();
  }

  async getIsWeb(): Promise<boolean> {
    const { operatingSystem } = await Device.getInfo();
    return !(operatingSystem === 'ios' || operatingSystem === 'android');
  }

  get isVaultLocked(){
    return this.identityService.isVaultLocked();
  }

  private isExternalLogin(institutionInfo: Institution): boolean {
    if (!institutionInfo.authenticationInfo || !institutionInfo.authenticationInfo.authenticationType) return false;
    const authType: string = institutionInfo.authenticationInfo.authenticationType;
    return (
      authType === AuthenticationType.CAS ||
      authType === AuthenticationType.SSO_GENERIC ||
      authType === AuthenticationType.OKTA_EXT
    );
  }

  private async isPinEnabled(sessionId: string, institutionId: string): Promise<boolean> {
    return this.settingsFacadeService
      .getSetting(Settings.Setting.PIN_ENABLED, sessionId, institutionId)
      .pipe(
        map(({ value }) => parseInt(value) === 1),
        take(1),
      )
      .toPromise();
  }

  private async areBiometricsAvailable(): Promise<boolean> {
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

  get cachedPinEnabledUserPreference$(): Promise<boolean> {
    return this.storageStateService
      .getStateEntityByKey$<string>(this.pinEnabledUserPreference)
      .pipe(
        map(data => (data && data.value ? Boolean(data.value) : true)),
        take(1)
      )
      .toPromise();
  }

  get cachedBiometricsEnabledUserPreference$(): Promise<boolean> {
    return this.storageStateService
      .getStateEntityByKey$<string>(this.biometricsEnabledUserPreference)
      .pipe(
        map(data => (data && data.value ? Boolean(data.value) : true)),
        take(1)
      )
      .toPromise();
  }

  set _pinEnabledUserPreference(value: boolean) {
    this.storageStateService.updateStateEntity(this.pinEnabledUserPreference, value);
  }

  set _biometricsEnabledUserPreference(value: boolean) {
    this.storageStateService.updateStateEntity(this.biometricsEnabledUserPreference, value);
  }

}
