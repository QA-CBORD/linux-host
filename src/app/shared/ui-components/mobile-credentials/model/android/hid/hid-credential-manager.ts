import { LoadingService } from '@core/service/loading/loading.service';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { MobileCredentialsComponent } from '@shared/ui-components/mobile-credentials/mobile-credentials.component';
import { from, Observable, of } from 'rxjs';
import { catchError, first, map, switchMap, take, tap } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { MobileCredentialStatuses } from '../../shared/credential-state';
import { AbstractAndroidCredentialManager } from '../abstract-android-credential.management';
import { AndroidCredential, HIDCredential } from '../android-credential.model';
import { HidCredentialDataService } from '../../../service/hid-credential.data.service';
import { EndpointStatuses, HIDSdkManager } from './hid-plugin.wrapper';
import { Injectable } from '@angular/core';

@Injectable()
export class HIDCredentialManager extends AbstractAndroidCredentialManager {
  private customLoadingOptions = { message: 'Processing ... Please wait', duration: 100000 };
  private transactionRetryCount: number = 1;
  private transactionMaxRetryCount: number = 3;
  private notReadyStateOn = false;

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly alertCtrl: AlertController,
    private readonly popoverCtrl: PopoverController,
    private readonly toastService: ToastController,
    private readonly loadingService: LoadingService,
    private readonly credentialService: HidCredentialDataService
  ) {
    super();
    this.credentialReadyStateSubscribe();
  }

  private async credentialReadyStateSubscribe(): Promise<void> {
    this.hidSdkManager().subject.subscribe(endpointStatus => {
      const uiMsg = this.mCredential.getStatusMsg().replace('[not ready]', '');
      if (endpointStatus == EndpointStatuses.SETUP_ACTIVE) {
        this.mCredential.updateUiMsg(uiMsg);
        this.credentialStateChangeListener.onCredentialStateChanged();
        this.credentialService.updateEndpointStateInfo$(true);
      } else if (endpointStatus == EndpointStatuses.SETUP_INACTIVE) {
        setTimeout(() => {
          this.hidSdkManager().doPostInitWork();
        }, 200000); // start again in 5 minutes.
      }
    });
  }

  onUiImageClicked(event?: any): void {
    const showTermsAndConditions = async () => {
      let componentProps = {
        termsAndConditions$: this.termsAndConditionsSource$,
      };
      const modal = await this.modalCtrl.create({
        backdropDismiss: false,
        mode: 'ios',
        component: MobileCredentialsComponent,
        componentProps,
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      if (data.termsAccepted) {
        this.onTermsAndConditionsAccepted();
      }
    };

    this.showLoading();
    this.checkCredentialAvailability()
      .then(androidCredential => {
        if (androidCredential.isAvailable()) {
          showTermsAndConditions();
        } else {
          this.loadingService.closeSpinner();

          this.showCredentialAlreadyInstalledAlert();
        }
      })
      .catch(() => {
        this.loadingService.closeSpinner();
        this.showInstallationErrorAlert();
      });
  }

  private async showCredentialAlreadyInstalledAlert(): Promise<void> {
    // notify user he needs to uninstall from previous device first.
    let header = 'Notification';
    let message =
      'We have detected that you provisioned a Mobile Credential but it is not on this Phone. You may have uninstalled GET Mobile, or it is on another phone ?. Would you like to install a new Mobile Credential on this phone? Note: if it is installed on another phone, it will no longer work on that phone.';
    const buttons = [
      { text: 'cancel', role: 'cancel' },
      {
        text: 'Install here',
        handler: async () => {
          this.showLoading();
          let operationSuccessfull = await this.handRetriableOperation(this.deleteCredentialFromServer$).catch(
            () => false
          );
          if (operationSuccessfull) {
            this.onUiImageClicked();
          } else {
            this.loadingService.closeSpinner();
            this.showInstallationErrorAlert();
          }
        },
      },
    ];
    this.createAlertDialog(header, message, buttons).then(alert => alert.present());
  }

  private async checkCredentialAvailability(): Promise<AndroidCredential<any>> {
    return await this.credentialService
      .activePasses$()
      .pipe(first())
      .toPromise();
  }

  // handles when HID question mark is clicked, should show instructions and an uninstall option if already installed.

  // is considered revoked when it was active at some point but now is not.
  private async endpointRevoked(): Promise<boolean> {
    const endpointStateInfo = await this.credentialService.getEndpointStateInfo$();
    const endpointHidStatus = await this.hidSdkManager().endpointStatus();
    return endpointStateInfo.endpointActive && endpointHidStatus == EndpointStatuses.SETUP_INACTIVE;
  }

  refresh(): void {
    // we'll check if mobile keys hasn't been revoked, if true, should refresh accordingly.
    const asyncRefresh = async () => {
      if (this.mCredential.isProvisioned()) {
        if (await this.endpointRevoked()) {
          this.mCredential.setStatus(MobileCredentialStatuses.IS_REVOKED);
          this.credentialStateChangeListener.onCredentialStateChanged();
          this.hidSdkManager().deleteEndpoint();
          await this.handRetriableOperation(this.deleteCredentialFromServer$).catch(() =>
            this.showInstallationErrorAlert('deletion')
          );
          setTimeout(async () => {
            this.mCredential = await this.checkCredentialAvailability();
            this.credentialStateChangeListener.onCredentialStateChanged();
          }, 5000);
        }
      }
    };
    asyncRefresh();
  }

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
    return await this.alertCtrl.create({
      backdropDismiss: false,
      mode: 'ios',
      animated: true,
      message: msg,
      buttons: buttons,
      header: header,
    });
  }

  private async showConfirmUninstallDialog(): Promise<void> {
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
    let alertIonAlert = await this.createAlertDialog(header, message, buttons);
    alertIonAlert.present();
  }

  credentialAvailable$(): Observable<boolean> {
    return of(this.mCredential.isAvailable());
  }

  private checkIfItsBeenProvisionedOnThisDevice$(): Observable<boolean> {
    const checkEndpointStatus = async () => {
      let endpointStatus = await this.hidSdkManager().endpointStatus();
      if (endpointStatus == EndpointStatuses.SETUP_ACTIVE) {
        const uiMsg = this.mCredential.getStatusMsg().replace('[not ready]', '');
        this.mCredential.updateUiMsg(uiMsg);
        return true;
      }
      return endpointStatus == EndpointStatuses.SETUP_INACTIVE;
    };
    return from(checkEndpointStatus());
  }

  credentialEnabled$(): Observable<boolean> {
    return of(this.mCredential.isEnabled()).pipe(
      switchMap(isEnabled => {
        if (isEnabled == false) {
          return of(false);
        }
        return from(this.hidSdkManager().initializeSdk()).pipe(catchError(() => of(false)));
      }),
      switchMap(sdkInitSuccess => {
        if (sdkInitSuccess == false) {
          return of(false);
        }
        if (this.mCredential.isProvisioned()) {
          return this.checkIfItsBeenProvisionedOnThisDevice$().pipe(
            map(credentialProvisioneddOnThisDevice => {
              if (credentialProvisioneddOnThisDevice) {
                this.hidSdkManager().doPostInitWork();
                return true;
              }
              this.mCredential.setStatus(MobileCredentialStatuses.IS_AVAILABLE);
              return true;
            })
          );
        } else {
          this.hidSdkManager().refreshEndpoint();
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

  private get doNativeInstall$(): Promise<boolean> {
    return this.hidSdkManager()
      .setupEndpoint((this.mCredential as HIDCredential).getInvitationCode())
      .then(transactionResult => {
        let transactionSucceeded = transactionResult == HIDSdkManager.TRANSACTION_SUCCESS;
        if (transactionSucceeded) {
          return true;
        }
        throw new Error(transactionResult);
      });
  }

  private installCredentialOnDevice(): void {
    this.doNativeInstall$
      .then(() => {
        this.mCredential.setStatus(MobileCredentialStatuses.IS_PROVISIONED);
        this.updateCredentialOnServer$()
          .then(() => {
            this.hidSdkManager().doPostInstallWork();
            delete this.mCredential.credentialBundle.invitationCode;
            this.credentialStateChangeListener.onCredentialStateChanged();
            this.resetRetryCount();
            this.loadingService.closeSpinner();
          })
          .catch(() => {
            this.handleRetry(this.updateCredentialOnServer$)
              .then(() => {
                this.hidSdkManager().doPostInstallWork();
                this.credentialStateChangeListener.onCredentialStateChanged();
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

  private async handRetriableOperation(fn: () => Promise<boolean>): Promise<boolean> {
    return await this.handleRetry(fn);
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

  private deleteCredentialFromServer$ = async (): Promise<boolean> => {
    return await this.credentialService
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
    let transactionResultCode = await this.hidSdkManager().deleteEndpoint();
    if (transactionResultCode == HIDSdkManager.TRANSACTION_SUCCESS) {
      this.mCredential.setStatus(MobileCredentialStatuses.IS_AVAILABLE);
      this.credentialStateChangeListener.onCredentialStateChanged();
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

  private async onDeleteConfirmed(): Promise<void> {
    this.showLoading();
    let credentialDeleteSuccess = await this.handRetriableOperation(this.deleteCredentialFromServer$).catch(() => {
      this.loadingService.closeSpinner();
      this.showInstallationErrorAlert('uninstall');
      return false;
    });
    if (credentialDeleteSuccess) {
      credentialDeleteSuccess = await this.handRetriableOperation(this.deleteCredentialFromDevice$).catch(() => false);
      if (!credentialDeleteSuccess) {
        this.showInstallationErrorAlert('uninstall');
      }
      this.loadingService.closeSpinner();
    }
  }

  private hidSdkManager(): HIDSdkManager {
    return HIDSdkManager.getInstance();
  }

  get termsAndConditionsSource$(): Promise<string> {
    this.showLoading();
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
        }),
        catchError(() => {
          this.loadingService.closeSpinner();
          throw new Error('Error loading content');
        })
      )
      .toPromise();
  }
}
