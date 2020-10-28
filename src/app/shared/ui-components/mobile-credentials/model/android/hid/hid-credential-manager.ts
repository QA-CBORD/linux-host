import { LoadingService } from '@core/service/loading/loading.service';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { MobileCredentialsComponent } from '@shared/ui-components/mobile-credentials/mobile-credentials.component';
import { from, Observable, of } from 'rxjs';
import { catchError, first, map, switchMap, take, tap } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { MobileCredentialStatuses } from '../../shared/credential-state';
import { AbstractAndroidCredentialManager } from '../abstract-android-credential.management';
import { AndroidCredential, HID, HIDCredential } from '../android-credential.model';
import { HidCredentialDataService } from '../../../service/hid-credential.data.service';
import { HIDSdkManager } from './hid-plugin.wrapper';
import { Injectable } from '@angular/core';

@Injectable()
export class HIDCredentialManager extends AbstractAndroidCredentialManager {
  private static instance: HIDCredentialManager;
  private static TRANSACTION_SUCCESS_FULL = 'TRANSACTION_SUCCESS';
  private customLoadingOptions = { message: 'Processing ... Please wait', duration: 100000 };
  private transactionRetryCount: number = 1;
  private transactionMaxRetryCount: number = 2;

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly alertCtrl: AlertController,
    private readonly popoverCtrl: PopoverController,
    private readonly toastService: ToastController,
    private readonly loadingService: LoadingService,
    private readonly credentialService: HidCredentialDataService
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
      if (data.termsAccepted) {
        this.onTermsAndConditionsAccepted();
      }
    };

    this.showLoading();
    this.checkCredentialAvailability()
      .pipe(take(1))
      .subscribe(
        credentialAvailableForInstallation => {
          if (credentialAvailableForInstallation) {
            doCredentialFirstInstallation();
          } else {
            this.showCredentialAlreadyInstalledAlert();
            this.loadingService.closeSpinner();
          }
        },
        () => {
          this.loadingService.closeSpinner();
          this.showInstallationErrorAlert();
        }
      );
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
    return this.credentialService.activePasses$().pipe(map(androidCredential => androidCredential.isAvailable()));
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
    return this.credentialService
      .contentString$(credentialUsagecontentStringConfig)
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
            map(credentialProvisioneddOnThisDevice => {
              if (credentialProvisioneddOnThisDevice) {
                return true;
              }
              this.mCredential.setStatus(MobileCredentialStatuses.IS_AVAILABLE);
              return true;
            })
          );
        } else {
          return of(true);
        }
      })
    );
  }

  private getCredentialFromServer$(): Promise<AndroidCredential<any>> {
    return of(this.mCredential)
      .pipe(
        map((currentCredential: HIDCredential) => {
          return currentCredential.getInvitationCode() ? true : false;
        }),
        switchMap(invitationCodeValid => {
          if (invitationCodeValid) {
            return of(this.mCredential);
          } else {
            return this.credentialService.androidCredential$(this.mCredential);
          }
        })
      )
      .toPromise();
  }

  private onTermsAndConditionsAccepted(): void {
    this.showLoading();
    this.getCredentialFromServer$()
      .then(newCredential => {
        this.mCredential = newCredential;
        this.installCredentialOnDevice();
      })
      .catch(() => {
        this.loadingService.closeSpinner();
        this.showInstallationErrorAlert();
      });
  }

  private updateCredentialOnServer$ = async (): Promise<boolean> => {
    return await this.credentialService
      .updateCredential$(this.mCredential)
      .pipe(
        catchError(() => {
          throw new Error('Failed to update credential on server$');
        }),
        first()
      )
      .toPromise();
  };

  private get doNativeCredentialInstall$(): Promise<boolean> {
    return this.hidSdkManager()
      .installCredential((this.mCredential as HIDCredential).getInvitationCode())
      .then(transactionResult => {
        let transactionSucceeded = transactionResult == HIDCredentialManager.TRANSACTION_SUCCESS_FULL;
        if (transactionSucceeded) {
          return true;
        }
        throw new Error(transactionResult);
      });
  }

  private installCredentialOnDevice(): void {
    this.doNativeCredentialInstall$
      .then(() => {
        this.mCredential.setStatus(MobileCredentialStatuses.IS_PROVISIONED);
        this.updateCredentialOnServer$()
          .then(() => {
            this.resetRetryCount();
            this.loadingService.closeSpinner();
            delete this.mCredential.credentialBundle.invitationCode;
            this.credentialStateChangeSubscription.onCredentialStateChanged();
          })
          .catch(() => {
            this.handleRetry(this.updateCredentialOnServer$)
              .then(() => {
                this.deleteCredentialFromDevice$().then(() => this.showInstallationErrorAlert());
                this.credentialStateChangeSubscription.onCredentialStateChanged();
              })
              .catch(() => {
                // still failed after 3 retry..then we want to undo the installation on device and ask user to try again later.
                this.showInstallationErrorAlert();
                this.deleteCredentialFromDevice$();
                this.deleteCredentialFromServer$();
              })
              .finally(() => {
                this.resetRetryCount();
                this.loadingService.closeSpinner();
              });
          });
      })
      .catch(error => {
        if (this.canRetry(error.message)) {
          this.loadingService.closeSpinner();
          this.showRetryToast().then(shoudRetryInstallation => {
            if (shoudRetryInstallation) {
              this.showLoading();
              this.installCredentialOnDevice();
            }
          });
        } else {
          this.showInstallationErrorAlert();
        }
      });
  }

  private canRetry(error?: string): boolean {
    const anotherRetryAllowed = this.transactionRetryCount <= this.transactionMaxRetryCount;
    if (anotherRetryAllowed) {
      if (error && !this.shouldRetryBecauseOf(error)) {
        this.resetRetryCount();
        return false;
      }
      this.transactionRetryCount++;
      return anotherRetryAllowed;
    }
    this.resetRetryCount();
    return false;
  }

  private async handleRetry(fn: () => Promise<boolean>, error?: string): Promise<boolean> {
    while (this.canRetry(error)) {
      try {
        if (await fn()) {
          return true;
        }
      } catch (err) {
        error = error ? err.message : error;
      }
    }
    throw new Error('Failed all attempts');
  }

  private async showRetryToast(): Promise<boolean> {
    let myToast = await this.toastService.create({
      message: 'Mobile credential installation error',
      duration: 15000,
      position: 'bottom',
      buttons: [
        {
          text: 'retry',
          handler: () => {
            myToast.dismiss(true);
          },
        },
      ],
    });
    myToast.setAttribute('role', 'alert');
    await myToast.present();
    const { data } = await myToast.onDidDismiss();
    return data ? true : false;
  }

  private shouldRetryBecauseOf(error: string): boolean {
    if (!error) {
      return false;
    }
    let shouldRetry = false;
    switch (error) {
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

  private deleteCredentialFromServer$ = (): Promise<boolean> => {
    return this.credentialService
      .deleteCredential$()
      .pipe(
        map(deletionSucceeded => {
          if (deletionSucceeded) {
            return deletionSucceeded;
          }
          throw new Error('Credential Delete failed');
        })
      )
      .toPromise();
  };

  private deleteCredentialFromDevice$ = async (): Promise<boolean> => {
    let transactionResultCode = await this.hidSdkManager().deleteCurrentCredential();
    if (transactionResultCode == HIDCredentialManager.TRANSACTION_SUCCESS_FULL) {
      this.mCredential.setStatus(MobileCredentialStatuses.IS_AVAILABLE);
      this.credentialStateChangeSubscription.onCredentialStateChanged();
      return true;
    }
    throw new Error(transactionResultCode);
  };

  private resetRetryCount(): void {
    this.transactionRetryCount = 1;
  }

  private showLoading(): void {
    if (this.loadingService.notLoading()) {
      this.loadingService.showSpinner(this.customLoadingOptions);
    }
  }

  private onDeleteConfirmed(): void {
    this.showLoading();
    this.deleteCredentialFromServer$()
      .then(() => {
        this.resetRetryCount();
        this.deleteCredentialFromDevice$()
          .catch(error => {
            this.showLoading();
            this.handleRetry(this.deleteCredentialFromDevice$, error.message)
              .then(() => this.credentialStateChangeSubscription.onCredentialStateChanged())
              .catch(() => this.showInstallationErrorAlert('uninstall'))
              .finally(() => {
                this.loadingService.closeSpinner();
                this.resetRetryCount();
              });
          })
          .finally(() => {
            this.resetRetryCount();
            this.loadingService.closeSpinner();
          });
      })
      .catch(error => {
        if (this.canRetry()) {
          this.onDeleteConfirmed();
        } else {
          this.loadingService.closeSpinner();
          this.showInstallationErrorAlert('uninstall');
        }
      });
  }

  private hidSdkManager(): HIDSdkManager {
    return HIDSdkManager.getInstance();
  }

  get termsAndConditions$(): Promise<string> {
    const termsNConditionsConfig = {
      domain: CONTENT_STRINGS_DOMAINS.get_web_gui,
      category: CONTENT_STRINGS_CATEGORIES.termsScreen,
      name: 'terms',
    };
    return this.credentialService
      .contentString$(termsNConditionsConfig)
      .pipe(
        map(contentString => {
          this.loadingService.closeSpinner();
          return contentString;
        })
      )
      .toPromise();
  }
}
