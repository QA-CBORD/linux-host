import { Injectable } from '@angular/core';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { IdentityFacadeService, LoginState } from '@core/facades/identity/identity.facade.service';
import { ROLES } from '../../../app.global';
import { ANONYMOUS_ROUTES } from '../../../non-authorized/non-authorized.config';
import { Institution } from '@core/model/institution';
import { switchMap, take } from 'rxjs/operators';
import { AppState, Plugins } from '@capacitor/core';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { NavController, Platform } from '@ionic/angular';
import { MerchantFacadeService } from '@core/facades/merchant/merchant-facade.service';
import { from, Subject } from 'rxjs';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { SettingsFacadeService } from '../settings/settings-facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ContentStringsFacadeService } from '../content-strings/content-strings.facade.service';
import { NavigationService } from '@shared/services/navigation.service';
import { APP_ROUTES } from '@sections/section.config';
import { ActionSheetController } from '@ionic/angular';
const { App, Device, BackgroundTask } = Plugins;

enum AppStatus {
  BACKGROUND,
  FOREGROUND,
}

@Injectable({
  providedIn: 'root',
})
export class SessionFacadeService {
  /// manages app to background status for plugins (camera, etc) that briefly leave the app and return
  private navigateToNativePlugin: boolean = false;
  private appStatus: AppStatus = AppStatus.FOREGROUND;
  navigatedFromGpay: boolean = false;
  onLogOutObservable$: Subject<any> = new Subject<any>();

  constructor(
    private readonly platform: Platform,
    private readonly authFacadeService: AuthFacadeService,
    private readonly userFacadeService: UserFacadeService,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly merchantFacadeService: MerchantFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private navCtrl: NavController,
    private readonly loadingService: LoadingService,
    private readonly contentStringFacade: ContentStringsFacadeService,
    private readonly routingService: NavigationService,
    private readonly actionSheetController: ActionSheetController,
  ) {
    this.appStateListeners();
  }

  // handle app state changes
  // must use Capacitor and Ionic Platform to ensure this is triggered on all devices/versions
  private appStateListeners() {
    App.addListener('appStateChange', ({ isActive }: AppState) => {
      if (isActive) {
        this.appResumeLogic();
      } else {
        this.appStatus = AppStatus.BACKGROUND;
      }
    });

    this.platform.ready().then(() => {
      this.platform.resume.subscribe(() => {
        this.appResumeLogic();
      });

      this.platform.pause.subscribe(() => {
        this.appStatus = AppStatus.BACKGROUND;
      });
    });
  }

  private async appResumeLogic() {
    /// use app status to prevent double calling
    if (this.appStatus === AppStatus.FOREGROUND) return;
    this.appStatus = AppStatus.FOREGROUND;

    if (this.navigatedToPlugin) {
      this.navigateToNativePlugin = false;
      return;
    }

    if (this.navigatedFromGpay) {
      return;
    }

    if (await this.isVaultLocked()) {
      this.routingService.navigateAnonymous(ANONYMOUS_ROUTES.startup, { skipLocationChange: true })
    }
  }

  get navigatedToPlugin() {
    return this.navigateToNativePlugin;
  }

  set navigatedToPlugin(value: boolean) {
    this.navigateToNativePlugin = value;
  }

  doLoginChecks() {
   
    this.loadingService.showSpinner();
    const routeConfig = { replaceUrl: true };
    this.authFacadeService
      .getAuthSessionToken$()
      .pipe(
        take(1),
        switchMap(sessionId => from(this.determineFromBackgroundLoginState(sessionId)))
      )
      .subscribe(
        async state => {
          console.log('doLoginChecks ==>> ', state)
          await this.loadingService.closeSpinner();
          switch (state) {
            case LoginState.SELECT_INSTITUTION:
              this.routingService.navigateAnonymous(ANONYMOUS_ROUTES.entry, routeConfig);
              break;
            case LoginState.BIOMETRIC_LOGIN:
              this.loginUser(true);
              break;
            case LoginState.BIOMETRIC_SET:
              this.navigate2Dashboard();
              break;
            case LoginState.PIN_LOGIN:
              this.loginUser(false);
              break;
            case LoginState.PIN_SET:
              this.identityFacadeService.pinLoginSetup(false);
              break;
            case LoginState.HOSTED:
              this.routingService.navigateAnonymous(ANONYMOUS_ROUTES.login, routeConfig);
              break;
            case LoginState.EXTERNAL:
              this.routingService.navigateAnonymous(ANONYMOUS_ROUTES.external, routeConfig);
              break;
            case LoginState.DONE:
              this.navigate2Dashboard();
              break;
          }
        },
        async error => {
          console.log('The error => ', error);
          await this.loadingService.closeSpinner();
          (async () => {
            await this.routingService.navigateAnonymous(ANONYMOUS_ROUTES.entry, routeConfig);
          })();
        }
      );
  }

  private async navigate2Dashboard(): Promise<void> {
      this.routingService.navigate([APP_ROUTES.dashboard], { replaceUrl: true });
  }

  private loginUser(useBiometric: boolean) {
    this.identityFacadeService.loginUser(useBiometric).subscribe(
      () => {},
      () => {
        if (!useBiometric) {
          this.loadingService.closeSpinner();
          this.routingService.navigateAnonymous(ANONYMOUS_ROUTES.entry, { replaceUrl: true })
        }
      }
    );
  }

  async determinePostLoginState(sessionId: string, institutionId: string): Promise<LoginState> {
    const isWeb: boolean = await this.getIsWeb();
    if (isWeb) {
      return LoginState.DONE;
    } else {
      const isPinLoginEnabled = await this.identityFacadeService.isPinEnabled(sessionId, institutionId);
      const isPinEnabledForUserPreference = await this.identityFacadeService.cachedPinEnabledUserPreference$;
      if (isPinLoginEnabled && isPinEnabledForUserPreference) {
        const isBiometricsAvailable = await this.identityFacadeService.areBiometricsAvailable();
        const isBiometricsEnabledForUserPreference = await this.identityFacadeService
          .cachedBiometricsEnabledUserPreference$;
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

    return this.identityFacadeService.isExternalLogin(institutionInfo) ? LoginState.EXTERNAL : LoginState.HOSTED;
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
    const usernamePasswordLoginType: LoginState = this.identityFacadeService.isExternalLogin(institutionInfo)
      ? LoginState.EXTERNAL
      : LoginState.HOSTED;

    if (isWeb) {
      return usernamePasswordLoginType;
    }
    const isPinLoginEnabled = await this.identityFacadeService.isPinEnabled(sessionId, institutionInfo.id);
    const isPinEnabledForUserPreference = await this.identityFacadeService.cachedPinEnabledUserPreference$;
    if (isPinLoginEnabled && isPinEnabledForUserPreference) {
      const vaultLocked: boolean = await this.identityFacadeService.vaultLocked();
      const vaultLoginSet: boolean = await this.identityFacadeService.storedSession();

      /// pin not set but have logged in before, use normal login
      if (!vaultLoginSet) {
        return usernamePasswordLoginType;
      }

      if (!vaultLocked) {
        return LoginState.DONE;
      }

      const isBiometricsAvailable = await this.identityFacadeService.areBiometricsAvailable();
      const isBiometricsEnabledForUserPreference = await this.identityFacadeService
        .cachedBiometricsEnabledUserPreference$;
      if (isBiometricsAvailable && isBiometricsEnabledForUserPreference) {
        return LoginState.BIOMETRIC_LOGIN;
      } else {
        return LoginState.PIN_LOGIN;
      }
    }
    return usernamePasswordLoginType;
  }

  isVaultLocked() {
    return this.identityFacadeService.isVaultLocked();
  }

  handlePushNotificationRegistration() {
    this.userFacadeService.handlePushNotificationRegistration();
  }

  async logoutUser(navigateToEntry: boolean = true) {
    if (navigateToEntry) {
      this.onLogOutObservable$.next();
      await this.navCtrl.navigateRoot([ROLES.anonymous, ANONYMOUS_ROUTES.entry]);
    }
    this.resetAll();
  }

  private async resetAll(): Promise<void> {
    await this.userFacadeService.logoutAndRemoveUserNotification().toPromise();
    await this.identityFacadeService.logoutUser();
    this.merchantFacadeService.clearState();
    this.settingsFacadeService.cleanCache();
    this.contentStringFacade.clearState();
  }

  async getIsWeb(): Promise<boolean> {
    const { operatingSystem } = await Device.getInfo();
    return !(operatingSystem === 'ios' || operatingSystem === 'android');
  }

  lockVault() {
    this.identityFacadeService.lockVault();
  }

  closeActionsheetOnBackground() {
    App.addListener('appStateChange', (state) => {
      if (!state.isActive) {
        const taskId = BackgroundTask.beforeExit(async () => {
          await this.actionSheetController.dismiss();
          BackgroundTask.finish({
            taskId
          });
        });
      }
    })
  }
}
