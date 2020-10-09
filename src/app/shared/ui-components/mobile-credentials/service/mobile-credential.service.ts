import { Injectable, Injector } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { PartnerPaymentApiService } from '@core/service/payments-api/partner-payment-api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Settings } from 'src/app/app.global';
import { CredentialStateChangeSubscription, MobileCredentialManager } from '../model/shared/mobile-credential-manager';
import { AndroidCredentialManager } from './android-credential-manager';
import { IOSCredentialManager } from './ios-credential-manager';

@Injectable({
  providedIn: 'root',
})
export class MobileCredentialService {
  private mCredentialManager: MobileCredentialManager;

  constructor(
    private injector: Injector,
    private readonly nativeProvider: NativeProvider,
    private readonly settingsFacadeService: SettingsFacadeService,
    protected partnerPaymentApi: PartnerPaymentApiService,
    protected readonly storageStateService: StorageStateService,
    protected readonly authFacadeService: AuthFacadeService,
    protected readonly institutionFacadeService: InstitutionFacadeService
  ) {}

  mobileCredentialSettingsEnabled$(): Observable<boolean> {
    const appleCredentialSettings$ = this.appleWalletSettingsEnabled$().pipe(take(1));
    const androidCredentialSettings$ = this.androidMobileCredentialSettingsEnabled$().pipe(take(1));
    return forkJoin(appleCredentialSettings$, androidCredentialSettings$).pipe(
      switchMap(([appleWalletSettingsEnabled, androidCredentialSettingsEnabled]) => {
        console.log('appleWalletSettingsEnabled: ', appleWalletSettingsEnabled);
        if (appleWalletSettingsEnabled) {
          this.mCredentialManager = this.injector.get(IOSCredentialManager);
          return of(true);
        } else if (androidCredentialSettingsEnabled) {
          this.mCredentialManager = this.injector.get(AndroidCredentialManager);
          return of(true);
        }
        return of(false);
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
    return of(this.mCredentialManager.getCredential().getUiIconUrl());
  }

  get uiText$(): Observable<string> {
    return of(this.mCredentialManager.getCredential().getStatusMsg());
  }

  get uiImageUrl$(): Observable<string> {
    return of(this.mCredentialManager.getCredential().getUiImageUrl());
  }

  get mobileCredentialAvailable$(): Observable<boolean> {
    return this.mCredentialManager ? this.mCredentialManager.credentialAvailable$() : of(false);
  }

  get mobileCredentialEnabled$(): Observable<boolean> {
    return this.mobileCredentialSettingsEnabled$().pipe(
      switchMap(mobileCredentialSettingsEnabled => {
        return mobileCredentialSettingsEnabled ? this.mCredentialManager.credentialEnabled$() : of(false);
      })
    );
  }

  refreshCredentials(): void {
    this.mCredentialManager ? this.mCredentialManager.refresh() : undefined;
  }

  onImageClick(): void {
    this.mCredentialManager.onUiImageClicked();
  }

  onUiIconClicked(): void {
    this.mCredentialManager.onUiIconClicked();
  }

  setCredentialStateChangeCallback(callback: CredentialStateChangeSubscription): void {
    this.mCredentialManager.setCredentialStateChangeSubscrption(callback);
  }
}
