import { Injectable } from '@angular/core';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { IdentityFacadeService, LoginState } from '@core/facades/identity/identity.facade.service';
import { Institution } from '@core/model/institution';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { Platform } from '@ionic/angular';
import { Subject, firstValueFrom } from 'rxjs';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { NativeStartupFacadeService } from '../native-startup/native-startup.facade.service';
import { ConnectivityAwareFacadeService } from 'src/app/non-authorized/pages/startup/connectivity-aware-facade.service';
import { AppStatesFacadeService } from '../appEvents/app-events.facade.service';

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
  onLogOutObservable$ = new Subject();

  constructor(
    private readonly platform: Platform,
    private readonly userFacadeService: UserFacadeService,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly connectivityFacade: ConnectivityAwareFacadeService,
    private readonly nativeProvider: NativeProvider,
    private readonly nativeStartupFacadeService: NativeStartupFacadeService,
    private readonly appStatesFacadeService: AppStatesFacadeService
  ) {
    this.addAppStateListeners();
  }

  /**
   * @function addAppStateListeners
   * @description handle app state changes, must use Capacitor and Ionic Platform to ensure this is triggered on all devices/versions
   */
  public addAppStateListeners() {
    this.appStatesFacadeService.getStateChangeEvent$.subscribe(async ({ isActive }) => {
      if (isActive) {
        this.onActiveState();
      } else {
        this.appStatus = AppStatus.BACKGROUND;
        if (!this.connectivityFacade.isModalOpened()) {
          this.closeTopControllers();
        }
      }
    });
    this.appStatesFacadeService.getAppUrlOpenEvent$.subscribe(data => {
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

  determineAppLoginState(systemSessionId: string): Promise<LoginState> {
    return this.determineFromBackgroundLoginState(systemSessionId);
  }

  async determinePostLoginState(sessionId: string, institutionId: string): Promise<LoginState> {
    const isWeb: boolean = await this.getIsWeb();
    if (isWeb) {
      return LoginState.DONE;
    } else {
      const { data: isPinLoginEnabled } = await this.connectivityFacade.execute(
        {
          promise: () => this.identityFacadeService.isPinEnabled(sessionId, institutionId),
          showLoading: false,
        },
        false
      );
      const isPinEnabledForUserPreference = await this.identityFacadeService.cachedPinEnabledUserPreference$;
      if (isPinLoginEnabled && isPinEnabledForUserPreference) {
        const isBiometricsEnabled = await this.identityFacadeService.isBiometricAvailable();
        const isBiometricsEnabledForUserPreference = await this.identityFacadeService
          .cachedBiometricsEnabledUserPreference$;
        const loadBiometrics = isBiometricsEnabled && isBiometricsEnabledForUserPreference;
        const biometricsEnabledAtPhoneSettings = await this.identityFacadeService.biometricsEnabledAtPhoneSettings$;
        if (loadBiometrics) {
          return LoginState.BIOMETRIC_SET;
        } else if (!loadBiometrics && !biometricsEnabledAtPhoneSettings) {
          return LoginState.PIN_SET;
        }
      }
      return LoginState.DONE;
    }
  }

  async determineInstitutionSelectionLoginState(): Promise<LoginState> {
    const institutionInfo: Institution = await firstValueFrom(this.institutionFacadeService.cachedInstitutionInfo$);
    return this.identityFacadeService.isExternalLogin(institutionInfo) ? LoginState.EXTERNAL : LoginState.HOSTED;
  }

  async determineFromBackgroundLoginState(sessionId: string): Promise<LoginState> {
    const institutionInfo: Institution = await firstValueFrom(this.institutionFacadeService.cachedInstitutionInfo$);
    const isInstitutionSelected = !!institutionInfo;
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

    const { data: isPinLoginEnabled } = await this.connectivityFacade.execute({
      promise: () => this.identityFacadeService.isPinEnabled(sessionId, institutionInfo.id),
      showLoading: false,
    });

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
    }
    return usernamePasswordLoginType;
  }

  isVaultLocked() {
    return this.identityFacadeService.isVaultLocked();
  }

  handlePushNotificationRegistration() {
    this.userFacadeService.handlePushNotificationRegistration();
  }

  async logoutUser(navigateToEntry = true): Promise<boolean> {
    if (navigateToEntry) {
      this.onLogOutObservable$.next(null);
    }
    return this.identityFacadeService.logoutUser();
  }

  async getIsWeb(): Promise<boolean> {
    return !this.platform.is('cordova');
  }

  lockVault() {
    this.identityFacadeService.lockVault();
  }

  private async closeTopControllers() {
    if (this.getIsWeb()) return;
    this.nativeProvider.dismissTopControllers(
      !!this.nativeStartupFacadeService.blockNavigationStartup,
      this.nativeProvider.getKeepTopModal
    );
  }
}
