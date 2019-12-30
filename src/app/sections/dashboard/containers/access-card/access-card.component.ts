import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';

import { AccessCardService } from './services/access-card.service';
import { Router } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { DASHBOARD_NAVIGATE } from '@sections/dashboard/dashboard.config';

@Component({
  selector: 'st-access-card',
  templateUrl: './access-card.component.html',
  styleUrls: ['./access-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessCardComponent implements OnInit {
  userName$: Observable<string>;
  institutionName$: Observable<string>;
  institutionColor$: Observable<string>;
  institutionPhoto$: Observable<SafeResourceUrl>;
  institutionBackgroundImage$: Observable<string>;
  getMyCardEnabled$: Observable<boolean>;
  isMobileAccessButtonEnabled: Observable<boolean>;
  applePayEnabled$: Observable<boolean>;
  userPhoto: string;
  isLoadingPhoto: boolean = true;

  constructor(
    private readonly accessCardService: AccessCardService,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router,
    private readonly cdRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.getUserData();
    this.setInstitutionData();
    this.getFeaturesEnabled();
  }

  private getUserData() {
    this.userName$ = this.accessCardService.getUserName();
    this.accessCardService.getUserPhoto().pipe(
      first(),
    ).subscribe(photo => {
      this.isLoadingPhoto = false;
      this.userPhoto = photo;
      this.cdRef.detectChanges();
    });
  }

  private setInstitutionData() {
    this.institutionColor$ = this.accessCardService
      .getInstitutionColor()
      .pipe(map(v => '#' + JSON.parse(v)['native-header-bg']));
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

  async onMobileAccessClick(): Promise<void> {
    const color = await this.institutionColor$.pipe(first()).toPromise();
    await this.router.navigate([NAVIGATE.mobileAccess],
      { skipLocationChange: true, queryParams: { color } });
  }

  async onScanCardClick(): Promise<void> {
    const color = await this.institutionColor$.pipe(first()).toPromise();
    await this.router.navigate([NAVIGATE.dashboard, DASHBOARD_NAVIGATE.scanCard],
      { skipLocationChange: true, queryParams: { color } });
  }
}
