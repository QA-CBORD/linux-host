import { Settings, PATRON_NAVIGATION, ROLES, GUEST_NAVIGATION } from './../../../app.global';
import { map, take } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { Router } from '@angular/router';
import { Institution } from '@core/model/institution';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { LoadingService } from '@core/service/loading/loading.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Device } from '@capacitor/device';
import { IdentityFacadeService, LoginState } from '@core/facades/identity/identity.facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { AUTHENTICATION_SYSTEM_TYPE, ANONYMOUS_ROUTES } from '../../non-authorized.config';
import { environmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { Observable, of, Subscription } from 'rxjs';
import { configureBiometricsConfig } from '@core/utils/general-helpers';
import { ToastService } from '@core/service/toast/toast.service';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { RegistrationServiceFacade } from '../registration/services/registration-service-facade';
import { RegistrationComponent } from '../registration/components/registration/registration.component';
import { ModalController, Platform } from '@ionic/angular';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { MessageProxy } from '@shared/services/injectable-message.proxy';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

@Component({
  selector: 'user-pass-form',
  templateUrl: './user-pass-form.page.html',
  styleUrls: ['./user-pass-form.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPassForm implements OnInit {
  institutionName$: Promise<string>;
  institutionPhoto$: Promise<SafeResourceUrl>;
  nativeHeaderBg$: Promise<string>;
  placeholderOfUsername$: Promise<string>;
  loginInstructions$: Promise<string>;
  authTypeHosted$: Observable<boolean>;
  authTypeLDAP$: Observable<boolean>;
  private institutionInfo: Institution;
  loginForm: FormGroup;
  signupEnabled$: Observable<boolean>;
  navedAsGuest$: Observable<boolean>;
  subscription: Subscription;

  constructor(
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly loadingService: LoadingService,
    private readonly router: Router,
    private readonly toastService: ToastService,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly fb: FormBuilder,
    private readonly cdRef: ChangeDetectorRef,
    private readonly modalCtrl: ModalController,
    private readonly registrationFacade: RegistrationServiceFacade,
    private readonly appBrowser: InAppBrowser,
    private readonly environmentFacadeService: environmentFacadeService,
    private readonly accessibilityService: AccessibilityService,
    private readonly commonService: CommonService,
    private readonly sanitizer: DomSanitizer,
    private readonly messageProxy: MessageProxy,
    private readonly globalNav: GlobalNavService,
    private readonly plt: Platform
  ) { }

  get username(): AbstractControl {
    return this.loginForm.get(this.controlsNames.username);
  }

  get password(): AbstractControl {
    return this.loginForm.get(this.controlsNames.password);
  }

  get controlsNames() {
    return USERFORM_CONTROL_NAMES;
  }

  ngOnInit() {
    this.initForm();
    this.asyncOnInit();
    this.onUserPassPaused();
  }

  ionViewWillLeave() {
    this.resetForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ionViewDidEnter() {
    this.loadingService.closeSpinner();
  }

  async asyncOnInit(): Promise<void> {
    await this.setLocalInstitutionInfo();
    // Announcing navigation meanwhile we find a generic way to do so.
    this.accessibilityService.readAloud(`Login page for ${this.institutionInfo.name}`);
    const { id } = this.institutionInfo;
    const sessionId = await this.commonService.sessionId();
    this.authTypeHosted$ = this.getAuthenticationTypeHosted$(id, sessionId);
    this.authTypeLDAP$ = this.getAuthenticationTypeLDAP$(id, sessionId);
    this.placeholderOfUsername$ = this.getContentStringByName(sessionId, 'email_username');
    this.loginInstructions$ = this.getContentStringByName(sessionId, 'instructions');
    this.signupEnabled$ = this.isSignupEnabled$();
    const data = this.messageProxy.get<any>() || {};
    this.navedAsGuest$ = of(data.navParams && data.navParams.isGuestUser);
    this.cdRef.detectChanges();
    this.initializeInstitutionInfo();
  }

  async initializeInstitutionInfo(): Promise<void> {
    this.institutionPhoto$ = this.commonService.getInstitutionPhoto(true, this.sanitizer);
    this.nativeHeaderBg$ = this.commonService.getInstitutionBgColor();
    this.institutionName$ = this.commonService.getInstitutionName();
    this.cdRef.detectChanges();
  }

  redirectToWebPage(url) {
    const link = `${this.environmentFacadeService.getSitesURL()}/${this.institutionInfo.shortName}/full/${url}`;
    this.appBrowser.create(link, '_system');
  }

  async doHostedSignup({ isGuestUser }): Promise<void> {
    this.loadingService.showSpinner();
    await this.registrationFacade.registrationConfig(isGuestUser);
    const modal = await this.modalCtrl.create({
      mode: 'ios',
      backdropDismiss: false,
      component: RegistrationComponent,
    });
    await modal.present();
    this.loadingService.closeSpinner();
    await modal.onDidDismiss();
  }

  onSignup(): void {
    const { navParams } = this.messageProxy.get();
    if (navParams) {
      this.doHostedSignup(navParams);
    } else {
      this.redirectToSignup();
    }
  }

  async redirectToSignup(): Promise<void> {
    const { shortName } = await this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1)).toPromise();
    const url = `${this.environmentFacadeService.getSitesURL()}/${shortName}/full/register.php`;
    this.appBrowser.create(url, '_system');
  }

  async redirectToForgotPassword(): Promise<void> {
    this.loadingService.showSpinner();
    const forgotPasswordCs = await this.contentStringsFacadeService
      .fetchContentStringModel(ContentStringCategory.forgotPassword)
      .toPromise();
    this.messageProxy.put(forgotPasswordCs);
    this.loadingService.closeSpinner();
    this.router.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.forgotPassword]);
  }

  isSignupEnabled$(): Observable<boolean> {
    return this.settingsFacadeService.getSetting(Settings.Setting.STANDARD_REGISTRATION_LINK).pipe(
      map(({ value }) => Boolean(Number(value))),
      take(1)
    );
  }

  async authenticateUser(form) {
    if (form.invalid) {
      this.presentToast('Login failed, invalid user name and/or password');
      return;
    }
    const { username, password } = form.value;
    const { id } = this.institutionInfo;
    let sessionId: string;
    await this.loadingService.showSpinner();
    try {
      sessionId = await this.authenticateUsernamePassword(username, password, id);
    } catch (e) {
      this.presentToast('Login failed, invalid user name and/or password');
      await this.loadingService.closeSpinner();
      return;
    }
    const loginState: LoginState = await this.sessionFacadeService.determinePostLoginState(sessionId, id);

    await this.loadingService.closeSpinner();
    switch (loginState) {
      case LoginState.PIN_SET:
        try {
          await this.identityFacadeService.pinLoginSetup(false);
        } catch (e) {
          this.presentToast('Login failed, invalid user name and/or password');
        }
        break;
      case LoginState.BIOMETRIC_SET:
        // eslint-disable-next-line no-case-declarations
        const supportedBiometricType = await this.identityFacadeService.getAvailableBiometricHardware();
        // eslint-disable-next-line no-case-declarations
        const biometricConfig = configureBiometricsConfig(supportedBiometricType);
        await this.router.navigate([PATRON_NAVIGATION.biometric], { state: { biometricConfig } });
        break;
      case LoginState.DONE:
        this.navigate2Dashboard();
        break;
    }
  }

  private async navigate2Dashboard(): Promise<void> {
    const isGuest = await this.authFacadeService.isGuestUser().toPromise();
    (isGuest && this.router.navigate([GUEST_NAVIGATION.dashboard], { replaceUrl: true })) ||
      this.router.navigate([PATRON_NAVIGATION.dashboard], { replaceUrl: true });
  }

  private initForm() {
    this.loginForm = this.fb.group({
      [this.controlsNames.username]: ['', Validators.required],
      [this.controlsNames.password]: ['', Validators.required],
    });
  }

  private async authenticateUsernamePassword(username, password, id): Promise<string> {
    return this.authFacadeService
      .authenticateUser$({
        userName: username,
        password,
        domain: null,
        institutionId: id,
      })
      .pipe(take(1))
      .toPromise();
  }

  private async isPinEnabled(id, sessionId: string): Promise<boolean> {
    return this.settingsFacadeService
      .getSetting(Settings.Setting.PIN_ENABLED, sessionId, id)
      .pipe(
        map(({ value }) => parseInt(value) === 1),
        take(1)
      )
      .toPromise();
  }

  private getAuthenticationTypeHosted$(institutionId: string, sessionId: string): Observable<boolean> {
    return this.institutionFacadeService.getInstitutionInfo$(institutionId, sessionId, true).pipe(
      map(({ authenticationSystemType }) => authenticationSystemType === AUTHENTICATION_SYSTEM_TYPE.HOSTED),
      take(1)
    );
  }

  private getAuthenticationTypeLDAP$(institutionId: string, sessionId: string): Observable<boolean> {
    return this.institutionFacadeService.getInstitutionInfo$(institutionId, sessionId, true).pipe(
      map(({ authenticationSystemType }) => authenticationSystemType === AUTHENTICATION_SYSTEM_TYPE.LDAP),
      take(1)
    );
  }

  private async getContentStringByName(sessionId, name): Promise<string> {
    return this.contentStringsFacadeService
      .fetchContentString$(
        CONTENT_STRINGS_DOMAINS.get_web_gui,
        CONTENT_STRINGS_CATEGORIES.login_screen,
        name,
        null,
        sessionId,
        false
      )
      .pipe(
        map(({ value }) => value),
        take(1)
      )
      .toPromise();
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

  private async setLocalInstitutionInfo(): Promise<any> {
    this.institutionInfo = await this.commonService.getInstitution();
  }

  private async presentToast(message: string): Promise<void> {
    await this.toastService.showToast({ message });
  }

  // TODO: Erase
  private async getIsWeb(): Promise<boolean> {
    const { operatingSystem } = await Device.getInfo();
    return !(operatingSystem === 'ios' || operatingSystem === 'android');
  }

  public get defaultBackUrl() {
    return [ROLES.anonymous, ANONYMOUS_ROUTES.entry];
  }

  private resetForm() {
    if (this.loginForm.touched) {
      this.loginForm.reset();
    }
  }

  private onUserPassPaused() {
    this.subscription = this.plt.pause.subscribe(() => {
      this.resetForm();
    });
  }
}

export enum USERFORM_CONTROL_NAMES {
  username = 'username',
  password = 'password',
}
