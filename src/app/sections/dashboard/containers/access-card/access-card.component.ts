import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, from, pipe, of } from 'rxjs';
import { first, map, take, switchMap, tap } from 'rxjs/operators';
import { AccessCardService } from './services/access-card.service';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { DASHBOARD_NAVIGATE } from '@sections/dashboard/dashboard.config';
import { AppleWalletInfo, AppleWalletCredentialStatus } from '@core/provider/native-provider/native.provider';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { Plugins } from '@capacitor/core';
import { MobileCredentialService } from '@shared/ui-components/mobile-credentials/service/mobile-credential.service';

const { IOSDevice } = Plugins;

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
    private readonly authFacadeService: AuthFacadeService,
    public readonly credentialManager: MobileCredentialService
  ) {}

  ngOnInit() {
    this.setInstitutionData();
    this.getFeaturesEnabled();
    this.getUserData();
    this.getUserName();
    this.credentialManager.mobileCredentialEnabled$.pipe(take(1)).subscribe(mobileCredentialEnabled => {
      console.log('mobileCredentialEnabled: ', mobileCredentialEnabled);
      if (mobileCredentialEnabled) {
        this.mobileCredentialEnabled = mobileCredentialEnabled;
        this.credentialManager.setCredentialStateChangeCallback(this);
        this.changeRef.detectChanges();
      }
    });
  }

  onCredentialStateChanged(): void {
    this.changeRef.detectChanges();
  }

  ionViewWillEnter() {
    this.credentialManager.refreshCredentials();
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
