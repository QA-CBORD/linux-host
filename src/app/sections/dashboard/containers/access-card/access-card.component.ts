import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { AccessCardService } from './services/access-card.service';
import { Router } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { DASHBOARD_NAVIGATE } from '@sections/dashboard/dashboard.config';

@Component({
  selector: 'st-access-card',
  templateUrl: './access-card.component.html',
  styleUrls: ['./access-card.component.scss'],
})
export class AccessCardComponent implements OnInit {
  userName$: Observable<string>;
  userPhoto$: Promise<string>;
  institutionName$: Observable<string>;
  institutionColor$: Observable<string>;
  institutionPhoto$: Observable<SafeResourceUrl>;
  institutionBackgroundImage$: Observable<string>;
  getMyCardEnabled$: Observable<boolean>;
  isMobileAccessButtonEnabled: Observable<boolean>;
  applePayEnabled$: Observable<boolean>;
  isLoadingImg: boolean;
  

  constructor(
    private readonly accessCardService: AccessCardService,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.getUserData();
    this.setInstitutionData();
    this.getFeaturesEnabled();
  }

  private getUserData() {
    this.isLoadingImg = true;
    this.userName$ = this.accessCardService.getUserName();
    this.institutionColor$ = this.accessCardService
      .getInstitutionColor()
      .pipe(map(v => '#' + JSON.parse(v)['native-header-bg']));
    this.userPhoto$ = this.accessCardService
      .getUserPhoto()
      .pipe(first())
      .toPromise()
      .finally(() => (this.isLoadingImg = !this.isLoadingImg));
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
    this.isMobileAccessButtonEnabled = this.accessCardService.isMobileAccessEnable();
    this.applePayEnabled$ = this.accessCardService.isApplePayEnabled();
  }
  onMobileAccessClick() {
    this.router.navigate([NAVIGATE.mobileAccess]);
  }
  onScanCardClick() {
    this.router.navigate([NAVIGATE.dashboard, DASHBOARD_NAVIGATE.scanCard]);
  }
}
