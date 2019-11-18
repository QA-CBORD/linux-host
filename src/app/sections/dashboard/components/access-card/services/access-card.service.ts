import { ContentStringInfo } from 'src/app/core/model/content/content-string-info.model';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';

import { UserService } from 'src/app/core/service/user-service/user.service';
import { InstitutionService } from 'src/app/core/service/institution/institution.service';
import { ConfigurationService } from 'src/app/core/service/configuration/configuration.service';

import { Settings, ContentStrings } from 'src/app/app.global';
import { ContentService } from 'src/app/core/service/content-service/content.service';

@Injectable()
export class AccessCardService {
  constructor(
    private readonly userService: UserService,
    private readonly institutionService: InstitutionService,
    private readonly configService: ConfigurationService,
  ) {}

  getUserName(): Observable<string> {
    return this.userService.userData.pipe(
      map(userInfo => userInfo.firstName + ' ' + userInfo.lastName),
      take(1)
    );
  }

  getUserPhoto(): Observable<string> {
    return this.userService.getAcceptedPhoto().pipe(
      map(({ data, mimeType }) => `data:${mimeType};base64,${data}`),
      take(1)
    );
  }

  getInstitutionName(): Observable<string> {
    return this.userService.userData.pipe(
      switchMap(({ institutionId }) => this.institutionService.getInstitutionDataById(institutionId)),
      map(({ name }) => name)
    );
  }

  getInstitutionImage(): Observable<string> {
    return this.userService.userData.pipe(
      switchMap(({ institutionId }) => this.institutionService.getInstitutionPhotoById(institutionId)),
      map(({ data, mimeType }) => `data:${mimeType};base64,${data}`)
    );
  }

  getInstitutionBackgroundImage(): Observable<string> {
    return of('/assets/images/card_background_illustration.svg');
    // return this.userService.userData.pipe(
    //   switchMap(({ institutionId }) => this.institutionService.getInstitutionPhotoById(institutionId)),
    //   map(({ data, mimeType }) => `data:${mimeType};base64,${data}`)
    // );
  }

  getInstitutionColor(): Observable<string> {
    return this.userService.userData.pipe(
      switchMap(({ institutionId }) =>
        this.configService.getSetting(institutionId, Settings.Setting.MOBILE_HEADER_COLOR)
      ),
      map(({ value }) => value)
    );
  }


  isGETMyCardEnabled(): Observable<boolean> {
    return this.userService.userData.pipe(
      switchMap(({ institutionId }) => this.configService.getSetting(institutionId, Settings.Setting.MY_CARD_ENABLED)),
      map(({ value }) => Boolean(Number(value)))
    );
  }

  isMobileAccessEnabled(): Observable<boolean> {
    return this.userService.userData.pipe(
      switchMap(({ institutionId }) =>
        this.configService.getSetting(institutionId, Settings.Setting.MOBILE_ACCESS_ENABLED)
      ),
      map(({ value }) => Boolean(Number(value)))
    );
  }

  isApplePayEnabled(): Observable<boolean> {
    return of(false);
  }

}
