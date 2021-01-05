import { Injectable } from '@angular/core';
import {
  EnvironmentFacadeService,
  EnvironmentInfo,
  EnvironmentType,
} from '@core/facades/environment/environment.facade.service';
import { Device, Plugins } from '@capacitor/core';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { iif, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { Settings } from 'src/app/app.global';
import {
  CredentialStateChangeListener,
  DeviceState,
  IDeviceState,
  MobileCredentialManager,
} from '../model/shared/mobile-credential-manager';
import { CredentialManagerType, MobileCredentialManagerFactory } from './mobile-credential-manager.factory';
import { HIDCredentialManager } from '../model/android/hid/hid-credential-manager';
const { MobileCredentialStatusPlugin } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class MobileCredentialFacade {
  private mobileCredentialManager: MobileCredentialManager;
  private mCredentialEnabled: boolean = false;

  constructor(
    private readonly mobileCredentialManagerFactory: MobileCredentialManagerFactory,
    private readonly nativeProvider: NativeProvider,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly sessionFacade: SessionFacadeService,
    public readonly environmentFacade: EnvironmentFacadeService
  ) {
    this.onWillLogoutSubscription();
  }

  onWillLogoutSubscription(): void {
    this.sessionFacade.onWillLogoutSubject.subscribe(() => {
      if (this.mobileCredentialManager) {
        this.mobileCredentialManager.onWillLogout();
      }
    });
  }

  iifCredentialSettingsEnabled(): Observable<boolean> {
    return this.enabledCredentialsSettings().pipe(
      switchMap(credentialSettingsType => {
        if (credentialSettingsType) {
          return this.mobileCredentialManagerFactory.createCredentialManager(credentialSettingsType).pipe(
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

  enabledCredentialsSettings(): Observable<any> {
    const iosCredentialSettings = this.settingsFacadeService.getSetting(Settings.Setting.APPLE_WALLET_ENABLED).pipe(
      map(({ value }) => (Boolean(Number(value)) ? CredentialManagerType.IosCredential : false)),
      take(1)
    );
    const androidCredentialSettings = this.settingsFacadeService
      .getSetting(Settings.Setting.ANDROID_MOBILE_CREDENTIAL_ENABLED)
      .pipe(
        map(({ value }) => (Boolean(Number(value)) ? CredentialManagerType.AndroidCredential : false)),
        take(1)
      );

    return iif(() => this.nativeProvider.isIos(), iosCredentialSettings, androidCredentialSettings);
  }

  get uiIconUrl$(): Observable<string> {
    return of(this.mobileCredentialManager.getCredential().getUiIconUrl());
  }

  get uiText$(): Observable<string> {
    return of(this.mobileCredentialManager.getCredential().getStatusMsg());
  }

  get uiImageUrl$(): Observable<string> {
    return of(this.mobileCredentialManager.getCredential().getUiImageUrl());
  }

  get mobileCredentialAvailable$(): Observable<boolean> {
    if (this.mobileCredentialManager) {
      return this.mobileCredentialManager.credentialAvailable$();
    }
    return of(false);
  }

  showCredentialMetadata(): Observable<boolean> {
    return of(this.mobileCredentialManager && this.mobileCredentialManager instanceof HIDCredentialManager);
  }

  mobileCredentialEnabled$(): Observable<boolean> {
    return this.iifCredentialSettingsEnabled().pipe(
      switchMap(mobileCredentialSettingsEnabled => {
        return mobileCredentialSettingsEnabled ? this.mobileCredentialManager.credentialEnabled$() : of(false);
      }),
      tap(isEnabled => (this.mCredentialEnabled = isEnabled))
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
    this.mobileCredentialManager = null;
  }

  get deviceState$(): Promise<DeviceState> {
    const readDeviceState = async () => {
      let response = await MobileCredentialStatusPlugin.deviceNativeState();
      console.log('reading device state..........', response.deviceState);
      const deviceState = new DeviceState(response.deviceState);
      deviceState.env$ = envString(this.environmentFacade.getEnvironmentObject());
      deviceState.osVersion$ = (await Device.getInfo()).osVersion;
      return deviceState;
    };
    return readDeviceState();
  }
}

const envString = ({ environment }) => {
  switch (environment) {
    case EnvironmentType.develop:
      return 'Dev';
    case EnvironmentType.feature1:
      return 'F1';
    case EnvironmentType.qa:
      return 'QA';
    case EnvironmentType.demo:
      return 'demo';
    case EnvironmentType.pat:
      return 'pat';
    case EnvironmentType.production:
      return 'Prod';
    default:
      return 'Prod';
  }
};
