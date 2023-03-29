import { Injectable } from '@angular/core';
import { EnvironmentFacadeService, EnvironmentType } from '@core/facades/environment/environment.facade.service';
import { Device } from '@capacitor/device';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { iif, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { Settings } from 'src/app/app.global';
import {
  CredentialStateChangeListener,
  DeviceState,
  MobileCredentialManager,
} from '../model/shared/mobile-credential-manager';
import { CredentialManagerType, MobileCredentialManagerFactory } from './mobile-credential-manager.factory';
import { HIDCredentialManager } from '../model/android/hid/hid-credential-manager';
import { GooglePayCredentialManager } from '../model/android/google-pay/google-pay-credential-manager';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { registerPlugin } from '@capacitor/core';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const  MobileCredentialStatusPlugin  = registerPlugin<any>('MobileCredentialStatusPlugin');

@Injectable({
  providedIn: 'root',
})
export class MobileCredentialFacade {
  private mobileCredentialManager: MobileCredentialManager = null;
  private mCredentialEnabled = false;
  private mobileCredentialSettingsAlreadyChecked = false;
  constructor(
    private readonly mobileCredentialManagerFactory: MobileCredentialManagerFactory,
    private readonly nativeProvider: NativeProvider,
    private readonly settingsFacadeService: SettingsFacadeService,
    public readonly environmentFacade: EnvironmentFacadeService,
    private readonly sessionFacadeService: SessionFacadeService
  ) {
    this.onLogoutSubscription();
  }

  onLogoutSubscription(): void {
    this.sessionFacadeService.onLogOutObservable$.subscribe(() => {
      this.mobileCredentialSettingsAlreadyChecked = false;
      this.mCredentialEnabled = false;
      this.onLogout();
    });
  }

  iifCredentialSettingsEnabled(): Observable<boolean> {
    return this.enabledCredentialsSettings().pipe(
      take(1),
      switchMap(credentialSettingsType => {
        if (credentialSettingsType) {
          return this.mobileCredentialManagerFactory.createCredentialManager(credentialSettingsType).pipe(
            take(1),
            map(credentialManager => {
              if (credentialManager) {
                this.mobileCredentialManager = credentialManager;
                return true;
              } else {
                return false;
              }
            })
          );
        } else {
          return of(false);
        }
      }),
      catchError(() => of(false))
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enabledCredentialsSettings(): Observable<any> {
    const iosCredentialSettings = this.settingsFacadeService.getSetting(Settings.Setting.APPLE_WALLET_ENABLED).pipe(
      take(1),
      // eslint-disable-next-line no-extra-boolean-cast
      map(({ value }) => (Boolean(Number(value)) ? CredentialManagerType.IosCredential : false))
    );
    const androidCredentialSettings = this.settingsFacadeService
      .getSetting(Settings.Setting.ANDROID_MOBILE_CREDENTIAL_ENABLED)
      .pipe(
        take(1),
        // eslint-disable-next-line no-extra-boolean-cast
        map(({ value }) => (Boolean(Number(value)) ? CredentialManagerType.AndroidCredential : false))
      );

    return iif(() => this.nativeProvider.isIos(), iosCredentialSettings, androidCredentialSettings);
  }

  get uiIconUrl$(): Observable<string> {
    return of(
      this.mobileCredentialManager && this.mobileCredentialManager.getCredential() && this.mobileCredentialManager.getCredential().getUiIconUrl()
    );
  }

  get uiText$(): Observable<string> {
    return of(
      this.mobileCredentialManager &&  this.mobileCredentialManager.getCredential() && this.mobileCredentialManager.getCredential().getStatusMsg()
    );
  }

  get uiImageUrl$(): Observable<string> {
    return of(
      this.mobileCredentialManager && this.mobileCredentialManager.getCredential() && this.mobileCredentialManager.getCredential().getUiImageUrl()
    );
  }

  get mobileCredentialAvailable$(): Observable<boolean> {
    if (this.mobileCredentialManager) {
      return this.mobileCredentialManager.credentialAvailable$();
    }
    return of(false);
  }

  showCredentialMetadata(): Observable<boolean> {
    return of(
      this.mobileCredentialManager &&
        (this.mobileCredentialManager instanceof HIDCredentialManager ||
          this.mobileCredentialManager instanceof GooglePayCredentialManager)
    );
  }

  mobileCredentialEnabled$(): Observable<boolean> {
    if (this.mobileCredentialSettingsAlreadyChecked) {
      return of(this.mCredentialEnabled);
    }

    return this.iifCredentialSettingsEnabled().pipe(
      switchMap(settingEnabled => {
        this.mCredentialEnabled = settingEnabled;
        this.mobileCredentialSettingsAlreadyChecked = true;
        if (settingEnabled) {
          return this.mobileCredentialManager.credentialEnabled$();
        } else {
          return of(false);
        }
      }),
      take(1)
    );
  }

  get isEnabled$(): Observable<boolean> {
    return of(this.mCredentialEnabled);
  }

  refreshCredentials(): void {
    if (this.mobileCredentialManager) {
      this.mobileCredentialManager.refresh();
    }
  }

  onImageClick(): void {
    this.mobileCredentialManager.onUiImageClicked();
  }

  onUiIconClicked(): void {
    this.mobileCredentialManager.onUiIconClicked();
  }

  setCredentialStateChangeListener(listener: CredentialStateChangeListener): void {
    if (this.mobileCredentialManager) {
      this.mobileCredentialManager.setCredentialStateChangeListener(listener);
    }
  }

  onDestroy() {
   // this.mobileCredentialManager = null;
  }

  get deviceState$(): Promise<DeviceState> {
    const readDeviceState = async () => {
      let credentialType = 'HID';
      if (this.mobileCredentialManager instanceof GooglePayCredentialManager) credentialType = 'NXP_GOOGLE';
      const response = await MobileCredentialStatusPlugin.deviceNativeState({ credentialType });
      const deviceState = new DeviceState(response.deviceState);
      deviceState.env$ = envString(this.environmentFacade.getEnvironmentObject());
      deviceState.osVersion$ = (await Device.getInfo()).osVersion;
      return deviceState;
    };
    return readDeviceState();
  }

  async onLogout(): Promise<void> {
    if (this.mobileCredentialManager) this.mobileCredentialManager.onWillLogout();
    this.mobileCredentialManager = null;
  }

  get credentialController(): MobileCredentialManager {
    return this.mobileCredentialManager;
  }
}

const envString = ({ environment }) => {
  switch (environment) {
    case EnvironmentType.develop:
      return 'Development';
    case EnvironmentType.feature1:
      return 'F1';
    case EnvironmentType.qa:
      return 'QA';
    case EnvironmentType.demo:
      return 'demo';
    case EnvironmentType.pat:
      return 'pat';
    case EnvironmentType.production:
      return 'Production';
    default:
      return 'Production';
  }
};
