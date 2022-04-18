import { Injectable, NgZone } from '@angular/core';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { IdentityFacadeService, LoginState } from '@core/facades/identity/identity.facade.service';
import { ROLES } from '../../../app.global';
import { ANONYMOUS_ROUTES } from '../../../non-authorized/non-authorized.config';
import { Institution } from '@core/model/institution';
import { switchMap, take } from 'rxjs/operators';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { NavController, Platform } from '@ionic/angular';
import { MerchantFacadeService } from '@core/facades/merchant/merchant-facade.service';
import { Subject } from 'rxjs';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { SettingsFacadeService } from '../settings/settings-facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ContentStringsFacadeService } from '../content-strings/content-strings.facade.service';
import { NavigationService } from '@shared/services/navigation.service';
import { APP_ROUTES } from '@sections/section.config';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { VaultErrorCodes } from '@ionic-enterprise/identity-vault';
import { Router } from '@angular/router';
import { ToastService } from '@core/service/toast/toast.service';
import { NativeStartupFacadeService } from '../native-startup/native-startup.facade.service';
import { App } from '@capacitor/app';
import { BackgroundTask } from '@robingenz/capacitor-background-task';
import { ConnectivityServiceFacade } from '@shared/no-connectivity-screen/connectivity.service';
import { firstValueFrom } from '@shared/utils';
import { ConnectionService } from '@shared/services/connection-service';

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
  private _deepLinkPath: string[];

  navigatedFromGpay: boolean = false;
  onLogOutObservable$: Subject<any> = new Subject<any>();

  constructor(
    private readonly platform: Platform,
    private readonly router: Router,
    private readonly authFacadeService: AuthFacadeService,
    private readonly userFacadeService: UserFacadeService,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly merchantFacadeService: MerchantFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private navCtrl: NavController,
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService,
    private readonly contentStringFacade: ContentStringsFacadeService,
    private readonly routingService: NavigationService,
    private readonly nativeProvider: NativeProvider,
    private readonly nativeStartupFacadeService: NativeStartupFacadeService,
    private readonly ngZone: NgZone,    
    private readonly connectionService: ConnectionService,
  ) {
    this.appStateListeners();
  }

  // handle app state changes
  // must use Capacitor and Ionic Platform to ensure this is triggered on all devices/versions
  private appStateListeners() {
    App.addListener('appStateChange', async ({ isActive }) => {
      if (isActive) {
        this.onActiveState();
        await this.appResumeLogic();
      } else {
        if (!this.identityFacadeService.getIsLocked()) {
          this.closeTopControllers();
        }
        this.appStatus = AppStatus.BACKGROUND;
      }
    });
    App.addListener('appUrlOpen', data => {
      const url: string = data.url;
      if (url && url.includes('cbord.com')) {
        this._deepLinkPath = new URL(data.url).pathname.split('/').filter(s => s);
      }
    });

    this.platform.ready().then(() => {
      this.platform.resume.subscribe(() => {
        this.onActiveState();
      });

      this.platform.pause.subscribe(() => {
        this.appStatus = AppStatus.BACKGROUND;
      });
    });
  }

  private async appResumeLogic() {
    console.log('appResumeLogic navigatedToPlugin', this.navigatedToPlugin)
    if (this.navigatedToPlugin) {
      this.navigateToNativePlugin = false;
      return;
    }
    console.log('appResumeLogic navigatedFromGpay', this.navigatedFromGpay)
    if (this.navigatedFromGpay) {
      return;
    }

    const shouldShowStartup = (await this.isVaultLocked()) && !this.identityFacadeService.pinEntryInProgress;
    if (shouldShowStartup) {
      this.ngZone.run(async () => {
        await this.router
          .navigate([ROLES.anonymous, ANONYMOUS_ROUTES.startup], { replaceUrl: true })
          .then(navigated => {
            if (!navigated) {
              this.router.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.startup], { replaceUrl: true });
            }
          });
      });
    }
  }

  private async onActiveState() {
    /// use app status to prevent double calling
    if (this.appStatus === AppStatus.FOREGROUND) return;
    this.appStatus = AppStatus.FOREGROUND;
  }

  get navigatedToPlugin() {
    return this.navigateToNativePlugin;
  }

  set navigatedToPlugin(value: boolean) {
    this.navigateToNativePlugin = value;
  }
  get deepLinkPath() {
    return this._deepLinkPath;
  }
  navigatedToLinkPath() {
    this._deepLinkPath = null;
  }


  async determineAppLoginState(systemSessionId) {
    const appLoginState = await this.determineFromBackgroundLoginState(systemSessionId).catch(() => LoginState.PIN_LOGIN);
    await this.handleLoginState(appLoginState);
  }

  async handleServerError(message: string) {

    const serverTimedOut = /timeout/.test(message.toLowerCase());
    
    if (serverTimedOut) {

    }




  }

  async retrieveSystemSessionToken(): Promise<any> {
    await firstValueFrom(this.authFacadeService.getAuthSessionToken$())
      .then(this.determineAppLoginState)
      .catch(async ({ message }) => {
        if (/timeout/.test(message.toLowerCase()) && (await this.connectionService.deviceOffline())) {
        await this.identityFacadeService.showNoConnectivityScreen({
          onRetry: this.retrieveSystemSessionToken
        });
       } else {
         this.handlServerError(message);
         // what do we do if we get a backend error here, 
         // it will certainly show blue screen of death. so we need to define what do to.
       }
      });
  }


  async doLoginChecks() {
    console.log('doLoginChecks')
    this.loadingService.showSpinner();
    await this.retrieveSystemSessionToken();
    this.loadingService.showSpinner();
  }


  async handleLoginState(state: LoginState): Promise<void> {
    console.log('state ==>> ', state);
    const routeConfig = { replaceUrl: true };
    switch (state) {
      case LoginState.SELECT_INSTITUTION:
        await this.routingService.navigateAnonymous(ANONYMOUS_ROUTES.entry, routeConfig);
        break;
      case LoginState.BIOMETRIC_LOGIN:
        await this.loginUser(true);
        break;
      case LoginState.BIOMETRIC_SET:
        await this.navigateToDashboard();
        break;
      case LoginState.PIN_LOGIN:
        await this.loginUser(false);
        break;
      case LoginState.PIN_SET:
        await this.identityFacadeService.pinLoginSetup(false);
        break;
      case LoginState.HOSTED:
        await this.routingService.navigateAnonymous(ANONYMOUS_ROUTES.login, routeConfig);
        break;
      case LoginState.EXTERNAL:
        // check if institution has guest login enabled and user had been logged in as guest previously.  if yes redirect to login page instead.
        const isGuestloginEnabled = await this.authFacadeService.isGuestUser().toPromise();
        if (isGuestloginEnabled) {
          await this.routingService.navigateAnonymous(ANONYMOUS_ROUTES.login, routeConfig);
        } else {
          await this.routingService.navigateAnonymous(ANONYMOUS_ROUTES.external, routeConfig);
        }
        break;
      case LoginState.DONE:
        await this.navigateToDashboard();
        break;
      default:
        await this.logoutUser(true);
    }
  }

  async onRetry(): Promise<boolean> {

    await this.doLoginChecks();

    return true;
  }

  private navigateToDashboard = async () => {
    console.log('sessationFacade.navigateToDashbaord')
    return await this.routingService.navigate([APP_ROUTES.dashboard], { replaceUrl: true });
  };

  private async loginUser(useBiometric: boolean) {
    const canRetryUnlockWithPin = useBiometric;
    this.loadingService.closeSpinner();
    this.identityFacadeService
      .loginUser(useBiometric)
      .pipe(take(1))
      .subscribe({
        error: async ({ code }) => {
          if ((VaultErrorCodes.TooManyFailedAttempts == code && canRetryUnlockWithPin)) {
            this.identityFacadeService.tryPinLogin().catch(async () => await this.logoutUser(true));
          }
        }
      });
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

    let isPinLoginEnabled = false;

    try {
      isPinLoginEnabled = await this.identityFacadeService.isPinEnabled(sessionId, institutionInfo.id);
    } catch (error) {
      throw new Error('cannot determine isPingEnabled');
    }

    const isPinEnabledForUserPreference = await this.identityFacadeService.cachedPinEnabledUserPreference$;
    if (isPinLoginEnabled && isPinEnabledForUserPreference) {
      const vaultLocked: boolean = await this.identityFacadeService.isVaultLocked();
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
    console.log("sessionFacade logoutUser called... ", navigateToEntry)
    if (navigateToEntry) {
      await this.navCtrl.navigateRoot([ROLES.anonymous, ANONYMOUS_ROUTES.entry]);
      this.onLogOutObservable$.next();
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
    return !this.platform.is('cordova');
  }

  lockVault() {
    this.identityFacadeService.lockVault();
  }

  private async closeTopControllers() {
    const taskId = await BackgroundTask.beforeExit(async () => {
      this.nativeProvider.dismissTopControllers(
        !!this.nativeStartupFacadeService.blockNavigationStartup,
        this.nativeProvider.getKeepTopModal
      );
      BackgroundTask.finish({
        taskId,
      });
    });
  }
}
