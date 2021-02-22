import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginState } from '@core/facades/identity/identity.facade.service';
import { ROLES, Settings } from 'src/app/app.global';
import { GUEST_ROUTES } from 'src/app/non-authorized/non-authorized.config';
import { PreLoginStringModel } from '../../registration/models/registration.shared.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { InstitutionPhotoInfo } from '@core/model/institution';
import { tap, map, take, skipWhile } from 'rxjs/operators';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { LoadingService } from '@core/service/loading/loading.service';

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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly nav: Router,
    private readonly sanitizer: DomSanitizer,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly loadingService: LoadingService,
    private readonly settingsFacadeService: SettingsFacadeService
  ) {}
  ngOnInit() {
    this.getInstitutionInfo();
    this.pageContent = this.route.snapshot.data.data;
  }

  private async getInstitutionInfo(): Promise<void> {
    const { id } = await this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1)).toPromise();
    const sessionId = await this.authFacadeService
      .getAuthSessionToken$()
      .pipe(take(1))
      .toPromise();
    this.institutionPhoto$ = this.getInstitutionPhoto(id, sessionId);
    this.institutionName$ = this.getInstitutionName(id, sessionId);
    this.nativeHeaderBg$ = this.getNativeHeaderBg(id, sessionId);
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

  private navigateToLogin(asGuest) {
    this.nav.navigate([ROLES.guest, GUEST_ROUTES.login], { state: { navParams: { asGuest } } });
  }

  async continueAsNonGuest(): Promise<void> {
    await this.loadingService.showSpinner();
    this.navigateToLogin(false);
    this.loadingService.closeSpinner();
  }

  async continueAsGuest(): Promise<void> {
    await this.loadingService.showSpinner();
    this.navigateToLogin(true);
    this.loadingService.closeSpinner();
  }
}
