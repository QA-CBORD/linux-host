import { LoadingService } from '@core/service/loading/loading.service';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { MobileCredentialsComponent } from '@shared/ui-components/mobile-credentials/mobile-credentials.component';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { MobileCredentialStatuses } from '../../shared/credential-state';
import { AndroidCredentialDataService } from '../android-credential-data.service';
import { AbstractAndroidCredentialManager } from '../abstract-android-credential.management';
import { HID } from '../android-credentials';
import { HIDSdkManager } from './hid-plugin.adapter';

export class HIDCredentialManager extends AbstractAndroidCredentialManager {
  private static instance: HIDCredentialManager;
  private static TRANSACTION_SUCCESS_FULL = 'TRANSACTION_SUCCESS';
  private custom_loading_message = 'Processing ... Please wait';
  private endpointSetupRetryCount: number = 1;
  private endpointSetupMaxRetryCount: number = 3;

  private constructor(
    private readonly modalCtrl: ModalController,
    private readonly alertCtrl: AlertController,
    private readonly popoverCtrl: PopoverController,
    private readonly toastService: ToastController,
    private readonly loadingService: LoadingService,
    protected readonly androidCredentialDataService: AndroidCredentialDataService
  ) {
    super();
  }

  onUiImageClicked(event?: any): void {
    const doCredentialFirstInstallation = async () => {
      let componentProps = {
        termsAndConditions$: this.termsAndConditions$,
        credentialManager: this,
      };
      const modal = await this.modalCtrl.create({
        backdropDismiss: false,
        mode: 'ios',
        component: MobileCredentialsComponent,
        componentProps,
      });
      return await modal.present();
    };

    this.loadingService.showSpinner({ message: this.custom_loading_message });
    this.checkCredentialAvailability()
      .pipe(take(1))
      .subscribe(credentialAvailableForInstallation => {
        if (credentialAvailableForInstallation) {
          doCredentialFirstInstallation();
        } else {
          this.showCredentialAlreadyInstalledAlert();
          this.loadingService.closeSpinner();
        }
      });
  }

  private showCredentialAlreadyInstalledAlert(): void {
    // notify user he needs to uninstall from previous device first.
    let header = 'Notification';
    let message =
      'Your Mobile ID is already installed on another device. Please uninstall it from previous device and try again or contact your system administrator.';
    let buttons = [{ text: 'OK', role: 'cancel' }];

    this.createAlertDialog(header, message, buttons).then(alert => alert.present());
  }

  private checkCredentialAvailability(): Observable<boolean> {
    return this.androidCredentialDataService
      .androidActivePassesFromServer()
      .pipe(map(androidCredential => androidCredential.isAvailable()));
  }

  // handles when HID question mark is clicked, should show instructions and an uninstall option if already installed.
  onUiIconClicked(): void {
    const showCredentialUsageContentString = async () => {
      let hidSdkStatus = null;
      let btnText = 'OK';
      if (this.mCredential.isProvisioned()) {
        hidSdkStatus = this.getHidSdkManager().installedCredentialInfo$;
        btnText = 'Uninstall';
      }

      let componentProps = {
        hidSdkStatus: hidSdkStatus,
        credentialUsageContentString$: this.credentialUsageContentString$,
        title: 'Usage Instructions',
        btnText: btnText,
        credentialManager: this,
      };
      const popover = await this.popoverCtrl.create({
        backdropDismiss: false,
        component: MobileCredentialsComponent,
        componentProps,
      });
      await popover.present();
    };
    showCredentialUsageContentString();
  }

  get credentialUsageContentString$(): Promise<string> {
    let credentialUsagecontentStringConfig = {
      domain: CONTENT_STRINGS_DOMAINS.patronUi,
      category: CONTENT_STRINGS_CATEGORIES.mobileCredential,
      name: 'usage-instructions',
    };
    return this.androidCredentialDataService.loadContentString$(credentialUsagecontentStringConfig).toPromise();
  }

  private async createAlertDialog(header: string, msg: string, buttons: Array<any>): Promise<HTMLIonAlertElement> {
    const alertDialog = await this.alertCtrl.create({
      backdropDismiss: false,
      mode: 'ios',
      animated: true,
      message: msg,
      buttons: buttons,
      header: header,
    });
    return await alertDialog;
  }

  onDeleteCredential(event?: string): void {
    if (event != 'Uninstall') {
      this.popoverCtrl.dismiss();
      return;
    }

    const header = 'Please confirm';
    const message = 'Are you sure you want to uninstall your mobile ID ?';

    let buttons = [
      { text: 'Cancel', role: 'cancel' },
      {
        text: 'Confirm',
        handler: () => {
          this.loadingService.showSpinner({ message: this.custom_loading_message });
          this.alertCtrl.dismiss();
          this.uninstallCredential();
        },
      },
    ];
    this.createAlertDialog(header, message, buttons).then(confirmAlert => {
      confirmAlert.present();
      this.popoverCtrl.dismiss();
    });
  }

  credentialAvailable$(): Observable<boolean> {
    return of(this.mCredential.isAvailable());
  }

  private checkIfItsBeenProvisionedOnThisDevice$(): Observable<boolean> {
    return from(this.getHidSdkManager().checkIfEndpointSetup$).pipe(map(hidEndpointIsSetup => hidEndpointIsSetup));
  }

  credentialEnabled$(): Observable<boolean> {
    return of(this.mCredential.isEnabled()).pipe(
      switchMap(mobileCredentialEnabled => {
        if (!mobileCredentialEnabled) {
          return of(false);
        }
        return from(this.getHidSdkManager().initializeSdk()).pipe(
          map(hidSdkInitializationStatus => {
            return hidSdkInitializationStatus == HIDCredentialManager.TRANSACTION_SUCCESS_FULL;
          })
        );
      }),
      switchMap(mobileCredentialEnabled => {
        if (!mobileCredentialEnabled) {
          return of(false);
        }
        if (this.mCredential.isProvisioned()) {
          return this.checkIfItsBeenProvisionedOnThisDevice$().pipe(
            switchMap(credentialProvisioneddOnThisDevice => {
              if (credentialProvisioneddOnThisDevice) {
                return of(true);
              }
              this.mCredential.setStatus(MobileCredentialStatuses.IS_AVAILABLE);
              return of(true);
            })
          );
        }
        return of(true);
      })
    );
  }

  onTermsAndConditionsAccepted(): void {
    this.modalCtrl.dismiss();
    this.loadingService.showSpinner({ message: this.custom_loading_message });
    if (this.mCredential.credentialData && this.mCredential.getCredentialData<HID>().invitationCode) {
      // this will not be undefined only if we had called android credential already and have the activation code.
      this.installCredentialOnDevice();
      return;
    }
    this.androidCredentialDataService
      .getCredentialFromServer$(this.mCredential)
      .pipe(take(1))
      .subscribe(
        credential => {
          this.mCredential = credential;
          this.installCredentialOnDevice();
        },
        () => {
          this.showInstallationErrorAlert('installation');
        }
      );
  }

  private installCredentialOnDevice(): void {
    this.getHidSdkManager()
      .installCredential(this.mCredential.getCredentialData<HID>().invitationCode)
      .then(hidSdkInstallCredentialResult => {
        if (hidSdkInstallCredentialResult == HIDCredentialManager.TRANSACTION_SUCCESS_FULL) {
          this.mCredential.setStatus(MobileCredentialStatuses.IS_PROVISIONED);
          this.androidCredentialDataService
            .updateCredential(this.mCredential)
            .pipe(
              take(1),
              switchMap(credential => {
                return this.androidCredentialDataService.saveCredentialAsUserSetting$(credential);
              })
            )
            .subscribe(() => {
              this.credentialStateChangeSubscription.onCredentialStateChanged();
              this.loadingService.closeSpinner();
            });
        } else {
          if (this.canRetry(hidSdkInstallCredentialResult)) {
            this.loadingService.closeSpinner();
            this.showRetryToast();
            this.endpointSetupRetryCount++;
          } else {
            this.showInstallationErrorAlert('installation');
          }
        }
      });
  }

  canRetry(exceptionType): boolean {
    return this.shouldRetry(exceptionType) && this.endpointSetupRetryCount < this.endpointSetupMaxRetryCount;
  }

  private showRetryToast(): void {
    let toastShow = this.toastService.create({
      message: 'Mobile credential installation error',
      duration: 10000,
      position: 'bottom',
      animated: true,
      mode: 'md',
      buttons: [
        {
          text: 'retry',
          handler: () => {
            this.loadingService.showSpinner({ message: this.custom_loading_message });
            this.installCredentialOnDevice();
          },
        },
      ],
    });
    toastShow.then(toast => toast.present());
  }

  private shouldRetry(exceptionCode): boolean {
    let shouldRetry = false;
    switch (exceptionCode) {
      case 'INTERNAL_ERROR':
      case 'SERVER_UNREACHABLE':
      case 'SDK_BUSY':
        shouldRetry = true;
        break;
      case 'INVALID_INVITATION_CODE':
      case 'DEVICE_SETUP_FAILED':
      case 'SDK_INCOMPATIBLE':
      case 'DEVICE_NOT_ELIGIBLE':
      case 'ENDPOINT_NOT_SETUP':
      default:
        break;
    }
    return shouldRetry;
  }

  private showInstallationErrorAlert(operation: string): void {
    let header = 'Unexpected error';
    let message = `An unexpected error occurred during mobile ID ${operation}, please try again later.`;
    let buttons = [{ text: 'OK', role: 'cancel' }];
    this.createAlertDialog(header, message, buttons).then(errorAlert => {
      this.loadingService.closeSpinner();
      errorAlert.present();
    });
  }

  onTermsAndConditionsDeclined(): void {
    this.modalCtrl.dismiss();
  }

  private uninstallCredential(): void {
    this.androidCredentialDataService
      .deleteCredential()
      .pipe(take(1))
      .subscribe(
        () => {
          this.getHidSdkManager()
            .deleteCurrentCredential()
            .then(() => {
              this.mCredential.setStatus(MobileCredentialStatuses.IS_AVAILABLE);
              this.credentialStateChangeSubscription.onCredentialStateChanged();
            })
            .finally(() => {
              this.loadingService.closeSpinner();
            });
        },
        () => {
          this.loadingService.closeSpinner();
          this.showInstallationErrorAlert('uninstall');
        }
      );
  }

  private getHidSdkManager(): HIDSdkManager {
    return HIDSdkManager.getInstance();
  }

  static getInstance(
    modalCtrl: ModalController,
    alertCtrl: AlertController,
    popoverCtrl: PopoverController,
    toastService: ToastController,
    loadingService: LoadingService,
    androidCredentialDataService: AndroidCredentialDataService
  ): HIDCredentialManager {
    if (!this.instance) {
      this.instance = new HIDCredentialManager(
        modalCtrl,
        alertCtrl,
        popoverCtrl,
        toastService,
        loadingService,
        androidCredentialDataService
      );
    }
    return this.instance;
  }

  get termsAndConditions$(): Promise<string> {
    const termsNConditionsConfig = {
      domain: CONTENT_STRINGS_DOMAINS.get_web_gui,
      category: CONTENT_STRINGS_CATEGORIES.termsScreen,
      name: 'terms',
    };
    return this.androidCredentialDataService
      .loadContentString$(termsNConditionsConfig)
      .pipe(
        map(contentString => {
          this.loadingService.closeSpinner();
          return contentString;
        })
      )
      .toPromise();
  }
}
