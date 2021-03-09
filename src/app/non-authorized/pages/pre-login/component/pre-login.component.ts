import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROLES, Settings } from 'src/app/app.global';
import { GUEST_ROUTES } from 'src/app/non-authorized/non-authorized.config';
import { PreLoginStringModel } from '../../registration/models/registration-utils';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { InstitutionLookupListItem, InstitutionPhotoInfo } from '@core/model/institution';
import { tap, map, take, skipWhile, switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { LoginState } from '@core/facades/identity/identity.facade.service';

@Component({
  selector: 'st-pre-login',
  templateUrl: './pre-login.component.html',
  styleUrls: ['./pre-login.component.scss'],
})
export class PreLoginComponent implements OnInit {
  institutionPhoto$: Promise<SafeResourceUrl>;
  institutionName$: Promise<string>;
  nativeHeaderBg$: Promise<string>;
  pageContent: PreLoginStringModel = {} as any;
  selectedInstitution: { id: string; name: string };
  sessionId: any;

  constructor(
    private readonly nav: Router,
    private readonly sanitizer: DomSanitizer,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly loadingService: LoadingService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly sessionFacadeService: SessionFacadeService
  ) {}
  ngOnInit() {
    const { contentStrings, backgroundColor, institutionInfo } = history.state;
    this.pageContent = contentStrings;
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
    const data = await this.getInstitutionPhoto(institutionId, this.sessionId);
    this.institutionPhoto$ = Promise.resolve(data);
    this.institutionName$ = Promise.resolve(this.selectedInstitution.name);
    this.getInstitutionName(institutionId, this.sessionId);
  }

  private async getInstitutionName(id, sessionId): Promise<string> {
    return this.institutionFacadeService
      .getInstitutionDataById$(id, sessionId, false)
      .pipe(
        map(({ name }) => `${name}`),
        take(1)
      )
      .toPromise();
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
    return [ROLES.guest, GUEST_ROUTES.entry];
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
        this.authFacadeService.cachedLoginType = asGuest;
        const navParams = { asGuest };
        this.nav.navigate([ROLES.guest, GUEST_ROUTES.login], { state: { institutionInfo, navParams } });
        break;
      case LoginState.EXTERNAL:
        this.nav.navigate([ROLES.guest, GUEST_ROUTES.external]);
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
