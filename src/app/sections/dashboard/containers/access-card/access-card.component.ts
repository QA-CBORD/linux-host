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
export class AccessCardComponent implements OnInit, OnDestroy {
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

  ionViewWillEnter() {}

  setupMobileCredentials(): void {
    this.userFacadeService.mobileCredentialSettings().subscribe(resp => {
      if (resp.isAppleWalletEnabled()) {
        this.enableAppleWallet();
        this.enableAppleWalletEvents();
      }
    });
  }

  ngOnDestroy(): void {
    console.log('remove HID plugin listener');
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

  private setAppleWalletMessage() {
    if (this.appleWalletInfo && this.appleWalletInfo.isAppleWalletEnabled && this.appleWalletInfo.canAddPass) {
      this.appleWalletEnabled = this.appleWalletInfo.isAppleWalletEnabled;
      let isIPhoneAlreadyProvisioned = this.appleWalletInfo.iPhoneProvisioned;
      let isWatchPaired = this.appleWalletInfo.watchPaired;
      let isIWatchAlreadyProvisioned = this.appleWalletInfo.watchProvisioned;
      let watchCredStatus = this.appleWalletInfo.watchCredStatus;
      let iPhoneCredStatus = this.appleWalletInfo.iPhoneCredStatus;

      /// code ported from iOS with some unused parts left commented out, which we might use later
      if (isIPhoneAlreadyProvisioned && !isWatchPaired) {
        //no watch, only phone
        this.appleWalletMessageImage = 'iphonex';
        this.cardStatusMessage = 'Added to iPhone';
        this.appleWalletButtonHidden = true;
      } else if (isIPhoneAlreadyProvisioned && isWatchPaired && !isIWatchAlreadyProvisioned) {
        this.appleWalletMessageImage = 'iphonex';
        this.cardStatusMessage = 'Added to iPhone';
        this.appleWalletButtonHidden = watchCredStatus == AppleWalletCredentialStatus.Disabled;
      } else if (isWatchPaired && isIWatchAlreadyProvisioned && !isIPhoneAlreadyProvisioned) {
        this.appleWalletMessageImage = 'applewatch';
        this.cardStatusMessage = 'Added to Watch';
        this.appleWalletButtonHidden = iPhoneCredStatus == AppleWalletCredentialStatus.Disabled;
      } else if (isIPhoneAlreadyProvisioned && isIWatchAlreadyProvisioned && isWatchPaired) {
        this.cardStatusMessage = 'Added to iPhone and Watch';
        this.appleWalletMessageImage = 'iphonex_applewatch';
        this.appleWalletButtonHidden = true;
      } else {
        this.cardStatusMessage = 'Card not added to Wallet';
        this.appleWalletMessageImage = null;
        this.appleWalletButtonHidden = false;
      }
    } else {
      this.cardStatusMessage = null;
      this.appleWalletMessageImage = null;
      this.appleWalletButtonHidden = true;
      this.appleWalletEnabled = false;
    }
    this.changeRef.detectChanges();
  }

  async addToAppleWallet() {
    if (this.userInfo) {
      await IOSDevice.addToAppleWallet({ user: this.userInfo });
    }
  }

  private getUserName() {
    this.userFacadeService
      .getUser$()
      .pipe(take(1))
      .subscribe(response => {
        this.userInfo = JSON.stringify(response);
      });
  }

  public addMobileCredential() {
    this.addToAppleWallet();
  }

  private enableAppleWallet() {
    this.authFacadeService.cachedAuthSessionToken$
      .pipe(
        switchMap(sessionId => from(IOSDevice.getAppleWalletInfo({ sessionId: sessionId }))),
        take(1)
      )
      .subscribe(appleWalletInfo => {
        if (appleWalletInfo) {
          this.appleWalletInfo = appleWalletInfo;
          this.setAppleWalletMessage();
        }
      });
  }

  private enableAppleWalletEvents() {
    IOSDevice.addListener('AppleWalletEvent', (info: any) => {
      this.enableAppleWallet();
    });
  }
}
