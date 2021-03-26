import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { take, switchMap, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ANONYMOUS_ROUTES } from '../../non-authorized.config';
import { ROLES, Settings } from 'src/app/app.global';
import { zip } from 'rxjs';
import { LoadingService } from '@core/service/loading/loading.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { Plugins, Capacitor } from '@capacitor/core';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { LoginState } from '@core/facades/identity/identity.facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { RegistrationServiceFacade } from '../registration/services/registration-service-facade';
import { InstitutionLookupListItem } from '@core/model/institution';
import { MessageChannel } from '@shared/model/shared-api';
import { CommonService } from '@shared/services/common.service';
import { DomSanitizer } from '@angular/platform-browser';
const { Keyboard, IOSDevice } = Plugins;

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
    private readonly commonService: CommonService
  ) {}

  async ngOnInit() {
    this.getInstitutions();
    this.setNativeEnvironment();
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
    const preloginSupported = this.registrationServiceFacade.guestLoginSupportedInEnv;
    const canGo2Prelogin = institution.guestSettings.canLogin && preloginSupported;
    if (canGo2Prelogin) {
      const backgroundColor = await this.commonService.getNativeHeaderBg(institution.id, this.sessionId);
      this.authFacadeService.saveGuestSetting(institution.guestSettings);
      this.navigateToPreLogin(institution, backgroundColor);
    } else {
      this.authFacadeService.removeGuestSetting();
      this.authFacadeService.setIsGuestUser(false);
      this.navigate(institution);
    }
  }

  private async navigate(institution) {
    const { id: institutionId } = institution;
    this.settingsFacadeService.cleanCache();

    await zip(
      this.settingsFacadeService.fetchSettingList(Settings.SettingList.FEATURES, this.sessionId, institutionId),
      this.settingsFacadeService.getSettings(
        [Settings.Setting.MOBILE_HEADER_COLOR, Settings.Setting.FEEDBACK_EMAIL],
        this.sessionId,
        institutionId
      ),
      this.settingsFacadeService.getSetting(Settings.Setting.PIN_ENABLED, this.sessionId, institutionId),
      this.institutionFacadeService.getInstitutionDataById$(institutionId, this.sessionId, true)
    )
      .pipe(
        switchMap(() => this.sessionFacadeService.determineInstitutionSelectionLoginState()),
        tap(loginType => {
          this.navigateToLogin(loginType, institution);
        }),
        take(1)
      )
      .toPromise();
  }

  private async navigateToPreLogin(institution: InstitutionLookupListItem, backgroundColor): Promise<void> {
    await this.institutionFacadeService
      .getInstitutionDataById$(institution.id, this.sessionId, true)
      .pipe(take(1))
      .toPromise();
    const preLoginCs = await this.registrationServiceFacade.preloginContents(institution.acuteCare).toPromise();
    const institutionInfo = {
      id: institution.id,
      name: institution.name,
    };
    this.loadingService.closeSpinner();

    MessageChannel.put({ backgroundColor, preLoginCs, institutionInfo });

    this.nav.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.pre_login]);
  }

  private async navigateToLogin(loginState: number, institution) {
    const backgroundColor = await this.commonService.getNativeHeaderBg(institution.id, this.sessionId);
    this.loadingService.closeSpinner();
    switch (loginState) {
      case LoginState.HOSTED:
        const institutionInfo = {
          backgroundColor,
          name: institution.name,
        };
        MessageChannel.put({ institutionInfo });
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
    if (Capacitor.platform === 'ios') {
      await IOSDevice.setEnvironment({ env: this.environmentFacadeService.getEnvironmentObject() });
    }
  }
}
