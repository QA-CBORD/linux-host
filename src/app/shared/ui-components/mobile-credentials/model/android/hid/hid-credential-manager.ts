import { LoadingService } from '@core/service/loading/loading.service';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { MobileCredentialsComponent } from '@shared/ui-components/mobile-credentials/mobile-credentials.component';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { MobileCredentialStatuses } from '../../shared/credential-state';
import { AndroidCredentialDataService } from '../android-credential-data.service';
import { AbstractAndroidCredentialManager } from '../abstract-android-credential.management';
import { AndroidCredential, HID } from '../android-credentials';
import { HIDSdkManager } from './hid-plugin.adapter';

export class HIDCredentialManager extends AbstractAndroidCredentialManager {
  private static instance: HIDCredentialManager;
  private static TRANSACTION_SUCCESS_FULL = 'TRANSACTION_SUCCESS';
  private customLoadingOptions = { message: 'Processing ... Please wait', duration: 60000 };
  private transactionRetryCount: number = 1;
  private transactionMaxRetryCount: number = 2;

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
      };
      const modal = await this.modalCtrl.create({
        backdropDismiss: false,
        mode: 'ios',
        component: MobileCredentialsComponent,
        componentProps,
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      // check that this is not executed until popup is dismissed.
      console.log('waited for popup dismiss before executing....: ', data);
      if (data.termsAccepted) {
        this.onTermsAndConditionsAccepted();
      }
    };

    this.loadingService.showSpinner(this.customLoadingOptions);
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
      let btnText = this.mCredential.isProvisioned() ? 'Uninstall' : 'OK';
      let componentProps = {
        credentialUsageContentString$: this.credentialUsageContentString$(),
        title: 'Usage Instructions',
        btnText: btnText,
      };
      const popover = await this.popoverCtrl.create({
        backdropDismiss: false,
        component: MobileCredentialsComponent,
        componentProps,
      });
      await popover.present();
      const { data } = await popover.onDidDismiss();
      let shouldUninstall = data.action == 'Uninstall';
      if (shouldUninstall) {
        this.showConfirmUninstallDialog();
      }
    };
    showCredentialUsageContentString();
  }

  protected credentialUsageContentString$(): Promise<string> {
    let credentialUsagecontentStringConfig = {
      domain: CONTENT_STRINGS_DOMAINS.patronUi,
      category: CONTENT_STRINGS_CATEGORIES.mobileCredential,
      name: 'usage-instructions',
    };
    return this.androidCredentialDataService
      .loadContentString$(credentialUsagecontentStringConfig)
      .pipe(
        switchMap(contentString => {
          if (contentString) {
            return of(contentString);
          }
          return from(super.credentialUsageContentString$());
        })
      )
      .toPromise();
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

  private showConfirmUninstallDialog(): void {
    const header = 'Please confirm';
    const message = 'Are you sure you want to uninstall your mobile ID ?';

    let buttons = [
      { text: 'Cancel', role: 'cancel' },
      {
        text: 'Confirm',
        handler: () => {
          this.alertCtrl.dismiss();
          this.onDeleteConfirmed();
        },
      },
    ];
    this.createAlertDialog(header, message, buttons).then(confirmAlert => {
      confirmAlert.present();
    });
  }

  credentialAvailable$(): Observable<boolean> {
    return of(this.mCredential.isAvailable());
  }

  private checkIfItsBeenProvisionedOnThisDevice$(): Observable<boolean> {
    return from(this.hidSdkManager().checkIfEndpointSetup$).pipe(map(hidEndpointIsSetup => hidEndpointIsSetup));
  }

  credentialEnabled$(): Observable<boolean> {
    return of(this.mCredential.isEnabled()).pipe(
      switchMap(mobileCredentialEnabled => {
        if (!mobileCredentialEnabled) {
          return of(false);
        }
        return from(this.hidSdkManager().initializeSdk()).pipe(
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

  private getCredentialFromServer$(): Promise<AndroidCredential<any>> {
    return of(this.mCredential)
      .pipe(
        map(currentCredential => {
          console.log('currentCredential: ', currentCredential);
          const credentialStillValid =
            currentCredential.credentialData && currentCredential.credentialData.invitationCode ? true : false;
          return credentialStillValid;
        }),
        switchMap(currentCredentialStillValid => {
          if (currentCredentialStillValid) {
            return of(this.mCredential);
          }
          return this.androidCredentialDataService.getCredentialFromServer$(this.mCredential).pipe(take(1));
        })
      )
      .toPromise();
  }

  private onTermsAndConditionsAccepted(): void {
    this.loadingService.showSpinner(this.customLoadingOptions);
    this.getCredentialFromServer$()
      .then(newCredential => {
        this.mCredential = newCredential;
        this.installCredentialOnDevice();
      })
      .catch(err => {
        this.loadingService.closeSpinner();
        this.showInstallationErrorAlert();
      });
  }

  private updateCredentialOnServer$(): Promise<boolean> {
    return this.androidCredentialDataService
      .updateCredential(this.mCredential)
      .pipe(
        take(1),
        switchMap(serverUpdateSuccess => {
          if (serverUpdateSuccess) {
            return this.androidCredentialDataService.saveCredentialAsUserSetting$(this.mCredential);
          }
          throw new Error('Failed to update credential on server$');
        })
      )
      .toPromise();
  }

  private get doNativeCredentialInstall$(): Promise<string> {
    return this.hidSdkManager().installCredential(this.mCredential.getCredentialData<HID>().invitationCode);
  }

  private installCredentialOnDevice(): void {
    this.doNativeCredentialInstall$.then(deviceInstallResult => {
      let mobileCredentialInstallSuccess = deviceInstallResult == HIDCredentialManager.TRANSACTION_SUCCESS_FULL;
      if (mobileCredentialInstallSuccess) {
        this.mCredential.setStatus(MobileCredentialStatuses.IS_PROVISIONED);
        this.updateCredentialOnServer$()
          .then(() => {
            this.loadingService.closeSpinner();
            delete this.mCredential.credentialData.invitationCode;
            this.credentialStateChangeSubscription.onCredentialStateChanged();
          })
          .catch(err => {
            console.log('error ==> ', err);
            this.retry(this.updateCredentialOnServer$)
              .then(retrySucceeded => {
                if (!retrySucceeded) {
                  this.deleteCredentialFromDevice$().then(() => this.showInstallationErrorAlert());
                  this.credentialStateChangeSubscription.onCredentialStateChanged();
                }
              })
              .finally(() => {
                this.transactionRetryCount = 1;
                this.loadingService.closeSpinner();
              });
          });
      } else {
        if (this.canRetry(deviceInstallResult)) {
          (async () => await this.showRetryToast())().then(shoudRetryInstallation => {
            console.log('shoudRetryInstallation: ', shoudRetryInstallation);
            if (shoudRetryInstallation) {
              this.installCredentialOnDevice();
            }
          });
        } else {
          this.showInstallationErrorAlert();
        }
      }
    });
  }

  private canRetry(exceptionType = null): boolean {
    let anotherRetryAllowed = this.transactionRetryCount <= this.transactionMaxRetryCount;
    const retryAllowed = exceptionType ? this.shouldRetry(exceptionType) && anotherRetryAllowed : anotherRetryAllowed;
    this.transactionRetryCount = retryAllowed ? this.transactionRetryCount + 1 : 1;
    return retryAllowed;
  }

  private async retry(fn: () => Promise<boolean>): Promise<boolean> {
    while (this.canRetry()) {
      try {
        if (await fn()) {
          return true;
        }
      } catch (err) {
        console.log('Attempt ', this.transactionRetryCount, ' failed with ', err);
      }
    }
    throw new Error('Failed all attempts');
  }

  private async showRetryToast(): Promise<boolean> {
    let myToast = this.toastService
      .create({
        message: 'Mobile credential installation error',
        duration: 10000,
        position: 'bottom',
        animated: true,
        mode: 'md',
        buttons: [
          {
            text: 'retry',
            role: 'cancel',
            handler: () => {
              this.alertCtrl.dismiss(true);
            },
          },
        ],
      })
      .then(async toast => {
        await toast.present();
        const { data } = await toast.onDidDismiss();
        let retryHit = data ? true : false;
        return retryHit;
      });
    return await myToast;
  }

  private shouldRetry(exceptionCode): boolean {
    if (!exceptionCode) {
      return false;
    }
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

  private showInstallationErrorAlert(operation = 'installation'): void {
    let header = 'Unexpected error';
    let message = `An unexpected error occurred during mobile ID ${operation}, please try again later.`;
    let buttons = [{ text: 'OK', role: 'cancel' }];
    this.createAlertDialog(header, message, buttons).then(errorAlert => {
      this.loadingService.closeSpinner();
      errorAlert.present();
    });
  }

  private get deleteCredentialFromServer$(): Promise<boolean> {
    return this.androidCredentialDataService
      .deleteCredential()
      .pipe(take(1))
      .toPromise();
  }

  private deleteCredentialFromDevice$ = async (): Promise<boolean> => {
    console.log('deleteCredentialFromDevice executed..');
    let transactionResultCode = await this.hidSdkManager().deleteCurrentCredential();
    console.log('transactionResultCode : ==>> ', transactionResultCode);
    if (transactionResultCode == HIDCredentialManager.TRANSACTION_SUCCESS_FULL) {
      this.mCredential.setStatus(MobileCredentialStatuses.IS_AVAILABLE);
      this.credentialStateChangeSubscription.onCredentialStateChanged();
      return true;
    }
    throw new Error(`Failed with error: ${transactionResultCode}`);
  };

  private onDeleteConfirmed(): void {
    this.loadingService.showSpinner(this.customLoadingOptions);
    this.deleteCredentialFromServer$
      .then(serverDeleteSuccess => {
        console.log('serverDeleteSuccess: ', serverDeleteSuccess);
        if (serverDeleteSuccess) {
          this.deleteCredentialFromDevice$()
            .then(deviceDeleteSuccess => {
              console.log('deviceDeleteSuccess: ', deviceDeleteSuccess);
              this.transactionRetryCount = 1;
              this.loadingService.closeSpinner();
            })
            .catch(err => {
              console.log('error ==> ', err);
              this.retry(this.deleteCredentialFromDevice$)
                .then(() => this.credentialStateChangeSubscription.onCredentialStateChanged())
                .catch(err => {
                  console.log('retry failed with ', err);
                  this.loadingService.closeSpinner();
                })
                .finally(() => {
                  console.log('finally !!!!!!!!!!!!!!! ');
                  this.transactionRetryCount = 1;
                });
            });
        } else {
          if (this.canRetry()) {
            this.onDeleteConfirmed();
          } else {
            this.loadingService.closeSpinner();
            this.showInstallationErrorAlert('uninstall');
          }
        }
      })
      .catch(reason => {
        console.log('error reason ==>: ', reason);
        this.loadingService.closeSpinner();
        this.showInstallationErrorAlert('uninstall');
      });
  }

  private hidSdkManager(): HIDSdkManager {
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
