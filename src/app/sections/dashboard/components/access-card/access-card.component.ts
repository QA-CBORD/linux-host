import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { zip } from 'rxjs';
import { map, take, switchMap, tap } from 'rxjs/operators';

import { InstitutionService } from 'src/app/core/service/institution/institution.service';
import { UserService } from 'src/app/core/service/user-service/user.service';
import { ConfigurationService } from 'src/app/core/service/configuration/configuration.service';

import { Institution } from 'src/app/core/model/institution';
import { Settings } from 'src/app/app.global';

@Component({
  selector: 'st-access-card',
  templateUrl: './access-card.component.html',
  styleUrls: ['./access-card.component.scss'],
})
export class AccessCardComponent implements OnInit {
  /// X inst icon
  /// X inst name
  /// X user name
  /// GMC enabled barcode link
  /// mobile access enabled and link
  /// user photo
  /// apple wallet???

  institutionInfo: Institution;
  institutionPhotoUrl: string = '';
  userName: string = '';
  userPhoto: string = '';

  constructor(
    private readonly userService: UserService,
    private readonly institutionService: InstitutionService,
    private readonly configService: ConfigurationService,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    console.log('ACCES CARD On Init Called');

    this.setUserName();
    this.setUserPhoto();
    this.setInstitution();
    this.isGETMyCardEnabled();
    this.isMobileAccessEnabled();
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
        this.institutionPhotoUrl = instPhotoUrl;
      });
  }

  private isGETMyCardEnabled() {
    this.userService.userData
      .pipe(
        switchMap(({ institutionId }) =>
          this.configService.getSetting(institutionId, Settings.ESetting.MY_CARD_ENABLED)
        ),
        map(({value}) => value === '1')
      )
      .subscribe(response => console.log(response));
  }

  private isMobileAccessEnabled() {
    this.userService.userData
      .pipe(
        switchMap(({ institutionId }) =>
          this.configService.getSetting(institutionId, Settings.ESetting.MOBILE_ACCESS_ENABLED)
        ),
        map(({value}) => value === '1')
      )
      .subscribe(response => console.log(response));
  }

}
