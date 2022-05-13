import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ContentStringRequest } from '@core/model/content/content-string-request.model';
import { Institution, InstitutionPhotoInfo } from '@core/model/institution';
import { UserInfo } from '@core/model/user';
import { getUserFullName } from '@core/utils/general-helpers';
import { ContentStringModel } from '@shared/model/content-strings/content-string-models';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { iif, Observable } from 'rxjs';
import { skipWhile, map, take, tap } from 'rxjs/operators';
import { Settings } from 'src/app/app.global';
import { MessageProxy } from './injectable-message.proxy';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly userFacadeService: UserFacadeService,
    private readonly contentStringFacadeService: ContentStringsFacadeService,
    private readonly messageProxy: MessageProxy
  ) {}

  async getInstitutionPhoto(useCache = true, sanitizer: DomSanitizer = null): Promise<SafeResourceUrl> {
    const sessId = await this.sessionId();
    const instId = await this.institionId();
    const cachedPhoto$ = this.institutionFacadeService.getInstitutionPhoto$(instId, sessId, true);
    const fetchPhoto$ = this.institutionFacadeService.getInstitutionPhotoById$(instId, sessId, true);

    return iif(() => useCache, cachedPhoto$, fetchPhoto$)
      .pipe(
        skipWhile(d => !d || d === null),
        map((res: InstitutionPhotoInfo) => {
          const { data, mimeType } = res;
          return `data:${mimeType};base64,${data}`;
        }),
        map(response => (sanitizer && sanitizer.bypassSecurityTrustResourceUrl(response)) || response),
        take(1)
      )
      .toPromise();
  }

  async getUserName(): Promise<string> {
    return this.userFacadeService
      .getUserData$()
      .pipe(map((userInfo: UserInfo) => getUserFullName(userInfo)))
      .toPromise();
  }

  async getUserPhoto(): Promise<string> {
    return this.userFacadeService
      .getAcceptedPhoto$()
      .pipe(
        map(photoInfo => {
          if (photoInfo) {
            return `data:${photoInfo.mimeType};base64,${photoInfo.data}`;
          }
          return null;
        }),
        take(1)
      )
      .toPromise();
  }

  async getInstitutionBackgroundImage(): Promise<string> {
    return Promise.resolve('/assets/images/card_background_illustration.svg');
  }

  private async institionId(): Promise<string> {
    return this.institutionFacadeService.cachedInstitutionInfo$
      .pipe(
        map(({ id }) => id),
        take(1)
      )
      .toPromise();
  }

  async sessionId(): Promise<string> {
    return await this.authFacadeService
      .getAuthSessionToken$()
      .pipe(take(1))
      .toPromise();
  }

  getString<T extends ContentStringModel>(category: ContentStringCategory): T {
    const data = this.messageProxy.get<any>();
    return (data && <T>data[category]) || ({} as any);
  }

  loadContentString<T extends ContentStringModel>(
    category: ContentStringCategory,
    args: { data?: any; requests?: ContentStringRequest[], save?:boolean } = {},
    save = false
  ): Observable<T> {
    return this.contentStringFacadeService.fetchContentStringModel<T>(category, args).pipe(
      take(1),
      tap(data => this.messageProxy.put({ [category]: data }))
    );
  }

  async getInstitutionName(): Promise<string> {
    return this.getInstitution(null, true).then(({ name }) => name);
  }

  async getInstitution(instId = null, useCache = true): Promise<Institution> {
    const sessId = await this.sessionId();
    const id = instId || (await this.institionId());
    const cachedInstitution$ = this.institutionFacadeService.getInstitutionInfo$(id, sessId, true);
    const fetchInstitution$ = this.institutionFacadeService.getInstitutionDataById$(id, sessId, true);
    return iif(() => useCache, cachedInstitution$, fetchInstitution$)
      .pipe(take(1))
      .toPromise();
  }

  async getInstitutionBgColor(useCache = true): Promise<string> {
    const sessId = await this.sessionId();
    const instId = await this.institionId();
    const cachedBgColor$ = this.settingsFacadeService.getSetting(Settings.Setting.MOBILE_HEADER_COLOR, sessId, instId);
    const fetchBgColor$ = this.settingsFacadeService.fetchSetting(Settings.Setting.MOBILE_HEADER_COLOR, sessId, instId);
    return iif(() => useCache, cachedBgColor$, fetchBgColor$)
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
