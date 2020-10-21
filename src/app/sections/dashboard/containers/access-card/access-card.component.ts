import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, take } from 'rxjs/operators';
import { AccessCardService } from './services/access-card.service';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { DASHBOARD_NAVIGATE } from '@sections/dashboard/dashboard.config';
import { AppleWalletInfo } from '@core/provider/native-provider/native.provider';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { MobileCredentialFacade } from '@shared/ui-components/mobile-credentials/service/mobile-credential-facade.service';

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
  isMobileAccessButtonEnabled$: Observable<boolean>;
  appleWalletEnabled: boolean = false;
  appleWalletInfo: AppleWalletInfo;
  cardStatusMessage: string;
  appleWalletMessageImage: string;
  appleWalletButtonHidden: boolean = true;
  userPhoto: string;
  isLoadingPhoto: boolean = true;
  userInfo: string;
  mobileCredentialEnabled: boolean = false;
  mobileCredentialAvailable: boolean = false;

  constructor(
    private readonly accessCardService: AccessCardService,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router,
    private readonly changeRef: ChangeDetectorRef,
    private readonly userFacadeService: UserFacadeService,
    public readonly mobileCredentialFacade: MobileCredentialFacade
  ) {}

  ngOnInit() {
    this.setInstitutionData();
    this.getFeaturesEnabled();
    this.getUserData();
    this.getUserName();
    this.initMobileCredential();
  }

  private initMobileCredential(): void {
    this.mobileCredentialFacade.mobileCredentialEnabled$.subscribe(mobileCredentialEnabled => {
      this.mobileCredentialEnabled = mobileCredentialEnabled;
      console.log('awaited results: ', this.mobileCredentialEnabled);
      this.mobileCredentialFacade.setCredentialStateChangeListener(this);
      this.changeRef.detectChanges();
    });
  }

  onCredentialStateChanged(): void {
    this.changeRef.detectChanges();
  }

  ionViewWillEnter() {
    this.mobileCredentialFacade.refreshCredentials();
  }

  private getUserData() {
    this.userName$ = this.accessCardService.getUserName();
    this.accessCardService
      .getUserPhoto()
      .pipe(first())
      .subscribe(photo => {
        this.isLoadingPhoto = false;
        this.userPhoto = photo;
        this.changeRef.detectChanges();
      });
  }

  private setInstitutionData() {
    this.institutionColor$ = this.accessCardService
      .getInstitutionColor()
      .pipe(map(v => '#' + (JSON.parse(v) ? JSON.parse(v)['native-header-bg'] : '')));
    this.institutionName$ = this.accessCardService.getInstitutionName();
    this.institutionPhoto$ = this.accessCardService
      .getInstitutionImage()
      .pipe(map(response => this.sanitizer.bypassSecurityTrustResourceUrl(response)));
    this.institutionBackgroundImage$ = this.accessCardService.getInstitutionBackgroundImage();
  }

  private getFeaturesEnabled() {
    this.getMyCardEnabled$ = this.accessCardService.isGETMyCardEnabled();
    this.isMobileAccessButtonEnabled$ = this.accessCardService.isMobileAccessEnable();
  }

  async onMobileAccessClick(): Promise<void> {
    const color = await this.institutionColor$.pipe(first()).toPromise();
    await this.router.navigate([PATRON_NAVIGATION.mobileAccess], { queryParams: { color } });
  }

  async onScanCardClick(): Promise<void> {
    const color = await this.institutionColor$.pipe(first()).toPromise();
    await this.router.navigate([PATRON_NAVIGATION.dashboard, DASHBOARD_NAVIGATE.scanCard], {
      queryParams: { color },
    });
  }

  private getUserName() {
    this.userFacadeService
      .getUser$()
      .pipe(take(1))
      .subscribe(response => {
        this.userInfo = JSON.stringify(response);
      });
  }
}
