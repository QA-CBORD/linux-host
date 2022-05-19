import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { Location } from '@angular/common';
import { LoadingService } from '@core/service/loading/loading.service';
import { IdentityFacadeService, LoginState } from '@core/facades/identity/identity.facade.service';
import { VaultMigrateResult } from '@core/service/identity/vault.identity.service';
import { ANONYMOUS_ROUTES } from '../../non-authorized.config';
import { NavigationService } from '@shared/services/navigation.service';
import { firstValueFrom } from '@shared/utils';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { APP_ROUTES } from '@sections/section.config';
import { DEVICE_MARKED_LOST } from '@shared/model/generic-constants';
import { ConnectivityFacadeService } from './connectivity-facade.service';

@Component({
  selector: 'st-startup',
  templateUrl: './startup.page.html',
  styleUrls: ['./startup.page.scss'],
})
export class StartupPage {
  /// startup page used as a backdrop for login, it ensures global navbar is hidden by url route checking

  constructor(
    private readonly elementRef: ElementRef,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly location: Location,
    private readonly loadingService: LoadingService,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly ngZone: NgZone,
    private readonly authFacadeService: AuthFacadeService,
    private readonly navigationService: NavigationService,
    private readonly connectivityFacade: ConnectivityFacadeService
  ) { }

  /// check login on enter
  ionViewDidEnter() {
    this.loadingService.showSpinner();
    const { skipLoginFlow, biometricUsed } = (<any>this.location.getState());
    if (skipLoginFlow) {
      this.unlockVault(biometricUsed)
    } else {
      this.checkLoginFlow();
    }
  }


  private async checkLoginFlow() {
    // step 1: determine and initialize current environment.
    await this.environmentFacadeService.initialization();


    // step 2: Authenticate the app with GetService/Backend. watch for connection issues while doing that.
    const { data: systemSessionId } = await this.connectivityFacade.exec({
      promise: async () => firstValueFrom(this.authFacadeService.getAuthSessionToken$())
    });

    // step 3: check if vault needs to migrate data.
    const migrationResult = await this.identityFacadeService.migrateIfLegacyVault();

    if (this.vaultMigrationFailed(migrationResult)) {
      return this.navigateAnonymous(ANONYMOUS_ROUTES.entry);
    }

    // step 4: determine appLoginState;
    const appLoginState = await this.sessionFacadeService.determineAppLoginState(systemSessionId);

    // step 5: interpret appLoginState and proceed accordingly.
    if (this.userIsLoggedIn(appLoginState)) {
      this.unlockVault(appLoginState == LoginState.BIOMETRIC_LOGIN);
    } else {
      this.handleAppLoginState(appLoginState);
    }
  }


  private userIsLoggedIn(appLoginState: LoginState): boolean {
    return appLoginState == LoginState.BIOMETRIC_LOGIN || appLoginState == LoginState.PIN_LOGIN;
  }


  handleVaultLoginFailure(error: any): any {
    this.navigateAnonymous(ANONYMOUS_ROUTES.entry);
  }


  async handleVaultLoginSuccess(pin: string, biometricUsed: boolean): Promise<void> {
    if (biometricUsed) {
      const code = {
        promise: async () => await firstValueFrom(this.authFacadeService.authenticatePin$(pin)),
        skipError: ({ message }) => DEVICE_MARKED_LOST.test(message)
      };
      this.connectivityFacade.exec(code)
        .then(() => this.navigateToDashboard())
        .catch(() => this.navigateAnonymous(ANONYMOUS_ROUTES.entry));
    } else {
      this.navigateToDashboard();
    }
  }


  /**
   * This only returns true if the user failed to authenticate (enters wrong pin, or fails biometric auth), while doing vault data migration;
   * @param migrationResult 
   * @returns 
   */
  private vaultMigrationFailed(migrationResult: VaultMigrateResult) {
    return VaultMigrateResult.MIGRATION_FAILED === migrationResult;
  }

  async navigateAnonymous(where: ANONYMOUS_ROUTES, data?: any, clearAll: boolean = true) {
    return await this.ngZone.run(async () => {
      return await this.navigationService.navigateAnonymous(where, { ...data });
    }).finally(() => clearAll && this.identityFacadeService.clearAll());
  }

  async handleAppLoginState(state: LoginState): Promise<void> {
    const routeConfig = { replaceUrl: true };

    switch (state) {
      case LoginState.SELECT_INSTITUTION:
        await this.navigateAnonymous(ANONYMOUS_ROUTES.entry, routeConfig);
        break;
      case LoginState.HOSTED:
        await this.navigateAnonymous(ANONYMOUS_ROUTES.login, routeConfig, false);
        break;
      case LoginState.EXTERNAL:
        // check if institution has guest login enabled and user had been logged in as guest previously.  if yes redirect to login page instead.
        if ((await firstValueFrom(this.authFacadeService.isGuestUser()))) {
          await this.navigateAnonymous(ANONYMOUS_ROUTES.login, routeConfig, false);
        } else {
          await this.navigateAnonymous(ANONYMOUS_ROUTES.external, routeConfig, false);
        }
        break;
      case LoginState.DONE:
        await this.navigateToDashboard();
        break;
      default:
        await this.sessionFacadeService.logoutUser(true);
    }
  }

  public async navigateToDashboard() {
    await this.connectivityFacade.exec({
      promise: async () => this.navigationService.navigate([APP_ROUTES.dashboard], {
        replaceUrl: true,
        queryParams: { skipLoading: true }
      })
    })
  }


  // 
  private async unlockVault(biometricEnabled: boolean): Promise<any> {
    return await this.identityFacadeService.unlockVault(biometricEnabled)
      .then(({ pin, biometricUsed }) => this.handleVaultLoginSuccess(pin, biometricUsed))
      .catch((error) => this.handleVaultLoginFailure(error));
  }

  /// destroy after login complete
  ionViewDidLeave() {
    this.loadingService.closeSpinner();
    this.elementRef.nativeElement.remove();
  }
}
