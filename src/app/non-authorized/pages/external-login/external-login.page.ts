import { Component, OnDestroy, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserObject, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { LoadingService } from '@core/service/loading/loading.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { first, map, take } from 'rxjs/operators';
import { Institution } from '@core/model/institution';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { Observable, Subscription } from 'rxjs';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { Router } from '@angular/router';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { IdentityFacadeService, LoginState } from '@core/facades/identity/identity.facade.service';
import { PATRON_NAVIGATION, Settings } from '../../../app.global';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';

@Component({
  selector: 'st-external-login',
  templateUrl: './external-login.page.html',
  styleUrls: ['./external-login.page.scss'],
})
export class ExternalLoginPage implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  nativeHeaderBg$: Promise<string>;

  private browser: InAppBrowserObject;
  private sessionId: string;
  private institutionId: string;

  constructor(
    private readonly appBrowser: InAppBrowser,
    private readonly loadingService: LoadingService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.loadLoginContent();
  }

  ngOnDestroy() {
    if (this.subscriptions) this.subscriptions.unsubscribe();
    if (this.browser) this.browser.close();
  }

  loadLoginContent() {
    this.loadingService.showSpinner();
    const instSub = this.institutionFacadeService.cachedInstitutionInfo$.pipe(first()).subscribe(
      institutionInfo => {
        this.institutionId = institutionInfo.id;
        this.nativeHeaderBg$ = this.getNativeHeaderBg(this.institutionId);
        this.initializeInAppBrowser(institutionInfo);
      },
      error => {
        /// show error and option to retry
      },
      () => {}
    );
    this.subscriptions.add(instSub);
  }

  initializeInAppBrowser(institutionInfo: Institution) {
    console.log('initializeInAppBrowser', institutionInfo);
    const target = '_blank';
    const url = this.getLoginUrl(institutionInfo);
    const options: InAppBrowserOptions = {
      usewkwebview: 'yes',
      toolbarposition: 'top',
      clearcache: 'yes',
      cleardata: 'yes',
      clearsessioncache: 'yes',
      closebuttoncaption: 'Back',
      location: 'no',
      hidenavigationbuttons: 'yes',
      toolbarcolor: '#ffffff',
    };

    this.browser = this.appBrowser.create(url, target, options);
    const browserEventSub = this.browser.on('loadstart').subscribe(event => {
      console.log('loadstart', event);
      if (event) {
        this.getAuthSessionFromUrl(event.url);
      }
    });
    this.subscriptions.add(browserEventSub);
    this.browser.show();
    this.loadingService.closeSpinner();
  }

  private getLoginUrl(institutionInfo: Institution) {
    return `${this.environmentFacadeService.getSitesURL()}/${institutionInfo.shortName}/full/login.php?mobileapp=1`;
  }

  private getAuthSessionFromUrl(urlString: string) {
    if (!urlString || !urlString.includes('mobileapp_login_validator.php')) return;

    try {
      this.sessionId = urlString.split('?')[1].split('=')[1];
    } catch (error){
      /// show error about no session
    }

      this.authFacadeService.cachedAuthSessionToken = this.sessionId;
      this.handlePostAuthentication();

  }

  private async handlePostAuthentication() {
    const loginState: LoginState = await this.sessionFacadeService.determinePostLoginState(
      this.sessionId,
      this.institutionId
    );
    switch (loginState) {
      case LoginState.PIN_SET:
        await this.identityFacadeService.pinOnlyLoginSetup();
        break;
      case LoginState.BIOMETRIC_SET:
        const supportedBiometricType = await this.identityFacadeService.getAvailableBiometricHardware();
        const biometricConfig = this.configureBiometricsConfig(supportedBiometricType);
        await this.router.navigate([PATRON_NAVIGATION.biometric], { state: { biometricConfig } });
        break;
      case LoginState.DONE:
        this.router.navigate([PATRON_NAVIGATION.dashboard], { replaceUrl: true });
        break;
    }
    this.browser.close();
  }

  private configureBiometricsConfig(supportedBiometricType: string[]): { type: string; name: string } {
    if (supportedBiometricType.includes('fingerprint')) {
      return { type: 'fingerprint', name: 'Fingerprint' };
    } else if (supportedBiometricType.includes('face')) {
      return { type: 'face', name: 'Face ID' };
    } else if (supportedBiometricType.includes('iris')) {
      return { type: 'iris', name: 'Iris' };
    }
  }

  private async getNativeHeaderBg(id): Promise<string> {
    const sessionId = await this.authFacadeService.getAuthSessionToken$().pipe(first()).toPromise();
    return this.settingsFacadeService
      .getSetting(Settings.Setting.MOBILE_HEADER_COLOR, sessionId, id)
      .pipe(
        map(({ value }) => {
          if (value === null) return;
          const siteColors = JSON.parse(value);
          const nativeHeaderBg = siteColors['native-header-bg'];
          return nativeHeaderBg ? '#' + nativeHeaderBg : '#166dff';
        }),
        take(1)
      )
      .toPromise();
  }

}
