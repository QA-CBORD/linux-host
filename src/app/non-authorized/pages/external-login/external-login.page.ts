import { Component, ElementRef, NgZone } from '@angular/core';
import { InAppBrowser, InAppBrowserObject, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { LoadingService } from '@core/service/loading/loading.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { first, map, take } from 'rxjs/operators';
import { Institution } from '@core/model/institution';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { Subscription } from 'rxjs';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { NavigationExtras, Router } from '@angular/router';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { IdentityFacadeService, LoginState } from '@core/facades/identity/identity.facade.service';
import { PATRON_NAVIGATION, ROLES, Settings } from '../../../app.global';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { StGlobalPopoverComponent } from '@shared/ui-components';
import { PopoverConfig } from '@core/model/popover/popover.model';
import { PopupTypes } from '@sections/rewards/rewards.config';
import { PopoverController } from '@ionic/angular';
import { BUTTON_TYPE, buttons } from '@core/utils/buttons.config';
import { ANONYMOUS_ROUTES } from '../../non-authorized.config';

@Component({
  selector: 'st-external-login',
  templateUrl: './external-login.page.html',
  styleUrls: ['./external-login.page.scss'],
})
export class ExternalLoginPage {
  private subscriptions: Subscription = new Subscription();

  nativeHeaderBg$: Promise<string>;

  private browser: InAppBrowserObject;
  private sessionId: string;
  private institutionId: string;

  constructor(
    private readonly appBrowser: InAppBrowser,
    private readonly loadingService: LoadingService,
    private readonly popoverCtrl: PopoverController,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly ngZone: NgZone,
    private readonly elementRef: ElementRef,
    private readonly router: Router
  ) {}

  ionViewDidEnter() {
    this.loadLoginContent();
  }

  /// clear the subscriptions and remove the page, we don't want to navigate back here
  ionViewDidLeave() {
    this.clearSubscriptions();
    this.elementRef.nativeElement.remove();
  }

  private clearSubscriptions() {
    if (this.subscriptions) this.subscriptions.unsubscribe();
    if (this.browser) this.browser.close();
  }

  loadLoginContent() {
    const instSub = this.institutionFacadeService.cachedInstitutionInfo$.pipe(first()).subscribe(
      institutionInfo => {
        this.institutionId = institutionInfo.id;
        this.nativeHeaderBg$ = this.getNativeHeaderBg(this.institutionId);
        this.initializeInAppBrowser(institutionInfo);
      },
      () => {
        this.showModal('Oops!', 'There was an issue loading the login page - please try again');
      },
      () => {
          // TODO: Properly handle exception
      }
    );
    this.subscriptions.add(instSub);
  }

  initializeInAppBrowser(institutionInfo: Institution) {
    this.loadingService.showSpinner();
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
      hidden: 'yes',
    };

    this.browser = this.appBrowser.create(url, target, options);

    const browserEventSub = this.browser.on('loadstart').subscribe(event => {
      if (event) {
        this.getAuthSessionFromUrl(event.url);
      }
    });

    const browserEventShow = this.browser.on('loadstop').subscribe(() => {
      this.browser.show();
    });

    const browserEventBack = this.browser.on('exit').subscribe(event => {
      if (event) {
        this.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.institutions]);
      }
    });

    this.subscriptions.add(browserEventSub);
    this.subscriptions.add(browserEventShow);
    this.subscriptions.add(browserEventBack);

    this.loadingService.closeSpinner();
  }

  private getLoginUrl(institutionInfo: Institution) {
    return `${this.environmentFacadeService.getSitesURL()}/${institutionInfo.shortName}/full/login.php?mobileapp=1`;
  }

  private getAuthSessionFromUrl(urlString: string) {
    if (!urlString || !urlString.includes('mobileapp_login_validator.php')) return;

    try {
      this.sessionId = urlString.split('?')[1].split('=')[1];
    } catch (error) {
      this.showModal('Oops!', 'There was an issue finding your session - please try again');
      return;
    }

    this.authFacadeService.cachedAuthSessionToken = this.sessionId;
    this.handlePostAuthentication();
  }

  private async handlePostAuthentication() {
    this.clearSubscriptions();
    const loginState: LoginState = await this.sessionFacadeService.determinePostLoginState(
      this.sessionId,
      this.institutionId
    );

    switch (loginState) {
      case LoginState.PIN_SET:
        await this.identityFacadeService.pinLoginSetup(false);
        break;
      case LoginState.BIOMETRIC_SET:
        // eslint-disable-next-line no-case-declarations
        const supportedBiometricType = await this.identityFacadeService.getAvailableBiometricHardware();
        // eslint-disable-next-line no-case-declarations
        const biometricConfig = this.configureBiometricsConfig(supportedBiometricType);
        this.navigate([PATRON_NAVIGATION.biometric], { state: { biometricConfig } });
        break;
      case LoginState.DONE:
        this.navigateToDashboard();
        break;
    }
  }

  private async navigateToDashboard() {
    await this.router.navigate([PATRON_NAVIGATION.dashboard], { replaceUrl: true });
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
    const sessionId = await this.authFacadeService
      .getAuthSessionToken$()
      .pipe(first())
      .toPromise();
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

  private async showModal(title: string, message: string): Promise<void> {
    this.clearSubscriptions();
    const popoverConfig: PopoverConfig<string> = {
      type: PopupTypes.RETRY,
      title,
      message,
      buttons: [{ ...buttons.RETRY, label: 'RETRY' }],
      closeBtn: true,
    };

    const modal = await this.popoverCtrl.create({
      cssClass: 'sc-popover',
      component: StGlobalPopoverComponent,
      componentProps: {
        data: popoverConfig,
      },
      animated: false,
      backdropDismiss: false,
    });

    modal.onDidDismiss().then(async data => {
      if (!data || !data.role) {
        this.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.entry]);
        return;
      }

      switch (data.role) {
        case BUTTON_TYPE.CLOSE:
          this.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.entry]);
          break;
        case BUTTON_TYPE.RETRY:
          this.loadLoginContent();
          break;
      }
    });
    await modal.present();
  }

  private navigate(route: string[], extras: Partial<NavigationExtras> = {}) {
    this.ngZone.run(() => {
      this.router.navigate(route, { ...extras, replaceUrl: true });
    });
  }
}
