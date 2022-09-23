import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, first, map, take } from 'rxjs/operators';
import { AccessCardService } from './services/access-card.service';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION, Settings, User } from 'src/app/app.global';
import { DASHBOARD_NAVIGATE } from '@sections/dashboard/dashboard.config';
import { AppleWalletInfo } from '@core/provider/native-provider/native.provider';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { MobileCredentialFacade } from '@shared/ui-components/mobile-credentials/service/mobile-credential-facade.service';
import { ProfileServiceFacade } from '@shared/services/app.profile.services';
import { BarcodeFacadeService } from '@core/service/barcode/barcode.facade.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'st-access-card',
  templateUrl: './access-card.component.html',
  styleUrls: ['./access-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessCardComponent implements OnInit, OnDestroy {
  userName$: Observable<string>;
  institutionName$: Observable<string>;
  institutionColor$: Observable<string>;
  institutionPhoto$: Observable<SafeResourceUrl>;
  institutionBackgroundImage$: Observable<string>;
  getMyCardEnabled$: Observable<boolean>;
  isMobileAccessButtonEnabled$: Observable<boolean>;
  appleWalletEnabled = false;
  appleWalletInfo: AppleWalletInfo;
  cardStatusMessage: string;
  appleWalletMessageImage: string;
  appleWalletButtonHidden = true;
  userPhoto?: string;
  isLoadingPhoto = true;
  userInfo: string;
  mobileCredentialAvailable = false;
  housingOnlyEnabled: boolean;

  constructor(
    private readonly accessCardService: AccessCardService,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router,
    private readonly changeRef: ChangeDetectorRef,
    private readonly userFacadeService: UserFacadeService,
    public readonly mobileCredentialFacade: MobileCredentialFacade,
    private readonly profileService: ProfileServiceFacade,
    private readonly barcodeFacadeService: BarcodeFacadeService
  ) { }

  ngOnDestroy(): void {
    this.mobileCredentialFacade.onDestroy();
  }

  ngOnInit() {
    this.setInstitutionData();
    this.getFeaturesEnabled();
    this.getUserName();
    this.setHousingOnlyEnabled();
  }

  ngAfterViewInit(): void {
    this.mobileCredentialFacade.setCredentialStateChangeListener(this);
    this.loadScanCardInputs();
  }

  onCredentialStateChanged(): void {
    this.changeRef.detectChanges();
  }

  ionViewWillEnter() {
    this.mobileCredentialFacade.refreshCredentials();
    this.getUserData();
  }

  private getUserData() {
    this.userName$ = this.accessCardService.getUserName();
    this.accessCardService
      .getUserPhoto()
      .pipe(
        first(),
        catchError(() => of(null)))
      .subscribe(
        photo => {
          this.isLoadingPhoto = false;
          this.userPhoto = photo;
          this.changeRef.detectChanges();
        }
      );
  }

  async loadScanCardInputs() {
    firstValueFrom(this.barcodeFacadeService.getUserSetting(User.Settings.CASHLESS_KEY));
    firstValueFrom(this.barcodeFacadeService.getSetting(Settings.Setting.SOA_KEY));
    firstValueFrom(this.barcodeFacadeService.getSetting(Settings.Setting.PATRON_DISPLAY_MEDIA_TYPE));
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
      .subscribe(
        response => {
          this.userInfo = JSON.stringify(response);
        }
      );
  }


  private async setHousingOnlyEnabled(){
    this.housingOnlyEnabled = await this.profileService.housingOnlyEnabled();
  }
}
