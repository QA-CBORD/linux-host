import { Injectable, Injector } from '@angular/core';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Settings } from 'src/app/app.global';
import { CredentialStateChangeSubscription, MobileCredentialManager } from '../model/shared/mobile-credential-manager';
import { AndroidCredentialManagerFactory } from './android-credential-manager.factory';
import { IOSCredentialManager } from './ios-credential-manager';

@Injectable()
export class MobileCredentialFacade {
  private mobileCredentialManager: MobileCredentialManager;

  constructor(
    private injector: Injector,
    private readonly nativeProvider: NativeProvider,
    private readonly settingsFacadeService: SettingsFacadeService
  ) {}

  private mobileCredentialSettingsEnabled$(): Observable<boolean> {
    const appleCredentialSettings$ = this.appleWalletSettingsEnabled$().pipe(take(1));
    const androidCredentialSettings$ = this.androidMobileCredentialSettingsEnabled$().pipe(take(1));
    return forkJoin(appleCredentialSettings$, androidCredentialSettings$).pipe(
      switchMap(([appleWalletSettingsEnabled, androidCredentialSettingsEnabled]) => {
        let mobileCredentialSettingsEnabled = false;
        if (appleWalletSettingsEnabled) {
          this.mobileCredentialManager = this.injector.get(IOSCredentialManager);
          mobileCredentialSettingsEnabled = true;
        } else if (androidCredentialSettingsEnabled) {
          const credentialManagerFactory = this.injector.get(AndroidCredentialManagerFactory);
          credentialManagerFactory.getCredentialManager().pipe(
            map(androidCredentialManager => {
              console.log('androidCredentialManager:L ', androidCredentialManager);
              if (androidCredentialManager) {
                this.mobileCredentialManager = androidCredentialManager;
                mobileCredentialSettingsEnabled = true;
              }
            })
          );
        }
        return of(mobileCredentialSettingsEnabled);
      })
    );
  }

  private appleWalletSettingsEnabled$(): Observable<boolean> {
    return this.nativeProvider.isIos()
      ? this.settingsFacadeService.getSetting(Settings.Setting.APPLE_WALLET_ENABLED).pipe(
          map(({ value }) => Boolean(Number(value))),
          take(1)
        )
      : of(false);
  }

  private androidMobileCredentialSettingsEnabled$(): Observable<boolean> {
    if (!this.nativeProvider.isAndroid()) {
      return of(false);
    }
    return this.settingsFacadeService.getSetting(Settings.Setting.ANDROID_MOBILE_CREDENTIAL_ENABLED).pipe(
      map(({ value }) => Boolean(Number(value))),
      take(1)
    );
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

  get mobileCredentialEnabled$(): Observable<boolean> {
    return this.mobileCredentialSettingsEnabled$().pipe(
      switchMap(mobileCredentialSettingsEnabled => {
        if (mobileCredentialSettingsEnabled) {
          return this.mobileCredentialManager.credentialEnabled$();
        }
        return of(false);
      })
    );
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

  setCredentialStateChangeCallback(callback: CredentialStateChangeSubscription): void {
    this.mobileCredentialManager.setCredentialStateChangeSubscrption(callback);
  }
}
