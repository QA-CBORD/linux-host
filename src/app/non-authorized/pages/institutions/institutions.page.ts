import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { take, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ANONYMOUS_ROUTES } from '../../non-authorized.config';
import { ROLES, Settings } from 'src/app/app.global';
import { zip } from 'rxjs';
import { LoadingService } from '@core/service/loading/loading.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { Capacitor } from '@capacitor/core';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { LoginState } from '@core/facades/identity/identity.facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { RegistrationServiceFacade } from '../registration/services/registration-service-facade';
import { InstitutionLookupListItem } from '@core/model/institution';
import { CommonService } from '@shared/services/common.service';
import { MessageProxy } from '@shared/services/injectable-message.proxy';
import { PLATFORM } from '@shared/accessibility/services/accessibility.service';
import { Platform } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';
import { registerPlugin } from '@capacitor/core';
const  IOSDevice  = registerPlugin<any>('IOSDevice');

@Component({
  selector: 'st-institutions',
  templateUrl: './institutions.page.html',
  styleUrls: ['./institutions.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstitutionsPage implements OnInit {
  private sessionId: string = null;
  searchString: string = '';
  isLoading: boolean = true;
  institutions: InstitutionLookupListItem[];

  constructor(
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly loadingService: LoadingService,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly nav: Router,
    private readonly cdRef: ChangeDetectorRef,
    private readonly toastService: ToastService,
    private readonly route: Router,
    private readonly registrationServiceFacade: RegistrationServiceFacade,
    private readonly commonService: CommonService,
    private readonly messageProxy: MessageProxy,
    private readonly platform: Platform
  ) {}

  ngOnInit() {
    // Clearing any trace of previous selected institution.
    // We are preventing from any serviceURL to override the actual environment.
    this.institutionFacadeService.clearCurrentInstitution();
    this.getInstitutions();
    this.setNativeEnvironment();
  }

  ionViewWillEnter() {
    this.institutionFacadeService.clearCurrentInstitution();
  }

  onEnterKeyClicked() {
    Keyboard.hide();
  }

  onSearchedValue({ target: { value } }: any) {
    this.searchString = value;
  }

  async getInstitutions() {
    this.authFacadeService
      .getAuthSessionToken$()
      .pipe(
        tap(sessionId => (this.sessionId = sessionId)),
        switchMap(sessionId => this.institutionFacadeService.retrieveLookupList$(sessionId)),
        take(1)
      )
      .subscribe(
        institutions => {
          this.institutions = institutions;
          this.isLoading = false;
          this.cdRef.markForCheck();
        },
        () => {
          this.isLoading = false;
          this.onErrorRetrieve('Something went wrong, please try again...');
        }
      );
  }

  async onInstitutionSelected(institution: InstitutionLookupListItem): Promise<void> {
    this.loadingService.showSpinner({ duration: 5000 });
    this.settingsFacadeService.cleanCache();
    await this.commonService.getInstitution(institution.id, false);
    this.commonService.getInstitutionPhoto(false, null);
    await this.commonService.getInstitutionBgColor(false);
    const shouldGo2Prelogin = institution.guestSettings.canLogin;
    (shouldGo2Prelogin && this.navigate2PreLogin(institution)) || this.navigate2Login(institution);
  }

  private async navigate2Login({ id: institutionId }) {
    this.institutionFacadeService.removeGuestSetting();
    this.authFacadeService.setIsGuestUser(false);
    await zip(
      this.settingsFacadeService.fetchSettingList(Settings.SettingList.FEATURES, this.sessionId, institutionId),
      this.settingsFacadeService.getSettings([Settings.Setting.FEEDBACK_EMAIL], this.sessionId, institutionId),
      this.settingsFacadeService.getSetting(Settings.Setting.PIN_ENABLED, this.sessionId, institutionId)
    )
      .pipe(
        switchMap(() => this.sessionFacadeService.determineInstitutionSelectionLoginState()),
        tap(loginType => {
          this.navigate(loginType);
        }),
        take(1)
      )
      .toPromise();
  }

  private async navigate2PreLogin(institution: InstitutionLookupListItem): Promise<void> {
    this.institutionFacadeService.saveGuestSetting(institution.guestSettings);
    const preLoginCs = await this.registrationServiceFacade.preloginContents(institution.acuteCare).toPromise();
    this.loadingService.closeSpinner();
    this.messageProxy.put(preLoginCs);
    this.nav.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.pre_login]);
  }

  private async navigate(loginState: number) {
    this.loadingService.closeSpinner();
    switch (loginState) {
      case LoginState.HOSTED:
        this.messageProxy.put({ navParams: { isGuestUser: false } });
        this.nav.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.login]);
        break;
      case LoginState.EXTERNAL:
        this.nav.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.external]);
        break;
    }
  }

  private async onErrorRetrieve(message: string) {
    await this.toastService.showToast({
      message,
      toastButtons: [
        {
          text: 'Retry',
          handler: () => {
            this.getInstitutions();
          },
        },
        {
          text: 'Back',
          handler: () => {
            this.route.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.entry]);
          },
        },
      ],
    });
  }

  async setNativeEnvironment() {
    if (Capacitor.getPlatform() === PLATFORM.ios && this.platform.is('cordova')) {
      await IOSDevice.setEnvironment({ env: this.environmentFacadeService.getEnvironmentObject() });
    }
  }
}
