import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { zip } from 'rxjs';
import { map, take, switchMap, tap } from 'rxjs/operators';

import { InstitutionService } from 'src/app/core/service/institution/institution.service';
import { UserService } from 'src/app/core/service/user-service/user.service';
import { ConfigurationService } from 'src/app/core/service/configuration/configuration.service';

import { Institution } from 'src/app/core/model/institution';
import { Settings } from 'src/app/app.global';
import { AccessCardService } from '../../services/access-card.service';

@Component({
  selector: 'st-access-card',
  templateUrl: './access-card.component.html',
  styleUrls: ['./access-card.component.scss'],
})
export class AccessCardComponent implements OnInit {
 
  institutionInfo: Institution;
  institutionPhotoUrl: SafeResourceUrl;
  userName: string = '';
  userPhoto: string = '';
  getMyCardEnabled: boolean = false;
  mobileAccessEnabled: boolean = false;
  applePayEnabled: boolean = false;
  campusPhoto: string = '';

  constructor(
    private readonly userService: UserService,
    private readonly institutionService: InstitutionService,
    private readonly configService: ConfigurationService,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.setUserName();
    this.setUserPhoto();
    this.setInstitution();
    this.isGETMyCardEnabled();
    this.isMobileAccessEnabled();
    this.isApplePayEnabled();
  }

  private setUserName() {
    this.userService.userData.subscribe(userInfo => (this.userName = userInfo.firstName + ' ' + userInfo.lastName));
  }

  private setUserPhoto() {
    this.userService
      .getAcceptedPhoto()
      .pipe(
        map(({ data, mimeType }) => `data:${mimeType};base64,${data}`),
        take(1)
      )
      .subscribe(
        (url: string) => {
          this.userPhoto = url;
        },
        error => {
          console.log(error);
        }
      );
  }

  private setInstitution() {
    this.userService.userData
      .pipe(
        switchMap(({ institutionId }) =>
          zip(
            this.institutionService.getInstitutionDataById(institutionId),
            this.institutionService.getInstitutionPhotoById(institutionId).pipe(
              tap(response => console.log(response)),
              map(({ data, mimeType }) => `data:${mimeType};base64,${data}`),
              take(1)
            )
          )
        )
      )
      .subscribe(([instInfo, instPhotoUrl]) => {
        this.institutionInfo = instInfo;
        this.institutionPhotoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(instPhotoUrl);
      });
  }

  private isGETMyCardEnabled() {
    this.userService.userData
      .pipe(
        switchMap(({ institutionId }) =>
          this.configService.getSetting(institutionId, Settings.Setting.MY_CARD_ENABLED)
        ),
        map(({ value }) => value === '1')
      )
      .subscribe(response => (this.getMyCardEnabled = response));
  }

  private isMobileAccessEnabled() {
    this.userService.userData
      .pipe(
        switchMap(({ institutionId }) =>
          this.configService.getSetting(institutionId, Settings.Setting.MOBILE_ACCESS_ENABLED)
        ),
        map(({ value }) => value === '1')
      )
      .subscribe(response => (this.mobileAccessEnabled = response));
  }

  private isApplePayEnabled(){}
}
