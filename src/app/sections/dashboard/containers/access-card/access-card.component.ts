import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccessCardService } from './services/access-card.service';

import { Institution } from 'src/app/core/model/institution';

@Component({
  selector: 'st-access-card',
  templateUrl: './access-card.component.html',
  styleUrls: ['./access-card.component.scss'],
})
export class AccessCardComponent implements OnInit {
  userName$: Observable<string>;
  userPhoto$: Observable<string>;
  institutionName$: Observable<string>;
  institutionPhoto$: Observable<SafeResourceUrl>;
  institutionBackgroundImage$: Observable<string>;
  getMyCardEnabled$: Observable<boolean>;
  mobileAccessEnabled$: Observable<boolean>;
  applePayEnabled$: Observable<boolean>;

  constructor(private readonly accessCardService: AccessCardService, private readonly sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.setUserName();
    this.setUserPhoto();
    this.setInstitutionData();
    this.getFeaturesEnabled();
  }

  private setUserName() {
    this.userName$ = this.accessCardService.getUserName();
  }

  private setUserPhoto() {
    this.userPhoto$ = this.accessCardService.getUserPhoto();
  }

  private setInstitutionData() {
    this.institutionName$ = this.accessCardService.getInstitutionName();
    this.institutionPhoto$ = this.accessCardService
      .getInstitutionImage()
      .pipe(map(response => this.sanitizer.bypassSecurityTrustResourceUrl(response)));
    this.institutionBackgroundImage$ = this.accessCardService.getInstitutionBackgroundImage();
  }

  private getFeaturesEnabled() {
    this.getMyCardEnabled$ = this.accessCardService.isGETMyCardEnabled();
    this.mobileAccessEnabled$ = this.accessCardService.isMobileAccessEnabled();
    this.applePayEnabled$ = this.accessCardService.isApplePayEnabled();
  }
}
