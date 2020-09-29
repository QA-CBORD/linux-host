import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { first, map, take, switchMap, tap } from 'rxjs/operators';
import { AccessCardService } from './services/access-card.service';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { DASHBOARD_NAVIGATE } from '@sections/dashboard/dashboard.config';
import { AppleWalletInfo, AppleWalletCredentialStatus } from '@core/provider/native-provider/native.provider';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { Plugins } from '@capacitor/core';
import { PartnerPaymentApiFacadeService } from '@core/service/payments-api/partner-payment-api-facade.service';
import { CredentialState } from '@core/service/payments-api/model/credential-state';
import { CredentialStateInterface } from '@core/service/payments-api/model/credential-utils';
import { ModalController, PopoverController } from '@ionic/angular';
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
  appleWalletMessageImageHidden: boolean;
  appleWalletButtonHidden: boolean = true;
  userPhoto: string;
  isLoadingPhoto: boolean = true;
  userInfo: string;
  androidMobileCredentialAvailable: boolean = false;
  credentialState: CredentialStateInterface;

  constructor(
    private readonly accessCardService: AccessCardService,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router,
    private readonly modalCtrl: ModalController,
    private readonly popoverCtrl: PopoverController,
    private readonly changeRef: ChangeDetectorRef,
    private readonly userFacadeService: UserFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly paymentServiceFacade: PartnerPaymentApiFacadeService
  ) {}

  ngOnInit() {
    this.setInstitutionData();
    this.getFeaturesEnabled();
    this.getUserData();
    this.getUserName();
  }

  ionViewWillEnter() {
    this.userFacadeService.mobileCredentialSettings().subscribe(resp => {
      if (resp.isAppleWalletEnabled()) {
        this.enableAppleWallet();
        this.enableAppleWalletEvents();
      } else if (resp.isAndroidCredEnabled()) {
        this.paymentServiceFacade.androidActivePasses(true).subscribe(activePasses => {
          // active passes tells us what the credential status/state is: available, provisioned, etc.
          this.credentialState = CredentialState.from(activePasses);
          this.androidMobileCredentialAvailable = this.credentialState.isEnabled();
          this.cardStatusMessage = this.credentialState.statusMsg();
          console.log(this.credentialState, this.androidMobileCredentialAvailable);
        });
      }
    });
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
        // this.appleWalletMessageImageHidden = false;
        this.appleWalletButtonHidden = true;
      } else if (isIPhoneAlreadyProvisioned && isWatchPaired && !isIWatchAlreadyProvisioned) {
        this.appleWalletMessageImage = 'iphonex';
        this.cardStatusMessage = 'Added to iPhone';
        // this.appleWalletMessageImageHidden =  false;
        this.appleWalletButtonHidden = watchCredStatus == AppleWalletCredentialStatus.Disabled;
      } else if (isWatchPaired && isIWatchAlreadyProvisioned && !isIPhoneAlreadyProvisioned) {
        this.appleWalletMessageImage = 'applewatch';
        this.cardStatusMessage = 'Added to Watch';
        // this.appleWalletMessageImageHidden = false;
        this.appleWalletButtonHidden = iPhoneCredStatus == AppleWalletCredentialStatus.Disabled;
      } else if (isIPhoneAlreadyProvisioned && isIWatchAlreadyProvisioned && isWatchPaired) {
        this.cardStatusMessage = 'Added to iPhone and Watch';
        this.appleWalletMessageImage = 'iphonex_applewatch';
        // this.appleWalletMessageImageHidden = false;
        this.appleWalletButtonHidden = true;
      } else {
        this.cardStatusMessage = 'Card not added to Wallet';
        this.appleWalletMessageImage = null;
        // this.appleWalletMessageImageHidden = true;
        this.appleWalletButtonHidden = false;
      }
    } else {
      this.cardStatusMessage = null;
      this.appleWalletMessageImage = null;
      // this.appleWalletMessageImageHidden = true;
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

  private addAndroidCredentials() {
    /**
     *
     *
     *
     */

    this.paymentServiceFacade.androidActivePasses(true).subscribe(activePasses => {
      this.paymentServiceFacade.androidCredential(true, activePasses).subscribe(credential => {
          const controller = credential.isProvisioned() ? this.popoverCtrl: this.modalCtrl;
          credential.showModal(controller).then(action => {
             console.log('userAction: ', action);
          });
      });
    });
  }

  public addMobileCredential() {
    if (this.androidMobileCredentialAvailable) {
      this.addAndroidCredentials();
    } else if (!this.appleWalletButtonHidden) {
      this.addToAppleWallet();
    }
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
