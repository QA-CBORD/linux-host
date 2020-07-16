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
    console.log('checkPostLoginState');
    const isWeb: boolean = await this.getIsWeb();
    console.log(0);
    if (isWeb) {
      console.log(1);
      return LoginState.DONE;
    } else {
      console.log(2);
      const isPinLoginEnabled = await this.isPinEnabled(sessionId, institutionId);
      const isPinEnabledForUserPreference = await this.cachedPinEnabledUserPreference$;
      if (isPinLoginEnabled && isPinEnabledForUserPreference) {
        console.log(3);
        const isBiometricsAvailable = await this.areBiometricsAvailable();
        const isBiometricsEnabledForUserPreference = await this.cachedBiometricsEnabledUserPreference$;
        if (isBiometricsAvailable && isBiometricsEnabledForUserPreference) {
          return LoginState.BIOMETRIC_SET;
          console.log(4);
        } else {
          console.log(5);
          return LoginState.PIN_SET;
        }
      }
      console.log(6);
      return LoginState.DONE;
    }
  }

  async determineInstitutionSelectionLoginState(): Promise<LoginState> {
    console.log('determineInstSelectionLoginState');
    const institutionInfo: Institution = await this.institutionFacadeService.cachedInstitutionInfo$
      .pipe(take(1))
      .toPromise();
    console.log('determineInstSelectionLoginState - inst info', institutionInfo);

    return this.isExternalLogin(institutionInfo) ? LoginState.EXTERNAL : LoginState.HOSTED;
  }

  async determineFromBackgroundLoginState(sessionId: string): Promise<LoginState> {
    console.log('determineFromBackgroundLoginState');
    const institutionInfo: Institution = await this.institutionFacadeService.cachedInstitutionInfo$
      .pipe(take(1))
      .toPromise();
    console.log('determineFromBackgroundLoginState - inst info', institutionInfo);
    const isInstitutionSelected: boolean = !!institutionInfo;
    console.log(0);
    if (!isInstitutionSelected) {
      console.log(1);
      return LoginState.SELECT_INSTITUTION;
    }
    console.log(2);

    const isWeb: boolean = await this.getIsWeb();
    console.log(3);
    const usernamePasswordLoginType: LoginState = this.isExternalLogin(institutionInfo)
      ? LoginState.EXTERNAL
      : LoginState.HOSTED;

    console.log(33);
    if (isWeb) {
      console.log(4);
      return usernamePasswordLoginType;
    }
    console.log(5);
    const isPinLoginEnabled = await this.isPinEnabled(sessionId, institutionInfo.id);
    console.log(55);
    const isPinEnabledForUserPreference = await this.cachedPinEnabledUserPreference$;
    console.log(6);

    if (isPinLoginEnabled && isPinEnabledForUserPreference) {
      console.log(7);
      const vaultLocked: boolean = await this.identityService.isVaultLocked();
      console.log(8);
      const vaultLoginSet: boolean = await this.identityService.hasStoredSession();
      console.log(9);

      /// pin not set but have logged in before, use normal login
      if (!vaultLoginSet) {
        return usernamePasswordLoginType;
      }

      if (!vaultLocked) {
        return LoginState.DONE;
      }

      const isBiometricsAvailable = await this.areBiometricsAvailable();
      console.log(10);
      const isBiometricsEnabledForUserPreference = await this.cachedBiometricsEnabledUserPreference$;
      console.log(11);
      if (isBiometricsAvailable && isBiometricsEnabledForUserPreference) {
        return LoginState.BIOMETRIC_LOGIN;
      } else {
        return LoginState.PIN_LOGIN;
      }
    }
    console.log(12);
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
    console.log('Biometric login setup');
    const { data, role } = await this.identityService.presentPinModal(PinAction.SET_BIOMETRIC);
    console.log('Biometric login setup modal resp', { data, role });

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
    console.log('Login User - biometric =', useBiometric);
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
