import { LoadingService } from '@core/service/loading/loading.service';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { MobileCredentialsComponent } from '@shared/ui-components/mobile-credentials/mobile-credentials.component';
import { from, Observable, of } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { MobileCredentialStatuses } from '../../shared/credential-state';
import { AbstractAndroidCredentialManager } from '../abstract-android-credential.management';
import { AndroidCredential, HIDCredential, Persistable } from '../android-credential.model';
import { HidCredentialDataService } from '../../../service/hid-credential.data.service';
import { EndpointStatuses, HIDSdkManager } from './hid-plugin.wrapper';
import { Injectable } from '@angular/core';

interface ExecutionParameters {
  fn: (args?: any) => Promise<boolean>;
  retryCount?: number;
  showLoading?: boolean;
  checkErrors?: boolean;
  userDecides?: boolean;
  args?: any;
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
    // this.hidSdkManager().stopTaskExecution();
    // if (this.mCredential.isProvisioned()) {
    //   const endpointInfo = await this.credentialService.getEndpointState$();
    //   setTimeout(() => {
    //     if (endpointInfo && endpointInfo.id) {
    //       this.credentialService.saveCredentialInLocalStorage(endpointInfo);
    //     }
    //   }, 3000);
    // }
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

  private async showTermsAndConditions(forceInstall?: boolean): Promise<void> {
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
      this.onTermsAndConditionsAccepted(forceInstall);
    }
  }

  private async verifyCredentialAvailable4Install(): Promise<void> {
    const credential = await this.fetchFromServer$(false, true);
    if (credential == null) {
      this.showInstallationErrorAlert();
      throw new Error('Failed to retrieve passes');
    }
    const deviceEndpointActive = (await this.getEndpointStatus()) == EndpointStatuses.SETUP_ACTIVE;
    if (credential.isAvailable()) {
      if (deviceEndpointActive) {
        this.showCredentialAlreadyInstalledAlert(async () => this.showTermsAndConditions(true));
      } else {
        this.showTermsAndConditions();
      }
    } else if (credential.isProvisioned()) {
      if (deviceEndpointActive) {
        this.showCredentialAlreadyInstalledAlert(async () => {
          this.showLoading();
          setTimeout(() => {
            this.showCredentialAlreadyProvisionedAlert(async () => {
              const deleteSuccessfull = await this.handleRetriableOperation({
                fn: this.deleteCredentialFromServer$,
                showLoading: true,
              });
              if (deleteSuccessfull) {
                this.handleRetriableOperation({ fn: this.deleteCredentialFromDevice$ });
                if (await this.checkCredentialAvailability()) {
                  this.showTermsAndConditions(true);
                } else {
                  this.showInstallationErrorAlert();
                }
              } else {
                this.showInstallationErrorAlert();
              }
            });
          }, 1000);
        });
      } else {
        this.showCredentialAlreadyProvisionedAlert();
      }
    } else {
      this.showInstallationErrorAlert();
    }
  }

  onUiImageClicked(event = { shouldCheckCredentialAvailability: true }): void {
    if (event.shouldCheckCredentialAvailability) {
      this.verifyCredentialAvailable4Install();
    } else {
      this.showTermsAndConditions();
    }
  }

  private async showCredentialAlreadyProvisionedAlert(callerHandler?: () => Promise<any>): Promise<void> {
    // notify user he needs to uninstall from previous device first.
    this.loadingService.closeSpinner();
    let header = 'Notification';
    let message =
      'We have detected that you already provisioned a mobile ID, but it is not on this device. You may have uninstalled GET Mobile, deleted the app cache data, or your mobile ID is still installed on another device. If you proceed with this new installation, any previously installed mobile ID will be revoked. Would you like to proceed ?';

    const defaultHandler = async () => {
      const deleteSuccessfull = await this.handleRetriableOperation({
        fn: this.deleteCredentialFromServer$,
        showLoading: true,
      });
      if (deleteSuccessfull) {
        if (await this.checkCredentialAvailability()) {
          this.onUiImageClicked({ shouldCheckCredentialAvailability: false });
        } else {
          this.showInstallationErrorAlert();
        }
      } else {
        this.showInstallationErrorAlert();
      }
    };
    const handler = callerHandler || defaultHandler;
    const buttons = [
      { text: 'cancel', role: 'cancel' },
      {
        text: 'Accept and Install',
        handler: handler,
      },
    ];
    this.createAlertDialog(header, message, buttons).then(alert => alert.present());
  }

  private async showCredentialAlreadyInstalledAlert(handlerCallback?: () => Promise<any>): Promise<void> {
    // notify user he needs to uninstall from previous device first.
    let header = 'Notification';
    let message =
      'We have detected there is an active mobile ID installed on this device. if you proceed with this new installation, any previously installed ID will be revoked.';
    const defaultHandler = async () => {
      await this.handleRetriableOperation({
        fn: this.deleteCredentialFromServer$,
        showLoading: true,
        retryCount: 6,
      });
      const credentialDeviceDeleteSuccess = await this.handleRetriableOperation({
        fn: this.deleteCredentialFromDevice$,
        showLoading: true,
      });

      if (credentialDeviceDeleteSuccess) {
        this.onTermsAndConditionsAccepted();
      } else {
        this.showInstallationErrorAlert();
      }
    };

    const buttons = [
      { text: 'cancel', role: 'cancel' },
      {
        text: 'Accept and Install',
        handler: handlerCallback || defaultHandler,
      },
    ];
    this.createAlertDialog(header, message, buttons).then(alert => alert.present());
  }

  // is considered revoked when it was active at some point but now is not.
  private async isEndpointRevoked(): Promise<boolean> {
    const savedEndpointState = await this.credentialService.getCachedEndpointState$();
    const deviceEndpointStatus = await this.getEndpointStatus();
    return (
      savedEndpointState.endpointStatus == EndpointStatuses.SETUP_ACTIVE &&
      deviceEndpointStatus == EndpointStatuses.SETUP_INACTIVE
    );
  }

  private async onEndpointRevoked(timeToUpdate: number = 60000): Promise<void> {
    // change ui message here.. and refresh.
    this.mCredential.setStatus(MobileCredentialStatuses.REVOKED);
    this.hidSdkManager().deleteEndpoint();
    let counter = 0;
    let maxRefreshAttempt = 11;
    const refresh = async (isLastTry?: boolean) => {
      await this.handleRetriableOperation({ fn: this.deleteCredentialFromServer$ });
      const newCredential = await this.fetchFromServer$(true);
      const updateSuccess = !newCredential.revoked();
      if (updateSuccess) {
        this.mCredential = newCredential;
        this.credentialStateChangeListener.onCredentialStateChanged();
      }
      if (isLastTry && !updateSuccess) {
        this.mCredential.setStatus(MobileCredentialStatuses.AVAILABLE);
        this.credentialStateChangeListener.onCredentialStateChanged();
      }
      return updateSuccess;
    };
    const intervalId = setInterval(async () => {
      if (counter++ == maxRefreshAttempt || (await refresh())) {
        clearInterval(intervalId);
      } else if (counter == maxRefreshAttempt - 1) {
        refresh(true);
        clearInterval(intervalId);
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

  private async getEndpointStatus(): Promise<EndpointStatuses> {
    let endpointStatus = await this.hidSdkManager().endpointStatus();
    if (endpointStatus == EndpointStatuses.SETUP_INACTIVE) {
      this.credentialService.updateCachedCredential$(EndpointStatuses.SETUP_INACTIVE);
    }
    return endpointStatus;
  }

  private async provisionedOnCurrentDevice$(): Promise<boolean> {
    const deviceEndpointStatus = await this.hidSdkManager().endpointStatus();
    const deviceEndpointActive = deviceEndpointStatus == EndpointStatuses.SETUP_ACTIVE;
    const deviceEndpointSetup = deviceEndpointStatus == EndpointStatuses.SETUP_INACTIVE;
    if (deviceEndpointActive) {
      const endpointState: Persistable = (await this.credentialService.getEndpointStateFromLocalCache()) || {};
      if (endpointState.endpointStatus == EndpointStatuses.SETUP_ACTIVE) {
        this.hidSdkManager().doPostInitWork();
      } else {
        // another user logged in to this device, he has provisioned credential on another device, but this device also has a credential provisioned. weird scenario.
        this.mCredential.setStatus(MobileCredentialStatuses.AVAILABLE);
      }
    } else if (deviceEndpointSetup) {
      const endpointState: Persistable = await this.credentialService.getCachedEndpointState$();
      if (endpointState.endpointStatus == EndpointStatuses.SETUP_ACTIVE) {
        if (await this.isEndpointRevoked()) {
          this.onEndpointRevoked();
        }
      } else if (endpointState.endpointStatus == EndpointStatuses.SETUP_INACTIVE) {
        this.mCredential.setStatus(MobileCredentialStatuses.PROCESSING);
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

  private onTermsAndConditionsAccepted(forceInstall: boolean = false): void {
    this.showLoading();
    this.getCredentialFromServer$()
      .then(newCredential => {
        this.mCredential = newCredential;
        this.installCredentialOnDevice(forceInstall);
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

  private doNativeInstall$ = async (forceInstall: boolean = false): Promise<boolean> => {
    const params = { forceInstall, invitationCode: (this.mCredential as HIDCredential).getInvitationCode() };
    return await this.hidSdkManager()
      .setupEndpoint(params)
      .then(transactionResult => {
        const transactionSucceeded = transactionResult == HIDSdkManager.TRANSACTION_SUCCESS;
        this.endpointAlreadyInstalledFlag = transactionResult == HIDSdkManager.KEY_ALREADY_INSTALLED;
        if (transactionSucceeded) {
          return transactionSucceeded;
        }
        throw new Error(transactionResult);
      });
  };

  private async installCredentialOnDevice(forceInstall: boolean = false): Promise<void> {
    const credentialDeviceInstallSuccess = await this.handleRetriableOperation({
      fn: this.doNativeInstall$,
      showLoading: false,
      checkErrors: true,
      userDecides: true,
      args: forceInstall,
    });

    if (credentialDeviceInstallSuccess) {
      this.mCredential.setStatus(MobileCredentialStatuses.PROVISIONED);
      const credentialServerUpdateSuccess = await this.handleRetriableOperation({
        fn: this.updateCredentialOnServer$,
        showLoading: false,
      });

      if (credentialServerUpdateSuccess) {
        delete this.mCredential.credentialBundle.invitationCode;
        this.mCredential.setStatus(MobileCredentialStatuses.PROCESSING); // You want to show to user that it processing, HID normally takes a while to be active.
        this.credentialStateChangeListener.onCredentialStateChanged();
        setTimeout(() => this.hidSdkManager().doPostInstallWork(), 15000);
      } else {
        this.showInstallationErrorAlert();
        this.deleteCredentialFromDevice$();
        this.handleRetriableOperation({
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
    const anotherRetryAllowed = retryCount > 0;
    if (anotherRetryAllowed) {
      if (error) {
        return this.shouldRetryBecauseOfError(error);
      }
      return anotherRetryAllowed;
    }
    return false;
  }

  private async handleRetriableOperation(params: ExecutionParameters): Promise<boolean> {
    const options = {
      fn: params.fn,
      retryCount: params.retryCount || 4,
      showLoading: params.showLoading || false,
      checkErrors: params.checkErrors || false,
      userDecides: params.userDecides || false,
      args: params.args,
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
    let retryCount = options.retryCount;
    const shouldCheckErrorTypes = options.checkErrors;
    const userShouldChoose = options.userDecides;
    const fn = options.fn;
    const args = options.args;
    while (this.canRetry(retryCount)) {
      retryCount--;
      try {
        if (await fn(args)) {
          return true;
        }
      } catch (exception) {
        if (shouldCheckErrorTypes && this.shouldRetryBecauseOfError(exception.message)) {
          if (userShouldChoose) {
            this.loadingService.closeSpinner();
            const userWantsRetry = await this.showRetryToast();
            if (userWantsRetry) {
              this.showLoading();
            } else {
              break;
            }
          }
        } else if (userShouldChoose) {
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

  private deleteCredentialFromDevice$ = async (force?: boolean): Promise<boolean> => {
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
    let credentialDeleteOnServerSuccess = await this.handleRetriableOperation({
      fn: this.deleteCredentialFromServer$,
      showLoading: false,
    });
    let credentialDeleteOnDeviceSuccess = false;
    if (credentialDeleteOnServerSuccess) {
      credentialDeleteOnDeviceSuccess = await this.handleRetriableOperation({
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
