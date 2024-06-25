/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadingService } from '@core/service/loading/loading.service';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { MobileCredentialsComponent } from '@shared/ui-components/mobile-credentials/mobile-credentials.component';
import { from, Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { EndpointStatuses, MobileCredentialStatuses } from '../../shared/credential-state';
import { AbstractAndroidCredentialManager } from '../abstract-android-credential.management';
import { EndpointState, HIDCredential, HidCredentialBundle } from '../android-credential.model';
import { HidCredentialDataService } from '../../../service/hid-credential.data.service';
import { Injectable } from '@angular/core';
import { HIDPlugginProxy, HID_SDK_ERR } from './hid-plugin.proxy';

interface ExecutionParameters {
  fn: (args?: any) => Promise<boolean>;
  retryCount?: number;
  showLoading?: boolean;
  checkErrors?: boolean;
  userDecides?: boolean;
  args?: any;
  onErrors?: (args?: any) => Promise<boolean>;
}

@Injectable({ providedIn: 'root' })
export class HIDCredentialManager extends AbstractAndroidCredentialManager {
  private hidSdkErrorMessage: HID_SDK_ERR = null;

  constructor(
    private readonly modalCtrl: ModalController,
    protected readonly alertCtrl: AlertController,
    private readonly popoverCtrl: PopoverController,
    private readonly toastService: ToastController,
    protected readonly loadingService: LoadingService,
    protected readonly credentialService: HidCredentialDataService
  ) {
    super(loadingService, credentialService, alertCtrl);
    this.credentialStateChangedSubscription();
  }

  private async credentialStateChangedSubscription(): Promise<void> {
    this.hidSdkManager().taskExecutionObs$.subscribe(endpointStatus => {
      if (endpointStatus == EndpointStatuses.PROVISIONED_ACTIVE) {
        this.mCredential.setStatus(MobileCredentialStatuses.PROVISIONED);
        this.onCredentialStateChanged();
        this.credentialService.updateCachedCredential$(EndpointStatuses.PROVISIONED_ACTIVE);
      } else if (endpointStatus == EndpointStatuses.PROVISIONED_INACTIVE) {
        const time2Update = 300000;
        setTimeout(() => this.hidSdkManager().doPostInitWork(), time2Update); // start again in 5. minutes.
      }
    });
  }

  async onWillLogout(): Promise<void> {
    super.onWillLogout();
    this.hidSdkManager().stopTaskExecution();
  }

  onUiIconClicked(): void {
    const showUsageDialog = async () => {
      const _mc = this.mCredential;
      const usageString = (await this.contentStringAsync()).usageDialogString$;
      const isProvisioned = _mc.isProvisioned() || _mc.isProcessing() || _mc.revoked();
      const buttonText = isProvisioned ? usageString.uninstall : usageString.ok;
      const popover = await this.popoverCtrl.create({
        backdropDismiss: false,
        cssClass: 'credential-usage-popover',
        component: MobileCredentialsComponent,
        componentProps: {
          buttonText,
          usageText: usageString.mContent,
          title: usageString.title,
        },
      });
      await popover.present();
      const { data } = await popover.onDidDismiss();
      const shouldUninstall = data?.action == usageString.uninstall;
      if (shouldUninstall) {
        this.showConfirmUninstallDialog();
      }
    };
    showUsageDialog();
  }

  private async showTermsAndConditions(forceInstall?: boolean): Promise<void> {
    const terms = (await this.contentStringAsync()).termString$;
    const modal = await this.modalCtrl.create({
      backdropDismiss: false,
      component: MobileCredentialsComponent,
      componentProps: { terms },
    });
    this.showLoading();
    await modal.present();
    this.loadingService.closeSpinner();
    const { data } = await modal.onDidDismiss();
    if (data.termsAccepted) {
      this.onTermsAndConditionsAccepted(forceInstall);
    }
  }

  private async validateAndInstall(): Promise<void> {
    this.showLoading();
    const credential = await this.fetchFromServer$(true, true);
    if (credential == null) {
      this.showInstallationErrorAlert();
      throw new Error('Failed to retrieve passes');
    }
    const deviceEndpointActive =
      (await this.getDeviceEndpointState()).isProvisioned() ||
      (await this.getLocalCachedEndpointState(true)).isProvisioned() ||
      (await this.getLocalCachedEndpointState(true)).isProcessing() ||
      (await this.getLocalCachedEndpointState(true)).isRevoked();

    if (deviceEndpointActive) {
      this.showCredentialAlreadyInstalledAlert(async () => {
        // user agrees to delete previous user's active Mobile ID.
        await this.handleRetriableOperation({
          fn: this.deleteCredentialFromServer$,
          retryCount: 6,
          showLoading: true,
          args: await this.credentialService.getEndpointStateFromLocalCache(true),
        });

        this.handleRetriableOperation({ fn: this.deleteCredentialFromDevice$ });

        if (credential.isAvailable()) {
          this.showTermsAndConditions(true);
        } else if (credential.isProvisioned()) {
          this.showCredentialAlreadyProvisionedAlert(async () => {
            const deleteSuccessfull = await this.handleRetriableOperation({
              fn: this.deleteCredentialFromServer$,
              showLoading: true,
              onErrors: this.doCheckCredentialAvailability,
            });
            if (deleteSuccessfull) {
              if (await this.checkCredentialAvailability()) {
                this.showTermsAndConditions(true);
              } else {
                this.showInstallationErrorAlert();
              }
            } else {
              this.showInstallationErrorAlert();
            }
          });
        }
      });
    } else if (credential.isProvisioned()) {
      this.showCredentialAlreadyProvisionedAlert();
    } else if (credential.isAvailable()) {
      this.showTermsAndConditions();
    } else {
      this.showInstallationErrorAlert();
    }
  }

  onUiImageClicked(event = { shouldCheckCredentialAvailability: true }): void {
    if (event.shouldCheckCredentialAvailability) {
      (async () => {
        if (await this.nfcIsOn()) {
          this.validateAndInstall();
        } else {
          this.showLoading();
          const contents = await this.contentStringAsync();
          this.nfcOffAlert(contents.nfcDialogString$, async () => {
            this.validateAndInstall();
          });
        }
      })();
    } else {
      this.showTermsAndConditions();
    }
  }

  private doCheckCredentialAvailability = async (): Promise<boolean> => {
    const credentialAvailable = await this.checkCredentialAvailability(false);
    if (credentialAvailable) {
      this.credentialService.deleteAllCachedEndpoint$();
    }
    return credentialAvailable;
  };

  private async showCredentialAlreadyProvisionedAlert(callerOnAcceptHandler?: () => Promise<void>): Promise<void> {
    // notify user he needs to uninstall from previous device first.
    const string$ = (await this.contentStringAsync()).alreadyProvisionedDialogString$;
    const header = string$.title;
    const message = string$.mContent;

    const defaultOnAcceptHandler = async () => {
      const deleteSuccessfull = await this.handleRetriableOperation({
        fn: this.deleteCredentialFromServer$,
        showLoading: true,
        onErrors: this.doCheckCredentialAvailability,
      });
      if (deleteSuccessfull) {
        if (await this.checkCredentialAvailability(false)) {
          this.onUiImageClicked({ shouldCheckCredentialAvailability: false });
        } else {
          // user already accepted to delete, so make sure if he tries to delete again, don't ask to confirm again.
          this.showInstallationErrorAlert();
        }
      } else {
        // user already accepted to delete, so make sure if he tries to delete again, don't ask to confirm again.
        this.showInstallationErrorAlert();
      }
    };
    const actualOnAcceptHandler = async () => {
      this.credentialService.updateCachedCredential$(EndpointStatuses.DELETE_CONFIRMED);
      if (callerOnAcceptHandler) await callerOnAcceptHandler();
      else await defaultOnAcceptHandler();
    };

    const buttons = [
      { text: string$.cancel, role: 'cancel' },
      {
        text: string$.acceptInstall,
        handler: actualOnAcceptHandler,
      },
    ];
    const state = await this.getLocalCachedEndpointState();
    if (state.deletionPermissionGranted()) {
      await actualOnAcceptHandler();
    } else {
      await this.loadingService.closeSpinner();
      const alert = await this.createAlertDialog(header, message, buttons);
      alert.present();
    }
  }

  private async showCredentialAlreadyInstalledAlert(callerOnAcceptHandler?: () => Promise<any>): Promise<void> {
    // notify user he needs to uninstall from previous device first.
    const string$ = (await this.contentStringAsync()).alreadyInstalledDialogString$;
    const header = string$.title;
    const message = string$.mContent;
    const defaultOnAcceptHandler = async () => {
      this.showLoading();
      await this.handleRetriableOperation({
        fn: this.deleteCredentialFromServer$,
        retryCount: 6,
        onErrors: this.doCheckCredentialAvailability,
      });
      const credentialDeviceDeleteSuccess = await this.handleRetriableOperation({
        fn: this.deleteCredentialFromDevice$,
      });
      this.loadingService.closeSpinner();
      if (credentialDeviceDeleteSuccess) {
        this.onTermsAndConditionsAccepted();
      } else {
        this.showInstallationErrorAlert();
      }
    };

    const actualOnAcceptHandler = async () => {
      this.credentialService.updateCachedCredential$(EndpointStatuses.DELETE_CONFIRMED);
      if (callerOnAcceptHandler) await callerOnAcceptHandler();
      else await defaultOnAcceptHandler();
    };

    const buttons = [
      { text: string$.cancel, role: 'cancel' },
      {
        text: string$.acceptInstall,
        handler: actualOnAcceptHandler,
      },
    ];

    const state = await this.getLocalCachedEndpointState();
    await this.loadingService.closeSpinner();
    if (state.deletionPermissionGranted()) {
      await actualOnAcceptHandler();
    } else {
      const alert = await this.createAlertDialog(header, message, buttons);
      alert.present();
    }
  }

  private async isEndpointRevoked(): Promise<boolean> {
    const savedEndpointState = await this.getLocalCachedEndpointState();
    const deviceEndpointStatus = await this.getDeviceEndpointState();
    return savedEndpointState.isRevoked() || (savedEndpointState.isProvisioned() && deviceEndpointStatus.isInactive());
  }

  private setCredentialRevoked(): void {
    this.mCredential.setStatus(MobileCredentialStatuses.REVOKED);
    this.credentialService.updateCachedCredential$(EndpointStatuses.REVOKED);
  }

  private async onEndpointRevoked(timeToUpdate = 60000): Promise<void> {
    this.setCredentialRevoked();
    let counter = 0;
    const maxRefreshAttempt = 11;
    const deleteEndpoint = async (isLastTry?: boolean) => {
      await this.handleRetriableOperation({
        fn: this.deleteCredentialFromServer$,
        onErrors: this.doCheckCredentialAvailability,
      });
      const newCredential = await this.fetchFromServer$(true);
      const updateSuccess = !newCredential.revoked() && !newCredential.isProvisioned();
      if (updateSuccess) {
        this.mCredential = newCredential;
        this.hidSdkManager().deleteEndpoint();
        this.onCredentialStateChanged();
      }
      if (isLastTry && !updateSuccess) {
        this.mCredential.setStatus(MobileCredentialStatuses.AVAILABLE);
        this.hidSdkManager().deleteEndpoint();
        this.onCredentialStateChanged();
      }
      return updateSuccess;
    };
    const intervalId = setInterval(async () => {
      if (counter++ == maxRefreshAttempt || (await deleteEndpoint())) {
        clearInterval(intervalId);
      } else if (counter == maxRefreshAttempt - 1) {
        deleteEndpoint(true);
        clearInterval(intervalId);
      }
    }, timeToUpdate);
  }

  refresh(): void {
    const asyncRefresh = async () => {
      if (this.mCredential.isProvisioned()) {
        if (await this.isEndpointRevoked()) {
          await this.onEndpointRevoked();
          this.onCredentialStateChanged();
        }
      }
    };
    asyncRefresh();
  }

  private async showConfirmUninstallDialog(): Promise<void> {
    const string$ = (await this.contentStringAsync()).confirmDialogString$;

    const header = string$.title;
    const message = string$.mContent;
    const buttons = [
      { text: string$.cancel, role: 'cancel' },
      {
        text: string$.confirm,
        handler: () => {
          this.alertCtrl.dismiss();
          this.onDeleteConfirmed();
        },
      },
    ];
    const alertIonAlert = await this.createAlertDialog(header, message, buttons);
    alertIonAlert.present();
  }

  credentialAvailable$(): Observable<boolean> {
    return of(this.mCredential.isAvailable());
  }

  private async getDeviceEndpointState(): Promise<EndpointState> {
    return new EndpointState(await this.hidSdkManager().endpointStatus());
  }

  private async getLocalCachedEndpointState(anyUser?: boolean): Promise<EndpointState> {
    const endpointState = await this.credentialService.getEndpointStateFromLocalCache(anyUser);
    return endpointState || new EndpointState(EndpointStatuses.NOT_SETUP);
  }

  private async checkDeviceEndpointState$(): Promise<boolean> {
    const deviceEndpointState = await this.getDeviceEndpointState();
    const cachedEndpointState = await this.getLocalCachedEndpointState();
    if (deviceEndpointState.isProvisioned()) {
      if (cachedEndpointState.isProvisioned()) {
        this.hidSdkManager().doPostInitWork();
      } else if (cachedEndpointState.isProcessing()) {
        this.mCredential.setStatus(MobileCredentialStatuses.PROCESSING);
        this.hidSdkManager().doPostInitWork();
      } else {
        this.mCredential.setStatus(MobileCredentialStatuses.AVAILABLE);
      }
    } else if (deviceEndpointState.isInactive()) {
      if (await this.isEndpointRevoked()) {
        await this.onEndpointRevoked();
      } else if (cachedEndpointState.isProcessing()) {
        this.mCredential.setStatus(MobileCredentialStatuses.PROCESSING);
        this.hidSdkManager().doPostInitWork();
      } else {
        this.mCredential.setStatus(MobileCredentialStatuses.AVAILABLE);
      }
    } else {
      this.mCredential.setStatus(MobileCredentialStatuses.AVAILABLE);
    }
    return true;
  }

  credentialEnabled$(): Observable<boolean> {
    const credentialEnabled$ = of(this.mCredential.isEnabled()).pipe(
      switchMap(async enabled => {
        if (enabled) {
          return await this.hidSdkManager().initializeSdk();
        } else {
          return false;
        }
      })
    );
    return credentialEnabled$.pipe(
      switchMap(enabled => {
        if (this.mCredential.isProvisioned()) {
          return from(this.checkDeviceEndpointState$()).pipe(map(() => true));
        } else {
          if (enabled) {
            this.hidSdkManager().refreshEndpoint();
          }
          return of(enabled);
        }
      })
    );
  }

  private getCredentialBundle$(): Promise<HidCredentialBundle> {
    return of(this.mCredential)
      .pipe(
        map((currentCredential: HIDCredential) => {
          return currentCredential.getInvitationCode() ? true : false;
        }),
        switchMap(invitationCodeValid => {
          if (invitationCodeValid) {
            return of(this.mCredential.getCredentialBundle() as HidCredentialBundle);
          } else {
            return this.credentialService.androidCredentialBundle$(this.mCredential.getReferenceIdentifier());
          }
        })
      )
      .toPromise();
  }

  private onTermsAndConditionsAccepted(forceInstall = false): void {
    this.showLoading();
    this.getCredentialBundle$()
      .then(credentialBundle => {
        this.mCredential.setCredentialBundle(credentialBundle);
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

  private doNativeInstall$ = async (forceInstall = false): Promise<boolean> => {
    const params = { forceInstall, invitationCode: (this.mCredential as HIDCredential).getInvitationCode() };
    return await this.hidSdkManager()
      .setupEndpoint(params)
      .catch(({ message }) => {
        this.hidSdkErrorMessage = message;
        throw new Error(message);
      });
  };

  private async installCredentialOnDevice(forceInstall = false): Promise<void> {
    const credentialDeviceInstallSuccess = await this.handleRetriableOperation({
      fn: this.doNativeInstall$,
      checkErrors: true,
      userDecides: true,
      args: forceInstall,
    });
    if (credentialDeviceInstallSuccess) {
      this.mCredential.setStatus(MobileCredentialStatuses.PROCESSING); // You want to show to user that it processing, HID normally takes a while to be active.
      const credentialServerUpdateSuccess = await this.handleRetriableOperation({
        fn: this.updateCredentialOnServer$,
        onErrors: async () => (await this.fetchFromServer$(true)).isProvisioned(),
      });
      if (credentialServerUpdateSuccess) {
        delete (<HidCredentialBundle> this.mCredential.credentialBundle).invitationCode;
        this.onCredentialStateChanged();
        setTimeout(() => this.hidSdkManager().doPostInstallWork(), 1000);
      } else {
        this.showInstallationErrorAlert();
        this.deleteCredentialFromDevice$();
      }
      this.loadingService.closeSpinner();
    } else {
      this.loadingService.closeSpinner();
      if (this.hidSdkErrorMessage == HID_SDK_ERR.KEY_ALREADY_INSTALLED) {
        this.showCredentialAlreadyInstalledAlert();
      } else if (this.hidSdkErrorMessage == HID_SDK_ERR.INVALID_INVITATION_CODE) {
        delete this.mCredential.credentialBundle;
        this.showInstallationErrorAlert();
      } else if (this.hidSdkErrorMessage == HID_SDK_ERR.TRANSACTION_FAILED_INVALID_KEY) {
        this.showInstallationErrorAlert(this.hidSdkErrorMessage);
      } else {
        this.showInstallationErrorAlert();
      }
      this.hidSdkErrorMessage = null;
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
    params.retryCount = params.retryCount || 4;
    if (params.showLoading) {
      this.showLoading();
    }
    const operationResult = await this.handleRetry(params).catch(() => false);
    if (params.showLoading) {
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
    const errorHandler = options.onErrors;

    while (this.canRetry(retryCount)) {
      retryCount--;
      try {
        if (await fn(args)) {
          return true;
        }
      } catch (exception) {
        if (errorHandler) {
          const success = await errorHandler(args);
          if (success) {
            return true;
          }
        }
        if (shouldCheckErrorTypes && this.shouldRetryBecauseOfError(exception.message)) {
          if (userShouldChoose) {
            this.loadingService.closeSpinner();
            const userWants2Retry = await this.showRetryToast();
            if (userWants2Retry) {
              this.showLoading();
            } else {
              break;
            }
          }
        }
      }
    }
    return false;
  }

  private async showRetryToast(): Promise<boolean> {
    const string$ = await this.contentStringAsync();
    const myToast = await this.toastService.create({
      message: string$.installError,
      duration: 15000,
      position: 'bottom',
      buttons: [
        {
          text: string$.retry,
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
      case HID_SDK_ERR.INTERNAL_ERROR:
      case HID_SDK_ERR.SERVER_UNREACHABLE:
      case HID_SDK_ERR.SDK_BUSY:
        shouldRetry = true;
        break;
      case HID_SDK_ERR.INVALID_INVITATION_CODE:
      case HID_SDK_ERR.DEVICE_SETUP_FAILED:
      case HID_SDK_ERR.SDK_INCOMPATIBLE:
      case HID_SDK_ERR.DEVICE_NOT_ELIGIBLE:
      case HID_SDK_ERR.ENDPOINT_NOT_SETUP:
      default:
        break;
    }
    return shouldRetry;
  }

  private deleteCredentialFromServer$ = async (endpoint?: EndpointState): Promise<boolean> => {
    return await this.credentialService
      .deleteCredential$(endpoint)
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
    const transactionResultCode = await this.hidSdkManager().deleteEndpoint();
    if (transactionResultCode == HID_SDK_ERR.TRANSACTION_SUCCESS) {
      this.mCredential.setStatus(MobileCredentialStatuses.AVAILABLE);
      this.onCredentialStateChanged();
      return true;
    }
    throw new Error(transactionResultCode);
  };

  private async onDeleteConfirmed(): Promise<void> {
    this.showLoading();
    const credentialDeleteOnServerSuccess = await this.handleRetriableOperation({
      fn: this.deleteCredentialFromServer$,
      onErrors: this.doCheckCredentialAvailability,
    });
    let credentialDeleteOnDeviceSuccess = false;
    if (credentialDeleteOnServerSuccess) {
      credentialDeleteOnDeviceSuccess = await this.handleRetriableOperation({
        fn: this.deleteCredentialFromDevice$,
        showLoading: false,
      });
    }
    if (!credentialDeleteOnDeviceSuccess) {
      this.showInstallationErrorAlert();
    }
    this.loadingService.closeSpinner();
  }

  private hidSdkManager(): HIDPlugginProxy {
    return HIDPlugginProxy.getInstance();
  }
}
