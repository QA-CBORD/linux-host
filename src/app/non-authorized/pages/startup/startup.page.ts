import { Component, ElementRef } from '@angular/core';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { Location } from '@angular/common';
import { LoadingService } from '@core/service/loading/loading.service';
import { IdentityFacadeService, LoginState } from '@core/facades/identity/identity.facade.service';
import { ANONYMOUS_ROUTES } from '../../non-authorized.config';
import { NavigationService } from '@shared/services/navigation.service';
import { firstValueFrom } from '@shared/utils';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { APP_ROUTES } from '@sections/section.config';
import { DEVICE_MARKED_LOST } from '@shared/model/generic-constants';
import { ConnectivityAwareFacadeService, ExecOptions } from './connectivity-aware-facade.service';
import { VaultMigrateResult, VaultSession } from '@core/service/identity/model.identity';

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
    private readonly authFacadeService: AuthFacadeService,
    private readonly navigationService: NavigationService,
    private readonly connectivityAwareFacadeService: ConnectivityAwareFacadeService
  ) { }

  /// check login on enter
  ionViewDidEnter() {
    this.loadingService.showSpinner();
    const { skipLoginFlow, biometricEnabled } = (<any>this.location.getState());
    if (skipLoginFlow) {
      this.unlockVault(biometricEnabled)
    } else {
      this.checkLoginFlow();
    }
  }


  async checkLoginFlow() {
    // step 1: determine and initialize current environment.
    await this.environmentFacadeService.initialization();
    let session: VaultSession = null;

    try {
      session = await this.unlockVaultIfSetup();
    } catch (e) {
      /** will only get this error if vault was setup but user could not authenticate */
      return this.handleVaultUnlockFailure();
    }
    // step 2: Authenticate the app with GetService/Backend. watch for connection issues while doing that.
    const { data: systemSessionId } = await this.connectionIssueAwarePromiseExecute({
      promise: async () => firstValueFrom(this.authFacadeService.getAuthSessionToken$())
    }, !session?.pin);

    if (session?.pin) {
      return this.handleVaultLoginSuccess(session);
    }

    // step 3: check if vault needs to migrate data.
    if (this.vaultMigrationFailed(await this.identityFacadeService.migrateIfLegacyVault())) {
      return this.navigateAnonymous(ANONYMOUS_ROUTES.entry);
    }
    // step 4: determine appLoginState;
    const appLoginState = await this.sessionFacadeService.determineAppLoginState(systemSessionId);

    // step 5: interpret appLoginState and proceed accordingly.
    this.handleAppLoginState(appLoginState);
  }

  handleVaultUnlockFailure(): any {
    this.navigateAnonymous(ANONYMOUS_ROUTES.entry);
  }


  async connectionIssueAwarePromiseExecute(options: ExecOptions<any>, isVaultLocked = false) {
    return this.connectivityAwareFacadeService.execute(options, isVaultLocked);
  }


  authenticatePin(pin: string) {
    this.connectionIssueAwarePromiseExecute({
      promise: async () => await firstValueFrom(this.authFacadeService.authenticatePin$(pin)),
      rejectOnError: ({ message }) => DEVICE_MARKED_LOST.test(message)
    })
      .then(() => this.navigateToDashboard())
      .catch(() => this.navigateAnonymous(ANONYMOUS_ROUTES.entry));
  }


  async handleVaultLoginSuccess(session: VaultSession): Promise<void> {
    this.authenticatePin(session.pin);
  }


  /**
   * This only returns true if the user failed to authenticate (enters wrong pin, or fails biometric auth), while doing vault data migration;
   * @param migrationResult 
   * @returns 
   */
  private vaultMigrationFailed(migrationResult: VaultMigrateResult) {
    return VaultMigrateResult.MIGRATION_FAILED === migrationResult;
  }

  async navigateAnonymous(where: ANONYMOUS_ROUTES, data?: any, clearAll = true) {
    return await this.navigationService.navigateAnonymous(where, { ...data })
      .finally(() => clearAll && this.identityFacadeService.clearAll());
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
        this.navigateToDashboard();
        break;
      default:
        await this.navigateAnonymous(ANONYMOUS_ROUTES.entry, routeConfig);
    }
  }

  navigateToDashboard() {
    this.connectionIssueAwarePromiseExecute({
      promise: async () => this.navigationService.navigate([APP_ROUTES.dashboard], {
        replaceUrl: true,
        queryParams: { skipLoading: true }
      })
    });
  }


  // 
  async unlockVault(biometricEnabled: boolean): Promise<any> {
    try {
      return this.handleVaultLoginSuccess(
        await this.identityFacadeService.unlockVault(biometricEnabled));
    } catch {
      return this.handleVaultUnlockFailure();
    }
  }

  unlockVaultIfSetup(): Promise<VaultSession> {
    return this.identityFacadeService.unlockVaultIfLocked();
  }

  /// destroy after login complete
  ionViewDidLeave() {
    this.loadingService.closeSpinner();
    this.elementRef.nativeElement.remove();
  }
}
