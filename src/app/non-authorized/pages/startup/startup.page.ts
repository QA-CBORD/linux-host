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
import { StartupService } from './startup-helper.service';
import { DEVICE_MARKED_LOST } from '@shared/model/generic-constants';

@Component({
  selector: 'st-startup',
  templateUrl: './startup.page.html',
  styleUrls: ['./startup.page.scss'],
})
export class StartupPage implements OnInit {
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
    private readonly startupService: StartupService
  ) { }

  ngOnInit(): void {
    console.log("STARTUP PAGE, ngOnInit: ");
  }

  /// check login on enter
  ionViewDidEnter() {
    console.log("STARTUP PAGE, ION VIEW DID ENTER: ");

    this.loadingService.showSpinner();
    const { skipLoginFlow, navigateToDashboard, biometricUsed } = this.location.getState() as any;
    console.log("ROUTER HISTORY STATE: ",
      { skipLoginFlow, navigateToDashboard, biometricUsed });

    if (skipLoginFlow) {
      this.unlockVault(biometricUsed)
    } else if (navigateToDashboard) {
      this.navigateToDashboard();
    } else {
      this.checkLoginFlow();
    }
  }


  private async checkLoginFlow() {
    // step 1: determine and initialize current environment.
    await this.environmentFacadeService.initialization();

    // step 2: check if vault needs to migrate data.

    const migrationResult = await this.identityFacadeService.migrateIfLegacyVault();

    if (this.vaultMigrationFailed(migrationResult)) {
      return this.navigateAnonymous(ANONYMOUS_ROUTES.entry);
    }

    // step 3: Authenticate the app with GetService/Backend. watch for connection issues while doing that.
    const { data: systemSessionId } = await this.startupService.executePromise({
      actualMethod: async () => firstValueFrom(this.authFacadeService.getAuthSessionToken$())
    });

    // step 4: determine appLoginState;
    const appLoginState = await this.sessionFacadeService.determineAppLoginState(systemSessionId);

    // step 5: interpret appLoginState and proceed accordingly.
    if (this.userIsLoggedIn(appLoginState)) {
      this.unlockVault(appLoginState == LoginState.BIOMETRIC_LOGIN);
    } else {
      this.handleLoginState(appLoginState);
    }
  }


  private userIsLoggedIn(appLoginState: LoginState): boolean {
    return appLoginState == LoginState.BIOMETRIC_LOGIN || appLoginState == LoginState.PIN_LOGIN;
  }


  handleVaultLoginFailure(error: any): any {
    console.log(" handleVaultLoginFailure: ", error);
    this.navigateAnonymous(ANONYMOUS_ROUTES.entry);
  }
  async handleVaultLoginSuccess(pin: string, biometricUsed: boolean): Promise<any> {
    console.log(" handleVaultLoginSuccess: ", pin, " biometricUsed: ", biometricUsed)
    if (biometricUsed) {
      // first get a new sessionId using the pin you got from vault. watch for connectionIssues on this call.
      try {
        await this.startupService.executePromise({
          actualMethod: async () => await firstValueFrom(this.authFacadeService.authenticatePin$(pin)),
          showLoading: true,
          skipError: ({ message }) => DEVICE_MARKED_LOST.test(message)
        });
        this.navigateToDashboard();
      } catch (error) {
        // asumming this pin expired/reported lost.
        console.log("Error executing authFacadeService.authenticatePin$ with pin ", pin, "Details: ", error);
        this.navigateAnonymous(ANONYMOUS_ROUTES.entry);
      }
    } else {
      this.navigateToDashboard();
    }
  }


  private vaultMigrationFailed(migrationResult: VaultMigrateResult) {
    return VaultMigrateResult.MIGRATION_FAILED === migrationResult;
  }

  async navigateAnonymous(where: ANONYMOUS_ROUTES, data?: any, clearAll: boolean = true) {
    return await this.ngZone.run(async () => {
      return await this.navigationService.navigateAnonymous(where, { ...data });
    }).finally(() => clearAll && this.identityFacadeService.clearAll());
  }

  async handleLoginState(state: LoginState): Promise<void> {
    const routeConfig = { replaceUrl: true };

    console.log("handleLoginState: ", state);
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
    await this.startupService.executePromise({
      actualMethod: async () => this.navigationService.navigate([APP_ROUTES.dashboard], {
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
