import { Injectable } from '@angular/core';

import { from, Observable, of } from 'rxjs';
import { map, skipWhile, switchMap } from 'rxjs/operators';

import { Settings } from 'src/app/app.global';
import { NativeData, NativeProvider } from '@core/provider/native-provider/native.provider';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { CommonService } from '@shared/services/common.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';

@Injectable()
export class AccessCardService {
  constructor(
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly userFacadeService: UserFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly nativeProvider: NativeProvider,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly commonService: CommonService
  ) {}

  getUserName(): Observable<string> {
    return from(this.commonService.getUserName());
  }

  getUserPhoto(): Observable<string> {
    return from(this.commonService.getUserPhoto());
  }

  getInstitutionName(): Observable<string> {
    return this.userFacadeService.getUserData$().pipe(
      switchMap(({ institutionId }) => this.institutionFacadeService.getInstitutionInfo$(institutionId)),
      map(({ name }) => name)
    );
  }

  getInstitutionImage(): Observable<string> {
    return this.userFacadeService.getUserData$().pipe(
      switchMap(({ institutionId }) => this.institutionFacadeService.getInstitutionPhoto$(institutionId)),
      skipWhile(val => !val || val === null),
      map(({ data, mimeType }) => `data:${mimeType};base64,${data}`)
    );
  }

  getInstitutionBackgroundImage(): Observable<string> {
    return this.institutionFacadeService.cachedInstitutionInfo$.pipe(
      map(institution => institution && institution.imageBannerFull),
      skipWhile(imageBannerFull => !imageBannerFull || imageBannerFull === null),
      map(imageBannerFull => this.environmentFacadeService.getImageURL() + imageBannerFull)
    );
  }

  getInstitutionColor(): Observable<string> {
    return this.settingsFacadeService.getSetting(Settings.Setting.MOBILE_HEADER_COLOR).pipe(
      map(({ value }) => value)
    );
  }

  isGETMyCardEnabled(): Observable<boolean> {
    return this.settingsFacadeService.getSetting(Settings.Setting.MY_CARD_ENABLED).pipe(
      map(({ value }) => !!parseInt(value))
    );
  }

  isMobileAccessEnable(): Observable<boolean> {
    return this.settingsFacadeService.getSetting(Settings.Setting.MOBILE_ACCESS_ENABLED).pipe(
      map(({ value }) => Boolean(Number(value))
    ));
  }

  isAppleWalletEnabled(): Observable<boolean> {
    if (this.nativeProvider.isIos()) {
      return from(this.nativeProvider.getIosData(NativeData.APPLE_WALLET_INFO)).pipe(
        map((data: any) => JSON.parse(data).isAppleWalletEnabled as boolean)
      );
    } else {
      return of(false);
    }
  }
}
