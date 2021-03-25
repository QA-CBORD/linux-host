import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROLES, Settings } from 'src/app/app.global';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { tap, take, switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { LoginState } from '@core/facades/identity/identity.facade.service';
import { PreloginCsModel } from '../models/prelogin-content-strings.model';
import { MessageChannel } from '@shared/model/shared-api';
import { CommonService } from '@shared/services/common.service';

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
  selectedInstitution: { id: string; name: string };
  sessionId: string;

  constructor(
    private readonly nav: Router,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly loadingService: LoadingService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly commonService: CommonService,
    private readonly sanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    const { preLoginCs, backgroundColor, institutionInfo } = MessageChannel.get();
    this.pageContent = preLoginCs;
    this.selectedInstitution = institutionInfo;
    this.nativeHeaderBg$ = Promise.resolve(backgroundColor);
    this.getInstitutionInfo();
  }

  private async getInstitutionInfo(): Promise<void> {
    const { id: institutionId } = this.selectedInstitution;
    this.sessionId = await this.authFacadeService
      .getAuthSessionToken$()
      .pipe(take(1))
      .toPromise();
    this.institutionPhoto$ = this.commonService.getInstitutionPhoto(institutionId, this.sessionId, this.sanitizer);
    this.institutionName$ = Promise.resolve(this.selectedInstitution.name);
    this.commonService.getInstitutionName(institutionId, this.sessionId);
  }


  private async navigate(asGuest) {
    const { id: institutionId } = this.selectedInstitution;
    await this.loadingService.showSpinner();
    this.settingsFacadeService.cleanCache();

    await zip(
      this.settingsFacadeService.fetchSettingList(Settings.SettingList.FEATURES, this.sessionId, institutionId),
      this.settingsFacadeService.getSettings([Settings.Setting.FEEDBACK_EMAIL], this.sessionId, institutionId),
      this.settingsFacadeService.getSetting(Settings.Setting.PIN_ENABLED, this.sessionId, institutionId),
      this.institutionFacadeService.getInstitutionDataById$(institutionId, this.sessionId, true)
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

  private async navigateToLogin(asGuest: boolean, loginState: LoginState) {
    this.loadingService.closeSpinner();
    const loginType: LoginState = asGuest && LoginState.HOSTED || loginState;
    
    switch (loginType) {
      case LoginState.HOSTED:
        const institution = this.selectedInstitution;
        const institutionInfo = {
          backgroundColor: await this.nativeHeaderBg$,
          name: institution.name,
        };
        this.authFacadeService.setIsGuestUser(asGuest);
        MessageChannel.put({ institutionInfo, navParams: { asGuest } });
        this.nav.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.login]);
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
