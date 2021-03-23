import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { InstitutionPhotoInfo } from '@core/model/institution';
import { UserInfo } from '@core/model/user';
import { getUserFullName } from '@core/utils/general-helpers';
import { skipWhile, map, take } from 'rxjs/operators';
import { Settings } from 'src/app/app.global';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  sanitizer: DomSanitizer
  constructor(
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly userFacadeService: UserFacadeService
  ) {}



  async getInstitutionPhoto(institutionId = null, sessionId = null): Promise<SafeResourceUrl> {
    return this.institutionFacadeService
      .getInstitutionPhotoById$(
        institutionId || (await this.institionId()),
        sessionId || (await this.sessionId()),
        false
      )
      .pipe(
        skipWhile(d => !d || d === null),
        map((res: InstitutionPhotoInfo) => {
          const { data, mimeType } = res;
          return `data:${mimeType};base64,${data}`;
        }),
        //map(response => this.sanitizer.bypassSecurityTrustResourceUrl(response)),
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

  private async institionId(): Promise<string> {
    return this.institutionFacadeService.cachedInstitutionInfo$
      .pipe(
        map(({ id }) => id),
        take(1)
      )
      .toPromise();
  }

  private async sessionId(): Promise<string> {
    return await this.authFacadeService
      .getAuthSessionToken$()
      .pipe(take(1))
      .toPromise();
  }

  async getInstitutionName(institutionId = null, sessionId = null): Promise<string> {
    return this.institutionFacadeService
      .getInstitutionDataById$(
        institutionId || (await this.institionId()),
        sessionId || (await this.sessionId()),
        false
      )
      .pipe(
        map(({ name }) => `${name}`),
        take(1)
      )
      .toPromise();
  }

  async getNativeHeaderBg(institutionId = null, sessionId = null): Promise<string> {
    return this.settingsFacadeService
      .fetchSetting(
        Settings.Setting.MOBILE_HEADER_COLOR,
        sessionId || (await this.sessionId()),
        institutionId || (await this.institionId())
      )
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
