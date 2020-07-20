import { Injectable } from '@angular/core';

import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { IdentityFacadeService, LoginState } from '@core/facades/identity/identity.facade.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';

import { Router } from '@angular/router';

import { ROLES } from '../../../app.global';
import { GUEST_ROUTES } from '../../../non-authorized/non-authorized.config';
import { Institution } from '@core/model/institution';
import { take } from 'rxjs/operators';
import { Device } from '@capacitor/core';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { migrateLegacyGlobalConfig } from '@angular/cli/utilities/config';

@Injectable({
  providedIn: 'root',
})
export class SessionFacadeService {
  constructor(
    private readonly userFacadeService: UserFacadeService,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly storageStateService: StorageStateService,
    private readonly router: Router
  ) {}

  onNewInstitutionSelected() {
    this.storageStateService.clearState();
    this.storageStateService.clearStorage();
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
      const isPinLoginEnabled = await this.identityFacadeService.isPinEnabled(sessionId, institutionId);
      const isPinEnabledForUserPreference = await this.identityFacadeService.cachedPinEnabledUserPreference$;
      if (isPinLoginEnabled && isPinEnabledForUserPreference) {
        console.log(3);
        const isBiometricsAvailable = await this.identityFacadeService.areBiometricsAvailable();
        const isBiometricsEnabledForUserPreference = await this.identityFacadeService
          .cachedBiometricsEnabledUserPreference$;
        if (isBiometricsAvailable && isBiometricsEnabledForUserPreference) {
          console.log(4);
          return LoginState.BIOMETRIC_SET;
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

    return this.identityFacadeService.isExternalLogin(institutionInfo) ? LoginState.EXTERNAL : LoginState.HOSTED;
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
    const usernamePasswordLoginType: LoginState = this.identityFacadeService.isExternalLogin(institutionInfo)
      ? LoginState.EXTERNAL
      : LoginState.HOSTED;

    console.log(33);
    if (isWeb) {
      console.log(4);
      return usernamePasswordLoginType;
    }
    console.log(5);
    const isPinLoginEnabled = await this.identityFacadeService.isPinEnabled(sessionId, institutionInfo.id);
    console.log(55);
    const isPinEnabledForUserPreference = await this.identityFacadeService.cachedPinEnabledUserPreference$;
    console.log(6);

    if (isPinLoginEnabled && isPinEnabledForUserPreference) {
      console.log(7);
      const vaultLocked: boolean = await this.identityFacadeService.vaultLocked();
      console.log(8);
      const vaultLoginSet: boolean = await this.identityFacadeService.storedSession();
      console.log(9);

      /// pin not set but have logged in before, use normal login
      if (!vaultLoginSet) {
        return usernamePasswordLoginType;
      }

      if (!vaultLocked) {
        return LoginState.DONE;
      }

      const isBiometricsAvailable = await this.identityFacadeService.areBiometricsAvailable();
      console.log(10);
      const isBiometricsEnabledForUserPreference = await this.identityFacadeService
        .cachedBiometricsEnabledUserPreference$;
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

  isVaultLocked() {
    return this.identityFacadeService.isVaultLocked;
  }

  handlePushNotificationRegistration() {
    this.userFacadeService.handlePushNotificationRegistration();
  }

  async logoutUser(navigateToEntry: boolean = true) {
    await this.userFacadeService.logoutAndRemoveUserNotification().toPromise();
    this.identityFacadeService.logoutUser();
    this.storageStateService.clearState();
    this.storageStateService.clearStorage();
    if (navigateToEntry) {
      this.router.navigate([ROLES.guest, GUEST_ROUTES.entry]);
    }
  }

  async getIsWeb(): Promise<boolean> {
    const { operatingSystem } = await Device.getInfo();
    return !(operatingSystem === 'ios' || operatingSystem === 'android');
  }
}
