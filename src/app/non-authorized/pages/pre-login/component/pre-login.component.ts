import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROLES, Settings } from 'src/app/app.global';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { tap, switchMap, map } from 'rxjs/operators';
import { from, zip } from 'rxjs';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { LoginState } from '@core/facades/identity/identity.facade.service';
import { PreloginCsModel } from '../models/prelogin-content-strings.model';
import { CommonService } from '@shared/services/common.service';
import { Institution } from '@core/model/institution';
import { MessageProxy } from '@shared/services/injectable-message.proxy';

@Component({
  selector: 'st-pre-login',
  templateUrl: './pre-login.component.html',
  styleUrls: ['./pre-login.component.scss'],
})
export class PreLoginComponent implements OnInit {
  institutionPhoto$: Promise<SafeResourceUrl>;
  institutionName$: Promise<string>;
  nativeHeaderBg$: Promise<string>;
  pageContent: PreloginCsModel = {} as any;
  selectedInstitution: Institution;
  sessionId: string;

  constructor(
    private readonly nav: Router,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly loadingService: LoadingService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly commonService: CommonService,
    private readonly sanitizer: DomSanitizer,
    private readonly messageProxy: MessageProxy
  ) {}
  async ngOnInit() {
    const preLoginCs = this.messageProxy.get<PreloginCsModel>() || {} as any;
    this.pageContent = preLoginCs;
    this.getInstitutionInfo();
  }

  private async getInstitutionInfo(): Promise<void> {
    this.selectedInstitution = await this.commonService.getInstitution();
    this.nativeHeaderBg$ = this.commonService.getInstitutionBgColor();
    this.sessionId = await this.commonService.sessionId();
    this.institutionName$ = this.commonService.getInstitutionName();
    this.institutionPhoto$ = this.commonService.getInstitutionPhoto(true, this.sanitizer);
  }

  private async navigate(asGuest) {
    const { id: institutionId } = this.selectedInstitution;
    await this.loadingService.showSpinner();
    await zip(
      this.settingsFacadeService.fetchSettingList(Settings.SettingList.FEATURES, this.sessionId, institutionId),
      this.settingsFacadeService.getSettings([Settings.Setting.FEEDBACK_EMAIL], this.sessionId, institutionId),
      this.settingsFacadeService.getSetting(Settings.Setting.PIN_ENABLED, this.sessionId, institutionId)
    )
      .pipe(
        switchMap(() => this.sessionFacadeService.determineInstitutionSelectionLoginState()),
        tap(loginState => {
          this.loadingService.closeSpinner();
          this.navigateToLogin(asGuest, loginState);
        })
      )
      .toPromise();
  }

  public get defaultBackUrl() {
    return [ROLES.anonymous, ANONYMOUS_ROUTES.entry];
  }

  private async updateGuestSettings(): Promise<void> {
    const institutionId = this.selectedInstitution.id;
    const getGuestSettingObs = this.institutionFacadeService.guestSettings;
    const merchantEnabledObs = this.settingsFacadeService.getSetting(
      Settings.Setting.PLACES_ENABLED,
      this.sessionId,
      institutionId
    );
    const newGuestSetting = await zip(from(getGuestSettingObs), merchantEnabledObs)
      .pipe(
        map(([guestSettings, { value }]) => {
          guestSettings.canExplore = Boolean(Number(value));
          return guestSettings;
        })
      )
      .toPromise();
    this.institutionFacadeService.saveGuestSetting(newGuestSetting);
  }

  private async navigateToLogin(isGuestUser: boolean, loginState: LoginState) {
    this.loadingService.closeSpinner();
    const loginType: LoginState = (isGuestUser && LoginState.HOSTED) || loginState;

    switch (loginType) {
      case LoginState.HOSTED:
        this.authFacadeService.setIsGuestUser(isGuestUser);
        this.messageProxy.put({ navParams: { isGuestUser } });
        this.nav.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.login]);
        this.updateGuestSettings();
        break;
      case LoginState.EXTERNAL:
        this.nav.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.external]);
        break;
    }
  }

  async continueAsNonGuest(): Promise<void> {
    this.loadingService.showSpinner();
    this.navigate(false);
  }

  async continueAsGuest(): Promise<void> {
    this.loadingService.showSpinner();
    this.navigate(true);
  }
}
