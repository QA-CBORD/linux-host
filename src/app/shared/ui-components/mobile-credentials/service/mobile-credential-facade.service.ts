import { Injectable } from '@angular/core';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { iif, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { Settings } from 'src/app/app.global';
import { CredentialStateChangeListener, MobileCredentialManager } from '../model/shared/mobile-credential-manager';
import { CredentialManagerType, MobileCredentialManagerFactory } from './mobile-credential-manager.factory';

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
    private readonly sessionFacade: SessionFacadeService
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
}
