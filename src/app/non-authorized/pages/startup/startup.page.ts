import { Component, ElementRef, inject } from '@angular/core';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { Location } from '@angular/common';
import { LoadingService } from '@core/service/loading/loading.service';
import { IdentityFacadeService, LoginState } from '@core/facades/identity/identity.facade.service';
import { ANONYMOUS_ROUTES } from '../../non-authorized.config';
import { NavigationService } from '@shared/services/navigation.service';
import { firstValueFrom } from 'rxjs';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { APP_ROUTES } from '@sections/section.config';
import { DEVICE_MARKED_LOST } from '@shared/model/generic-constants';
import { ConnectivityAwareFacadeService, ExecOptions } from './connectivity-aware-facade.service';
import { VaultMigrateResult, VaultSession } from '@core/service/identity/model.identity';
import { ModalController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { NativeProvider } from '@core/provider/native-provider/native.provider';

@Component({
  selector: 'st-startup',
  templateUrl: './startup.page.html',
  styleUrls: ['./startup.page.scss'],
})
export class StartupPage {
  showLoading = false;

  private readonly nativeProvider = inject(NativeProvider);

  constructor(
    private readonly elementRef: ElementRef,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly location: Location,
    private readonly loadingService: LoadingService,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly navigationService: NavigationService,
    private readonly connectivityAwareFacadeService: ConnectivityAwareFacadeService,
    private readonly modalController: ModalController
  ) {}

  /// check login on enter
  ionViewDidEnter() {
    this.nativeProvider.dismissTopControllers();
    this.loadingService.showSpinner();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { skipAuthFlow, ...rest } = <any> this.location.getState();
    if (!skipAuthFlow) {
      this.startAuthFlow(rest);
    }
  }

  startAuthFlow({ skipLoginFlow, biometricEnabled }) {
    if (skipLoginFlow) {
      this.unlockVault(biometricEnabled);
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
    const hasPin = session && session.pin;
    // step 2: Authenticate the app with GetService/Backend. watch for connection issues while doing that.
    const { data: systemSessionId } = await this.connectionIssueAwarePromiseExecute(
      {
        promise: () => firstValueFrom(this.authFacadeService.getAuthSessionToken$()),
      },
      !hasPin
    );

    if (hasPin) {
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

  handleVaultUnlockFailure(): void {
    this.navigateAnonymous(ANONYMOUS_ROUTES.entry);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async connectionIssueAwarePromiseExecute(options: ExecOptions<any>, isVaultLocked = false) {
    return this.connectivityAwareFacadeService.execute({ shouldNavigate: true, ...options }, isVaultLocked);
  }

  authenticatePin(pin: string) {
    this.connectionIssueAwarePromiseExecute({
      promise: () => firstValueFrom(this.authFacadeService.authenticatePin$(pin)),
      rejectOnError: ({ message }) => DEVICE_MARKED_LOST.test(message),
    })
      .then(async () => {
        // Making sure vault is unlocked before continuing and repeating the flow in case it is.
        // This may ocurr on no conectivity screen sent to background.
        if (await this.identityFacadeService.isVaultLocked()) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { biometricEnabled } = <any> this.location.getState();
          return this.unlockVault(biometricEnabled);
        }

        return this.navigateToDashboard();
      })
      .catch(error => {
        if (error) {
          this.navigateAnonymous(ANONYMOUS_ROUTES.entry);
        }
      });
  }

  async handleVaultLoginSuccess(session: VaultSession): Promise<void> {
    this.authenticatePin(session.pin);
    this.showLoading = true;
  }

  /**
   * This only returns true if the user failed to authenticate (enters wrong pin, or fails biometric auth), while doing vault data migration;
   * @param migrationResult
   * @returns
   */
  private vaultMigrationFailed(migrationResult: VaultMigrateResult) {
    return VaultMigrateResult.MIGRATION_FAILED === migrationResult;
  }

  async navigateAnonymous(where: ANONYMOUS_ROUTES, data?: NavigationExtras, clearAll = true) {
    try {
      return await this.navigationService.navigateAnonymous(where, { ...data });
    } finally {
      clearAll && this.identityFacadeService.clearAll();
    }
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
        if (await firstValueFrom(this.authFacadeService.isGuestUser())) {
          await this.navigateAnonymous(ANONYMOUS_ROUTES.login, routeConfig, false);
        } else {
          await this.navigateAnonymous(ANONYMOUS_ROUTES.external, routeConfig, false);
        }
        break;
      case LoginState.DONE:
        await this.navigateToDashboard();
        break;
      default:
        await this.navigateAnonymous(ANONYMOUS_ROUTES.entry, routeConfig);
    }
  }

  public async navigateToDashboard() {
    this.connectionIssueAwarePromiseExecute({
      promise: () => {
        return this.navigationService.navigate([APP_ROUTES.dashboard], {
          replaceUrl: true,
          queryParams: { skipLoading: true },
        });
      },
    });
  }

  //
  async unlockVault(biometricEnabled: boolean): Promise<void> {
    return await this.identityFacadeService
      .unlockVault(biometricEnabled)
      .then(session => this.handleVaultLoginSuccess(session))
      .catch(() => this.handleVaultUnlockFailure());
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
