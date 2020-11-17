import { LoadingService } from '@core/service/loading/loading.service';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { MobileCredentialsComponent } from '@shared/ui-components/mobile-credentials/mobile-credentials.component';
import { from, Observable, of } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { MobileCredentialStatuses } from '../../shared/credential-state';
import { AbstractAndroidCredentialManager } from '../abstract-android-credential.management';
import { AndroidCredential, HIDCredential } from '../android-credential.model';
import { HidCredentialDataService } from '../../../service/hid-credential.data.service';
import { EndpointStatuses, HIDSdkManager } from './hid-plugin.wrapper';
import { Injectable } from '@angular/core';

interface ExecutionParameters {
  fn: () => Promise<boolean>;
  retryCount?: number;
  showLoading: boolean;
  checkErrors?: boolean;
  userDecides?: boolean;
}

@Injectable()
export class HIDCredentialManager extends AbstractAndroidCredentialManager {
  private endpointAlreadyInstalledFlag = false;
  constructor(
    private readonly modalCtrl: ModalController,
    private readonly alertCtrl: AlertController,
    private readonly popoverCtrl: PopoverController,
    private readonly toastService: ToastController,
    protected readonly loadingService: LoadingService,
    protected readonly credentialService: HidCredentialDataService
  ) {
    super(loadingService, credentialService);
    this.credentialStateChangedSubscription();
  }

  private async credentialStateChangedSubscription(): Promise<void> {
    this.hidSdkManager().taskExecutionObs$.subscribe(endpointStatus => {
      if (endpointStatus == EndpointStatuses.SETUP_ACTIVE) {
        this.mCredential.setStatus(MobileCredentialStatuses.PROVISIONED);
        this.credentialStateChangeListener.onCredentialStateChanged();
        this.credentialService.updateCachedCredential$();
      } else if (endpointStatus == EndpointStatuses.SETUP_INACTIVE) {
        const time2Update = 200000;
        setTimeout(() => {
          this.hidSdkManager().doPostInitWork();
        }, time2Update); // start again in 3. minutes.
      }
    });
  }

  async onWillLogout(): Promise<void> {
    this.hidSdkManager().stopTaskExecution();
    if (this.mCredential.isProvisioned()) {
      const endpointInfo = await this.credentialService.getEndpointStateInfo$();
      setTimeout(() => {
        if (endpointInfo && endpointInfo.id) {
          this.credentialService.saveCredentialInLocalStorage(endpointInfo);
        }
      }, 3000);
    }
  }

  onUiIconClicked(): void {
    this.showLoading();
    const showCredentialUsageContentString = async () => {
      const btnText = this.mCredential.isProvisioned() ? 'Uninstall' : 'OK';
      const componentProps = {
        usageInstructions: await this.credentialUsageContentString$(),
        title: 'Usage Instructions',
        btnText: btnText,
      };
      const popover = await this.popoverCtrl.create({
        backdropDismiss: false,
        cssClass: 'credential-usage-popover',
        component: MobileCredentialsComponent,
        componentProps,
      });
      this.loadingService.closeSpinner();
      await popover.present();
      const { data } = await popover.onDidDismiss();
      const shouldUninstall = data.action == 'Uninstall';
      if (shouldUninstall) {
        this.showConfirmUninstallDialog();
      }
    };
    showCredentialUsageContentString();
  }

  onUiImageClicked(event = { shouldCheckCredentialAvailability: true }): void {
    const showTermsAndConditions = async () => {
      let componentProps = {
        termsAndConditions: await this.termsAndConditionsSource$,
      };
      const modal = await this.modalCtrl.create({
        backdropDismiss: false,
        component: MobileCredentialsComponent,
        componentProps,
      });
      this.showLoading();
      await modal.present();
      this.loadingService.closeSpinner();
      const { data } = await modal.onDidDismiss();
      if (data.termsAccepted) {
        this.onTermsAndConditionsAccepted();
      }
    };
    const checkCredentialAvailability = async () => {
      const freshCredentials = await this.checkCredentialAvailability();
      if (freshCredentials.isAvailable()) {
        showTermsAndConditions();
      } else if (freshCredentials.isProvisioned()) {
        this.showCredentialAlreadyProvisionedAlert();
      } else {
        this.showInstallationErrorAlert();
      }
    };

    if (event.shouldCheckCredentialAvailability) {
      checkCredentialAvailability();
    } else {
      showTermsAndConditions();
    }
  }

  private async showCredentialAlreadyProvisionedAlert(): Promise<void> {
    // notify user he needs to uninstall from previous device first.
    let header = 'Notification';
    let message =
      'We have detected that you provisioned a mobile credential but it is not on this device. You may have uninstalled GET Mobile, or it is on another device ? Would you like to install your mobile credential on this phone ? Note that if you have installed it on another device, it will be revoked.';
    const buttons = [
      { text: 'cancel', role: 'cancel' },
      {
        text: 'Accept and Install',
        handler: async () => {
          const deleteSuccessfull = await this.handRetriableOperation({
            fn: this.deleteCredentialFromServer$,
            showLoading: true,
          });
          if (deleteSuccessfull) {
            const freshCredentials = await this.checkCredentialAvailability();
            if (freshCredentials.isAvailable()) {
              this.onUiImageClicked({ shouldCheckCredentialAvailability: false });
            } else {
              this.showInstallationErrorAlert();
            }
          } else {
            this.showInstallationErrorAlert();
          }
        },
      },
    ];
    this.createAlertDialog(header, message, buttons).then(alert => alert.present());
  }

  private async showCredentialAlreadyInstalledAlert(): Promise<void> {
    // notify user he needs to uninstall from previous device first.
    let header = 'Notification';
    let message =
      'We have detected that there is an active mobile credential installed on this device. if you proceed with this installation, any previously installed mobile credential will be revoked.';
    const buttons = [
      { text: 'cancel', role: 'cancel' },
      {
        text: 'Accept and Install',
        handler: async () => {
          await this.handRetriableOperation({ fn: this.deleteCredentialFromServer$, showLoading: true, retryCount: 6 });
          const credentialDeviceDeleteSuccess = await this.handRetriableOperation({
            fn: this.deleteCredentialFromDevice$,
            showLoading: true,
          });

          if (credentialDeviceDeleteSuccess) {
            this.onTermsAndConditionsAccepted();
          } else {
            this.showInstallationErrorAlert();
          }
        },
      },
    ];
    this.createAlertDialog(header, message, buttons).then(alert => alert.present());
  }

  // is considered revoked when it was active at some point but now is not.
  private async isEndpointRevoked(): Promise<boolean> {
    const endpointStateInfo = await this.credentialService.getEndpointStateInfo$();
    const endpointHidStatus = await this.hidSdkManager().endpointStatus();
    return (
      endpointStateInfo && endpointStateInfo.endpointStatus && endpointHidStatus == EndpointStatuses.SETUP_INACTIVE
    );
  }

  private async onEndpointRevoked(timeToUpdate: number = 60000): Promise<void> {
    // change ui message here.. and refresh.
    this.mCredential.setStatus(MobileCredentialStatuses.REVOKED);
    setTimeout(async () => {
      let credentialDeleteOnServerSuccess = await this.handRetriableOperation({
        fn: this.deleteCredentialFromServer$,
        retryCount: 6,
        showLoading: false,
      });
      if (credentialDeleteOnServerSuccess) {
        await this.hidSdkManager().deleteEndpoint();
        this.mCredential = await this.checkCredentialAvailability(false);
        this.credentialStateChangeListener.onCredentialStateChanged();
      } else {
        // try it again sometimes later.
      }
    }, timeToUpdate);
  }

  refresh(): void {
    // we'll check if mobile keys hasn't been revoked, if true, should refresh accordingly.
    const asyncRefresh = async () => {
      if (this.mCredential.isProvisioned()) {
        if (await this.isEndpointRevoked()) {
            await this.onEndpointRevoked();
            this.credentialStateChangeListener.onCredentialStateChanged();
        }
      }
    };
    asyncRefresh();
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
        }),
        catchError(() => 'No content')
      )
      .toPromise();
  }

  private async createAlertDialog(header: string, msg: string, buttons: Array<any>): Promise<HTMLIonAlertElement> {
    return await this.alertCtrl.create({
      cssClass: 'alert-dialog',
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

  private async provisionedOnCurrentDevice$(): Promise<boolean> {
    const deviceEndpointStatus = await this.hidSdkManager().endpointStatus();
    const deviceEndpointActive = deviceEndpointStatus == EndpointStatuses.SETUP_ACTIVE;
    const deviceEndpointSetup = deviceEndpointStatus == EndpointStatuses.SETUP_INACTIVE;
    if (deviceEndpointActive) {
      this.hidSdkManager().doPostInitWork();
    } else if (deviceEndpointSetup) {
      const endpointStateCaches: any = (await this.credentialService.getEndpointStateInfo$()) || {};
      if (endpointStateCaches.endpointStatus == EndpointStatuses.SETUP_ACTIVE) {
        if (await this.isEndpointRevoked()) {
          this.onEndpointRevoked();
        }
      } else if (endpointStateCaches.endpointStatus == EndpointStatuses.SETUP_INACTIVE) {
        this.hidSdkManager().doPostInitWork();
      }
    }
    return deviceEndpointActive || deviceEndpointSetup;
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
          return from(this.provisionedOnCurrentDevice$()).pipe(
            first(),
            map(provisionedOnThisDevice => {
              if (!provisionedOnThisDevice) {
                this.mCredential.setStatus(MobileCredentialStatuses.AVAILABLE);
              }
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
      .pipe(first())
      .toPromise();
  };

  private doNativeInstall$ = async (): Promise<boolean> => {
    return await this.hidSdkManager()
      .setupEndpoint((this.mCredential as HIDCredential).getInvitationCode())
      .then(transactionResult => {
        const transactionSucceeded = transactionResult == HIDSdkManager.TRANSACTION_SUCCESS;
        this.endpointAlreadyInstalledFlag = transactionResult == HIDSdkManager.KEY_ALREADY_INSTALLED;
        if (transactionSucceeded) {
          return transactionSucceeded;
        }
        throw new Error(transactionResult);
      });
  };

  private async installCredentialOnDevice(): Promise<void> {
    const credentialDeviceInstallSuccess = await this.handRetriableOperation({
      fn: this.doNativeInstall$,
      showLoading: false,
      checkErrors: true,
      userDecides: true,
    });

    if (credentialDeviceInstallSuccess) {
      this.mCredential.setStatus(MobileCredentialStatuses.PROVISIONED);
      const credentialServerUpdateSuccess = await this.handRetriableOperation({
        fn: this.updateCredentialOnServer$,
        showLoading: false,
      });

      if (credentialServerUpdateSuccess) {
        delete this.mCredential.credentialBundle.invitationCode;
        this.mCredential.setStatus(MobileCredentialStatuses.PROCESSING); // You want to show to user that it processing, HID normally takes a while to be active.
        this.credentialStateChangeListener.onCredentialStateChanged();
        this.hidSdkManager().doPostInstallWork();
      } else {
        this.showInstallationErrorAlert();
        this.deleteCredentialFromDevice$();
        this.handRetriableOperation({
          fn: this.deleteCredentialFromServer$,
          retryCount: 6,
          showLoading: false,
        });
      }
      this.loadingService.closeSpinner();
    } else {
      this.loadingService.closeSpinner();
      if (this.endpointAlreadyInstalledFlag) {
        this.showCredentialAlreadyInstalledAlert();
        this.endpointAlreadyInstalledFlag = false;
      } else {
        this.showInstallationErrorAlert();
      }
    }
  }

  private canRetry(retryCount: number, error?: string): boolean {
    const anotherRetryAllowed = retryCount > 0; // this.transactionRetryCount <= this.transactionMaxRetryCount;
    if (anotherRetryAllowed) {
      if (error && !this.shouldRetryBecauseOfError(error)) {
        return false;
      }
      return anotherRetryAllowed;
    }
    return false;
  }

  private async handRetriableOperation(params: ExecutionParameters): Promise<boolean> {
    const options = {
      fn: params.fn,
      retryCount: params.retryCount || 4,
      showLoading: params.showLoading || false,
      checkErrors: params.checkErrors || false,
      userDecides: params.userDecides || false,
    };

    if (options.showLoading) {
      this.showLoading();
    }
    const operationResult = await this.handleRetry(options).catch(() => false);

    if (options.showLoading) {
      this.loadingService.closeSpinner();
    }
    return operationResult;
  }

  private async handleRetry(options: ExecutionParameters): Promise<boolean> {
    let error = null;
    let retryNum = options.retryCount;
    const weCareAboutErrorTypes = options.checkErrors;
    const userShouldDecideRetrying = options.userDecides;
    const fn = options.fn;
    while (this.canRetry(retryNum, error)) {
      retryNum--;
      try {
        if (await fn()) {
          return true;
        }
      } catch (exception) {
        let canStillRetry = retryNum > 0;
        if (weCareAboutErrorTypes) {
          error = exception.message;
          if (canStillRetry && userShouldDecideRetrying && this.shouldRetryBecauseOfError(exception.message)) {
            this.loadingService.closeSpinner();
            const userWantsRetry = await this.showRetryToast();
            if (userWantsRetry) {
              this.showLoading();
            } else {
              break;
            }
          }
        } else if (userShouldDecideRetrying && canStillRetry) {
          this.loadingService.closeSpinner();
          const userWantsRetry = await this.showRetryToast();
          if (userWantsRetry) {
            this.showLoading();
          } else {
            break;
          }
        }
      }
    }
    return false;
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

  private shouldRetryBecauseOfError(error: string): boolean {
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

  private async showInstallationErrorAlert(operation = 'installation'): Promise<void> {
    const header = 'Unexpected error';
    const message = `An unexpected error occurred during mobile ID ${operation}, please try again later.`;
    const buttons = [{ text: 'OK', role: 'cancel' }];
    const alertDialog = await this.createAlertDialog(header, message, buttons);
    await alertDialog.present();
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
      this.mCredential.setStatus(MobileCredentialStatuses.AVAILABLE);
      this.credentialStateChangeListener.onCredentialStateChanged();
      return true;
    }
    throw new Error(transactionResultCode);
  };

  private async onDeleteConfirmed(): Promise<void> {
    this.showLoading();
    let credentialDeleteOnServerSuccess = await this.handRetriableOperation({
      fn: this.deleteCredentialFromServer$,
      showLoading: false,
    });
    let credentialDeleteOnDeviceSuccess = false;
    if (credentialDeleteOnServerSuccess) {
      credentialDeleteOnDeviceSuccess = await this.handRetriableOperation({
        fn: this.deleteCredentialFromDevice$,
        showLoading: false,
      });
    }
    if (!credentialDeleteOnDeviceSuccess) {
      this.showInstallationErrorAlert('uninstall');
    }
    this.loadingService.closeSpinner();
  }

  private hidSdkManager(): HIDSdkManager {
    return HIDSdkManager.getInstance();
  }

  get termsAndConditionsSource$(): Promise<string> {
    const termsNConditionsConfig = {
      domain: CONTENT_STRINGS_DOMAINS.patronUi,
      category: CONTENT_STRINGS_CATEGORIES.mobileCredential,
      name: 'terms',
    };
    return this.credentialService
      .contentString$(termsNConditionsConfig)
      .pipe(catchError(() => 'No content'))
      .toPromise();
  }
}
