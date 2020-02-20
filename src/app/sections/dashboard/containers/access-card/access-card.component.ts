import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { AccessCardService } from './services/access-card.service';
import { Router } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { DASHBOARD_NAVIGATE } from '@sections/dashboard/dashboard.config';
import { NativeProvider, NativeData } from '@core/provider/native-provider/native.provider';

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
  appleWalletInfo: any;
  appleWalletMessage: string;
  appleWalletMessageImage: string;
  appleWalletMessageImageHidden: boolean;
  appleWalletButtonHidden: boolean = true;
  userPhoto: string;
  isLoadingPhoto: boolean = true;

  constructor(
      private readonly accessCardService: AccessCardService,
      private readonly sanitizer: DomSanitizer,
      private readonly router: Router,
      private readonly nativeProvider: NativeProvider,
      private readonly changeRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.setInstitutionData();
    this.getFeaturesEnabled();
    this.getUserData();
    if (this.nativeProvider.isIos()) {
      this.nativeProvider.getIosData(NativeData.APPLE_WALLET_INFO).then(value => {
        this.appleWalletInfo = JSON.parse(value);
        this.setAppleWalletMessage();
      });
    }
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
    await this.router.navigate([NAVIGATE.mobileAccess], { skipLocationChange: true, queryParams: { color } });
  }

  async onScanCardClick(): Promise<void> {
    const color = await this.institutionColor$.pipe(first()).toPromise();
    await this.router.navigate([NAVIGATE.dashboard, DASHBOARD_NAVIGATE.scanCard], {
      skipLocationChange: true,
      queryParams: { color },
    });
  }

  private setAppleWalletMessage() {
    this.appleWalletEnabled = this.appleWalletInfo.isAppleWalletEnabled;
    let canAddPass = this.appleWalletInfo.canAddPass;
    
    if(this.appleWalletEnabled && canAddPass){
      let isIPhoneAlreadyProvisioned = this.appleWalletInfo.iPhoneProvisioned;
      let isWatchPaired = this.appleWalletInfo.watchPaired;
      let isIWatchAlreadyProvisioned = this.appleWalletInfo.watchProvisioned;
      let watchCredStatus = this.appleWalletInfo.watchCredStatus;
      let iPhoneCredStatus = this.appleWalletInfo.iPhoneCredStatus;
      let watchCred = this.appleWalletInfo.watchCred;

      /// code ported from iOS with some unused parts left commented out, which we might use later
      if (isIPhoneAlreadyProvisioned && !isWatchPaired) {
        //no watch, only phone
        this.appleWalletMessageImage = 'iphonex';
        this.appleWalletMessage = 'Added to iPhone';
        // this.appleWalletMessageImageHidden = false;
        this.appleWalletButtonHidden = true;
      } else if (isIPhoneAlreadyProvisioned && isWatchPaired && !isIWatchAlreadyProvisioned) {
        this.appleWalletMessageImage = 'iphonex';
        this.appleWalletMessage = 'Added to iPhone';
        // this.appleWalletMessageImageHidden =  false;
        this.appleWalletButtonHidden = !(watchCredStatus == watchCred);
      } else if (isWatchPaired && isIWatchAlreadyProvisioned && !isIPhoneAlreadyProvisioned) {
        this.appleWalletMessageImage = 'applewatch';
        this.appleWalletMessage = 'Added to Watch';
        // this.appleWalletMessageImageHidden = false;
        this.appleWalletButtonHidden = !(iPhoneCredStatus == watchCred);
      } else if (isIPhoneAlreadyProvisioned && isIWatchAlreadyProvisioned && isWatchPaired) {
        this.appleWalletMessage = 'Added to iPhone and Watch';
        this.appleWalletMessageImage = 'iphonex_applewatch';
        // this.appleWalletMessageImageHidden = false;
        this.appleWalletButtonHidden = true;
      } else {
        this.appleWalletMessage = 'Card not added to Wallet';
        this.appleWalletMessageImage = null;
        // this.appleWalletMessageImageHidden = true;
        this.appleWalletButtonHidden = false;
      }

    } else {
      this.appleWalletMessage = null;
      this.appleWalletMessageImage = null;
      // this.appleWalletMessageImageHidden = true;
      this.appleWalletButtonHidden = true;
    }
    this.changeRef.detectChanges();
  }

  private addToAppleWallet() {
    this.nativeProvider.getIosData(NativeData.ADD_TO_APPLE_WALLET).then(value => {
      let result = JSON.parse(value);
      /// added to Apple Wallet success?
    });
  }
}
