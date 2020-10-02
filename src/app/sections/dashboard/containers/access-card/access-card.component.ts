import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, from, pipe } from 'rxjs';
import { first, map, take, switchMap, tap } from 'rxjs/operators';
import { AccessCardService } from './services/access-card.service';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { DASHBOARD_NAVIGATE } from '@sections/dashboard/dashboard.config';
import { AppleWalletInfo, AppleWalletCredentialStatus } from '@core/provider/native-provider/native.provider';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { Plugins } from '@capacitor/core';
import { CredentialState } from '@core/service/payments-api/model/credential-state';
import { CredentialStateInterface, HIDPluginEvents } from '@core/service/payments-api/model/credential-utils';
import { ModalController, PopoverController } from '@ionic/angular';
import { LoadingService } from '@core/service/loading/loading.service';
import { MobileCredentialsComponent } from '@shared/ui-components/mobile-credentials/mobile-credentials.component';
import { AndroidCredential } from '@core/service/payments-api/model/android-credentials';
import { MobileCredentialService } from '@core/service/mobile-credentials/mobile-credential.service';
import { HidCredential } from '@core/service/payments-api/model/mobile-credential';
import { ToastService } from '@core/service/toast/toast.service';

const { IOSDevice, HIDPlugin } = Plugins;

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
  appleWalletMessageImageHidden: boolean;
  appleWalletButtonHidden: boolean = true;
  userPhoto: string;
  isLoadingPhoto: boolean = true;
  userInfo: string;
  androidMobileCredentialAvailable: boolean = false;
  credentialState: CredentialStateInterface;
  HIDPluginEventListener: any;

  constructor(
    private readonly accessCardService: AccessCardService,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router,
    private readonly modalCtrl: ModalController,
    private readonly popoverCtrl: PopoverController,
    private readonly changeRef: ChangeDetectorRef,
    private readonly loadingService: LoadingService,
    private readonly userFacadeService: UserFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly mobileCredentialService: MobileCredentialService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit() {
    this.setInstitutionData();
    this.getFeaturesEnabled();
    this.getUserData();
    this.getUserName();
    this.setupMobileCredentials();
  }

  ionViewWillEnter() {}

  setupMobileCredentials(): void {
    this.userFacadeService.mobileCredentialSettings().subscribe(resp => {
      if (resp.isAppleWalletEnabled()) {
        this.enableAppleWallet();
        this.enableAppleWalletEvents();
      } else if (resp.isAndroidCredEnabled()) {
        this.mobileCredentialService
          .androidActivePasses()
          .pipe(take(1))
          .subscribe(credentialState => {
            // active passes tells us what the credential status/state is: available, provisioned, etc.
            this.credentialState = credentialState;
            console.log('this.credentialState :: ', this.credentialState);
            this.androidMobileCredentialAvailable = this.credentialState.isEnabled();
            if (this.androidMobileCredentialAvailable) {
              if (this.HIDPluginEventListener == null) {
                this.registerHIDPluginEventListener();
              }
              HIDPlugin.startupOrigo().then(() => {
                console.log('startupOrigo completed');
                this.cardStatusMessage = this.credentialState.statusMsg();
                console.log(this.credentialState, this.androidMobileCredentialAvailable);
                this.changeRef.detectChanges();
              });
            }
          });
      }
    });
  }

  private registerHIDPluginEventListener() {
    this.HIDPluginEventListener = HIDPlugin.addListener('HIDPluginEvents', (event: { eventType: HIDPluginEvents }) => {
      switch (event.eventType) {
        case HIDPluginEvents.INSTALL_SUCCESS:
        case HIDPluginEvents.INSTALL_FAILURE:
        case HIDPluginEvents.DUPLICATED_CREDENTIAL:
          this.onInstall(event.eventType);
          break;
        case HIDPluginEvents.STARTUP_SUCCESS:
        case HIDPluginEvents.STARTUP_FAILURE:
          this.onStartup(event.eventType);
          break;
        case HIDPluginEvents.ENDPOINT_DELETE_SUCCESS:
        case HIDPluginEvents.ENDPOINT_DELETE_FAILURE:
          this.onCredentialDelete(event.eventType);
          break;
        default:
          void 0;
      }
    });
  }

  ngOnDestroy(): void {
    console.log('remove HID plugin listener');
    this.HIDPluginEventListener.remove();
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

  private onInstall = (eventType: HIDPluginEvents) => {
    this.loadingService.closeSpinner();
    if (eventType == HIDPluginEvents.INSTALL_SUCCESS) {
      console.log('onINSTALL_SUCCESS()*****');
      this.mobileCredentialService
        .updateCredential({ status: CredentialState.IS_PROVISIONED })
        .pipe(take(1))
        .subscribe(
          state => {
            console.log('new cred state: ', state);
            this.cardStatusMessage = state.statusMsg();
            this.changeRef.detectChanges();
            this.loadingService.closeSpinner();
          },
          error => {
            console.log(error);
            this.toastService.showToast({
              message: 'An Unexpected error Occurred, try again later',
              position: 'bottom',
            });
            this.loadingService.closeSpinner();
          }
        );
    } else if (eventType == HIDPluginEvents.INSTALL_FAILURE) {
      this.toastService.showToast({ message: 'Installation failed, please try again later', position: 'bottom' });
      console.log('onInstallFailure()*****: ', eventType);
    } else if (eventType == HIDPluginEvents.DUPLICATED_CREDENTIAL) {
      this.toastService.showToast({ message: 'Error, Mobile credential already installed.', position: 'bottom' });
      console.log('onInstallFailure()*****: ', eventType);
    }
  };

  private onStartup = (eventType: HIDPluginEvents) => {
    if (eventType == HIDPluginEvents.STARTUP_SUCCESS) {
      console.log('onStartupSuccess()*****');
    } else {
      console.log('onStartupFailure()*****');
    }
  };

  private onCredentialDelete = (eventType: HIDPluginEvents) => {
    if (eventType == HIDPluginEvents.ENDPOINT_DELETE_SUCCESS) {
      console.log('ENDPOINT_DELETE_SUCCESS()*****');
      this.mobileCredentialService
        .deleteCredential()
        .pipe(take(1))
        .subscribe(
          result => {
            console.log('deletion result: ', result);
            this.mobileCredentialService.updateLocalCache({ status: 1 }).subscribe(state => {
              this.cardStatusMessage = state.statusMsg();
              this.loadingService.closeSpinner();
            });
          },
          error => {
            console.log('error{} : ', error);
            this.loadingService.closeSpinner();
          }
        );
    } else {
      this.toastService.showToast({
        message: 'Failed to delete mobile credential, please try again later',
        position: 'bottom',
      });
      console.log('onENDPOINTDELETEFailure()*****');
    }
  };

  private addAndroidCredentials() {
    /**
     *
     *
     *
     */

    const showModal = async (credential: AndroidCredential) => {
      let componentProps = { credential: credential };
      const controller = credential.isProvisioned() ? this.popoverCtrl : this.modalCtrl;
      const credentialModal = await controller.create({
        backdropDismiss: false,
        component: MobileCredentialsComponent,
        componentProps,
      });
      await credentialModal.present();
      return await credentialModal.onDidDismiss();
    };

    const activePasses$ = this.mobileCredentialService.androidActivePasses().pipe(take(1));
    this.loadingService.showSpinner({ message: 'processing.. please wait...' });
    activePasses$.subscribe(state => {
      const androidCredentials$ = this.mobileCredentialService.androidCredential(state).pipe(take(1));
      androidCredentials$.subscribe(
        credential => {
          showModal(credential).then(data => {
            console.log('user action: ', data);
          });
        },
        error => {
          console.log('Error: ', error);
          this.toastService.showToast({
            message: 'ooops! Unexpected error!, please try again later!',
            position: 'bottom',
          });
          this.loadingService.closeSpinner();
        }
      );
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
