import { Injectable } from '@angular/core';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { IdentityFacadeService, LoginState } from '@core/facades/identity/identity.facade.service';
import { ROLES } from '../../../app.global';
import { ANONYMOUS_ROUTES } from '../../../non-authorized/non-authorized.config';
import { Institution } from '@core/model/institution';
import { take } from 'rxjs/operators';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { NavController, Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { NavigationService } from '@shared/services/navigation.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { NativeStartupFacadeService } from '../native-startup/native-startup.facade.service';
import { App } from '@capacitor/app';
import { BackgroundTask } from '@robingenz/capacitor-background-task';
import { firstValueFrom } from '@shared/utils';
import { ConnectivityService } from '@shared/services/connectivity.service';

enum AppStatus {
  BACKGROUND,
  FOREGROUND,
}
@Injectable({
  providedIn: 'root',
})
export class SessionFacadeService {
  /// manages app to background status for plugins (camera, etc) that briefly leave the app and return
  private appStatus: AppStatus = AppStatus.FOREGROUND;
  private _deepLinkPath: string[];
  onLogOutObservable$: Subject<any> = new Subject<any>();

  constructor(
    private readonly platform: Platform,
    private readonly authFacadeService: AuthFacadeService,
    private readonly userFacadeService: UserFacadeService,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private navCtrl: NavController,
    private readonly loadingService: LoadingService,
    private readonly routingService: NavigationService,
    private readonly nativeProvider: NativeProvider,
    private readonly nativeStartupFacadeService: NativeStartupFacadeService,
    private readonly connectivityService: ConnectivityService
  ) {
    this.appStateListeners();
  }

  // handle app state changes
  // must use Capacitor and Ionic Platform to ensure this is triggered on all devices/versions
  private appStateListeners() {
    App.addListener('appStateChange', async ({ isActive }) => {
      if (isActive) {
        this.onActiveState();
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


  set canLockScreen(canLock: boolean) {
    this.identityFacadeService.canLockScreen(canLock);
  }

  private async onActiveState() {
    /// use app status to prevent double calling
    if (this.appStatus === AppStatus.FOREGROUND) return;
    this.appStatus = AppStatus.FOREGROUND;
  }

  get deepLinkPath() {
    return this._deepLinkPath;
  }
  navigatedToLinkPath() {
    this._deepLinkPath = null;
  }


  async determineAppLoginState(systemSessionId) {
    const appLoginState = await this.determineFromBackgroundLoginState(systemSessionId).catch(async () => LoginState.PIN_LOGIN);
    await this.handleLoginState(appLoginState);
  }

  async onScanCode(): Promise<void> {
    return this.lockVault();
  }

  async onRetry(): Promise<boolean> {
    await this.loadingService.showSpinner();
    let systemSesssionId;
    try {
      systemSesssionId = await firstValueFrom(this.authFacadeService.getAuthSessionToken$());
    } catch ({ message }) {
      return false;
    }

    await this.identityFacadeService.showSplashScreen();
    this.determineAppLoginState(systemSesssionId);
    return true;
  }

  async retrieveSystemSessionToken(): Promise<boolean> {
    await this.loadingService.showSpinner();
    let systemSesssionId;
    try {
      systemSesssionId = await firstValueFrom(this.authFacadeService.getAuthSessionToken$());
    } catch ({ message }) {
      this.connectivityService.handleConnectionError(this);
      return false;
    }
    //await this.connectivityService.closeIfOpened();
    this.determineAppLoginState(systemSesssionId);
    return true;
  }


  async doLoginChecks() {
    await this.retrieveSystemSessionToken();
  }


  async handleLoginState(state: LoginState): Promise<void> {
    const routeConfig = { replaceUrl: true };

    console.log("handleLoginState: ", state);
    switch (state) {

      case LoginState.SELECT_INSTITUTION:
        await this.routingService.navigateAnonymous(ANONYMOUS_ROUTES.entry, routeConfig);
        break;
      case LoginState.BIOMETRIC_LOGIN:
        await this.loginUser(true);
        break;
      case LoginState.PIN_LOGIN:
        await this.loginUser(false);
        break;
      case LoginState.HOSTED:
        await this.routingService.navigateAnonymous(ANONYMOUS_ROUTES.login, routeConfig);
        break;
      case LoginState.EXTERNAL:
        // check if institution has guest login enabled and user had been logged in as guest previously.  if yes redirect to login page instead.
        if ((await firstValueFrom(this.authFacadeService.isGuestUser()))) {
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


  private async navigateToDashboard() {
    this.identityFacadeService.navigateToDashboard();
  };

  private async loginUser(useBiometric: boolean) {
    this.loadingService.closeSpinner();
    this.identityFacadeService.loginUser(useBiometric);
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
      const vaultLoginSet: boolean = await this.identityFacadeService.hasStoredSession();

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
      await this.navCtrl.navigateRoot([ROLES.anonymous, ANONYMOUS_ROUTES.entry]);
      this.onLogOutObservable$.next();
    }
    this.identityFacadeService.logoutUser();
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
