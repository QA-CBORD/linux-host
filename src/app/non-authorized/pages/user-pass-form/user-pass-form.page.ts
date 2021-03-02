import { Settings, PATRON_NAVIGATION, ROLES } from './../../../app.global';
import { map, skipWhile, tap, take } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { Router } from '@angular/router';
import { InstitutionPhotoInfo, Institution } from '@core/model/institution';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { LoadingService } from '@core/service/loading/loading.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Device } from '@capacitor/core';
import { IdentityFacadeService, LoginState } from '@core/facades/identity/identity.facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { AUTHENTICATION_SYSTEM_TYPE, GUEST_ROUTES } from '../../non-authorized.config';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';
import { Observable } from 'rxjs';
import { configureBiometricsConfig } from '@core/utils/general-helpers';
import { ToastService } from '@core/service/toast/toast.service';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { RegistrationServiceFacade } from '../registration/services/registration-service-facade';
import { RegistrationComponent } from '../registration/components/registration/registration.component';
import { ModalController } from '@ionic/angular';

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

  constructor(
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly loadingService: LoadingService,
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer,
    private readonly toastService: ToastService,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly nativeStartupFacadeService: NativeStartupFacadeService,
    private readonly fb: FormBuilder,
    private readonly cdRef: ChangeDetectorRef,
    private readonly modalCtrl: ModalController,
    private readonly registrationFacade: RegistrationServiceFacade,
    private readonly appBrowser: InAppBrowser,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly accessibilityService: AccessibilityService
  ) {}

  get username(): AbstractControl {
    return this.loginForm.get(this.controlsNames.username);
  }

  get password(): AbstractControl {
    return this.loginForm.get(this.controlsNames.password);
  }

  get controlsNames() {
    return USERFORM_CONTROL_NAMES;
  }

  async ngOnInit() {
    this.initForm();
    await this.setLocalInstitutionInfo();
    // Announcing navigation meanwhile we find a generic way to do so.
    this.accessibilityService.readAloud(`Login page for ${this.institutionInfo.name}`);
    const { id } = this.institutionInfo;
    const sessionId = await this.authFacadeService
      .getAuthSessionToken$()
      .pipe(take(1))
      .toPromise();
    this.authTypeHosted$ = this.getAuthenticationTypeHosted$(id, sessionId);
    this.authTypeLDAP$ = this.getAuthenticationTypeLDAP$(id, sessionId);
    this.placeholderOfUsername$ = this.getContentStringByName(sessionId, 'email_username');
    this.loginInstructions$ = this.getContentStringByName(sessionId, 'instructions');
    this.initializeInstitutionInfo(id, sessionId);
    this.signupEnabled$ = this.isSignupEnabled$();
    this.cdRef.detectChanges();
  }

  initializeInstitutionInfo(id, sessionId): void {
    this.institutionPhoto$ = this.getInstitutionPhoto(id, sessionId);
    const { institutionInfo } = history.state;
    if (institutionInfo) {
      this.nativeHeaderBg$ = Promise.resolve(institutionInfo.backgroundColor);
      this.institutionName$ = Promise.resolve(institutionInfo.name);
    } else {
      this.institutionName$ = this.getInstitutionName(id, sessionId);
      this.nativeHeaderBg$ = this.getNativeHeaderBg(id, sessionId);
    }
  }

  redirectToWebPage(url) {
    const link = `${this.environmentFacadeService.getSitesURL()}/${this.institutionInfo.shortName}/full/${url}`;
    this.appBrowser.create(link, '_system');
  }

  async doHostedSignup({ asGuest: isGuestRegistration }): Promise<void> {
    this.loadingService.showSpinner();
    await this.registrationFacade.registrationConfig(isGuestRegistration);
    const modal = await this.modalCtrl.create({
      backdropDismiss: false,
      component: RegistrationComponent,
    });
    await modal.present();
    this.loadingService.closeSpinner();
    await modal.onDidDismiss();
  }

  onSignup(): void {
    const { navParams } = history.state;
    if (navParams && this.registrationFacade.guestLoginSupportedInEnv) {
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
    const { shortName } = await this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1)).toPromise();
    const url = `${this.environmentFacadeService.getSitesURL()}/${shortName}/full/login.php?password=forgot`;
    this.appBrowser.create(url, '_system');
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
      this.loadingService.closeSpinner();
      return;
    }
    const loginState: LoginState = await this.sessionFacadeService.determinePostLoginState(sessionId, id);

    this.loadingService.closeSpinner();

    switch (loginState) {
      case LoginState.PIN_SET:
        try {
          await this.identityFacadeService.pinLoginSetup(false);
        } catch (e) {
          this.presentToast('Login failed, invalid user name and/or password');
        }
        break;
      case LoginState.BIOMETRIC_SET:
        const supportedBiometricType = await this.identityFacadeService.getAvailableBiometricHardware();
        const biometricConfig = configureBiometricsConfig(supportedBiometricType);
        await this.router.navigate([PATRON_NAVIGATION.biometric], { state: { biometricConfig } });
        break;
      case LoginState.DONE:
        this.nativeStartupFacadeService.checkForStartupMessage = true;
        this.router.navigate([PATRON_NAVIGATION.dashboard], { replaceUrl: true });
        break;
    }
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

  private async getNativeHeaderBg(id, sessionId): Promise<string> {
    return this.settingsFacadeService
      .fetchSetting(Settings.Setting.MOBILE_HEADER_COLOR, sessionId, id)
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

  private async setLocalInstitutionInfo(): Promise<any> {
    return this.institutionFacadeService.cachedInstitutionInfo$
      .pipe(
        tap(institutionInfo => (this.institutionInfo = institutionInfo)),
        take(1)
      )
      .toPromise();
  }

  private async getInstitutionName(id, sessionId): Promise<string> {
    return this.institutionFacadeService
      .getInstitutionDataById$(id, sessionId, false)
      .pipe(
        tap(institutionInfo => (this.institutionInfo = institutionInfo)),
        map(({ name }) => `${name}`),
        take(1)
      )
      .toPromise();
  }

  private async getInstitutionPhoto(id, sessionId): Promise<SafeResourceUrl> {
    return this.institutionFacadeService
      .getInstitutionPhotoById$(id, sessionId, false)
      .pipe(
        skipWhile(d => !d || d === null),
        map((res: InstitutionPhotoInfo) => {
          const { data, mimeType } = res;
          return `data:${mimeType};base64,${data}`;
        }),
        map(response => this.sanitizer.bypassSecurityTrustResourceUrl(response)),
        tap(() => this.cdRef.markForCheck()),
        take(1)
      )
      .toPromise();
  }

  private async presentToast(message: string): Promise<void> {
    await this.toastService.showToast({ message });
  }

  private async getIsWeb(): Promise<boolean> {
    const { operatingSystem } = await Device.getInfo();
    return !(operatingSystem === 'ios' || operatingSystem === 'android');
  }

  public get defaultBackUrl() {
    return [ROLES.guest, GUEST_ROUTES.entry];
  }
}

export enum USERFORM_CONTROL_NAMES {
  username = 'username',
  password = 'password',
}
