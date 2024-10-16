/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadingService } from '@core/service/loading/loading.service';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { firstValueFrom, from, map, Observable, of, switchMap } from 'rxjs';
import { HidCredentialDataService } from '../../../service/hid-credential.data.service';
import { Injectable } from '@angular/core';
import { HID_SDK_ERR, HID_WALLET_SDK_ERR } from './hid-plugin.proxy';
import { EndpointStatuses, MobileCredentialStatuses } from '../../shared/credential-state';
import { AndroidCredential, EndpointState, HIDCredential, HidCredentialBundle } from '../android-credential.model';
import { MobileCredentialsComponent } from '@shared/ui-components/mobile-credentials/mobile-credentials.component';
import { HIDCredentialManager } from './hid-credential-manager';

@Injectable({ providedIn: 'root' })
export class HIDWalletCredentialManager extends HIDCredentialManager {
  customLoadingOptions = {
    message: this.defaultIsLoadingMessage,
    duration: 5000,
    backdropDismiss: true,
  };
  hidSdkErrorMessage: string;
  constructor(
    protected readonly modalCtrl: ModalController,
    protected readonly alertCtrl: AlertController,
    protected readonly popoverCtrl: PopoverController,
    protected readonly toastService: ToastController,
    protected readonly loadingService: LoadingService,
    protected readonly credentialService: HidCredentialDataService
  ) {
    super(alertCtrl, loadingService, credentialService);
    this.credentialStateChangedSubscription();
  }

  onUiIconClicked = () => Promise.reject();

  refresh = () => Promise.reject();
  
  async onWillLogout(): Promise<void> {
    await super.onWillLogout();
  }

  async onUiImageClicked(event = { shouldCheckCredentialAvailability: true }): Promise<void> {
    if (event.shouldCheckCredentialAvailability) {
      if (await this.nfcIsOn()) {
        await this.validateAndInstall();
      } else {
        const contents = await this.contentStringAsync();
        this.nfcOffAlert(contents.nfcDialogString$, async () => {
          await this.validateAndInstall();
        });
      }
    } else {
      await this.showTermsAndConditions();
    }
  }

  credentialAvailable$(): Observable<boolean> {
    return of(this.mCredential.isAvailable());
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
          return of(enabled);
        }
      })
    );
  }

  private async validateAndInstall(): Promise<void> {
    this.showLoading();
    const credential = await this.fetchFromServer$(true, true);
    this.loadingService.closeSpinner();
    if (credential == null) {
      this.showInstallationErrorAlert();
      return;
    }
    const deviceEndpointActive =                                           // Local state necessary?
      (await this.getDeviceEndpointState(true)).isProvisioned() ||
      (await this.getLocalCachedEndpointState(true)).isProvisioned() ||
      (await this.getLocalCachedEndpointState(true)).isProcessing() ||
      (await this.getLocalCachedEndpointState(true)).isRevoked();

    if (deviceEndpointActive) {
      await this.showCredentialAlreadyInstalledAlert(credential);
    } else if (credential.isProvisioned()) {
      await this.showCredentialAlreadyProvisionedAlert();
    } else if (credential.isAvailable() || credential.isCreated()) {
      await this.showTermsAndConditions();
    } else {
      await this.showInstallationErrorAlert();
    }
    this.loadingService.closeSpinner();
  }

  private async showCredentialAlreadyProvisionedAlert(callerOnAcceptHandler?: () => Promise<void>): Promise<void> {
    // notify user he needs to uninstall from previous device first.
    const string$ = (await this.contentStringAsync()).alreadyProvisionedDialogString$;
    const header = string$.title;
    const message = string$.mContent;

    const defaultOnAcceptHandler = async () => {
      const deleteSuccessfull = await this.deleteCredentialFromServer$();
      this.doCheckCredentialAvailability();

      if (deleteSuccessfull) {
        if (await this.checkCredentialAvailability(false)) {
          await this.onUiImageClicked({ shouldCheckCredentialAvailability: false });
        } else {
          // user already accepted to delete, so make sure if he tries to delete again, don't ask to confirm again.
          await this.showInstallationErrorAlert();
        }
      } else {
        // user already accepted to delete, so make sure if he tries to delete again, don't ask to confirm again.
        await this.showInstallationErrorAlert();
      }
    };
    const actualOnAcceptHandler = async () => {
      this.credentialService.updateCachedCredential$(EndpointStatuses.DELETE_CONFIRMED);
      if (callerOnAcceptHandler) await callerOnAcceptHandler();
      else await defaultOnAcceptHandler();
    };

    const state = await this.getLocalCachedEndpointState();
    if (state.deletionPermissionGranted()) {
      await actualOnAcceptHandler();
    } else {
      await this.loadingService.closeSpinner();
      const alert = await this.createAlertDialog(header, message, [
        { text: string$.cancel, role: 'cancel' },
        {
          text: string$.acceptInstall,
          handler: () => {
            actualOnAcceptHandler();
            alert.dismiss();
          },
        },
      ]);
      alert.present();
    }
  }

  private async showTermsAndConditions(): Promise<void> {
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
      this.onTermsAndConditionsAccepted();
    }
  }

  private async deleteCredentialFromServer$(endpoint?: EndpointState): Promise<boolean> {
    return await firstValueFrom(
      this.credentialService.deleteCredential$(endpoint).pipe(
        map(deletionSucceeded => {
          if (deletionSucceeded) {
            return deletionSucceeded;
          }
          return false;
        })
      )
    );
  };



  private async showCredentialAlreadyInstalledAlert(credential: AndroidCredential<any>): Promise<void> {
    // notify user he needs to uninstall from previous device first.
    const string$ = (await this.contentStringAsync()).alreadyInstalledDialogString$;
    const header = string$.title;
    const message = string$.mContent;
    const state = await this.getLocalCachedEndpointState();
    await this.loadingService.closeSpinner();
    if (state.deletionPermissionGranted()) {
      await this.onProvisioningAcceptedHandler(credential);
    } else {
      const alert = await this.createAlertDialog(header, message, [
        { text: string$.cancel, role: 'cancel' },
        {
          text: string$.acceptInstall,
          handler: () => {
            this.onProvisioningAcceptedHandler(credential);
            alert.dismiss();
          },
        },
      ]);
      alert.present();
    }
  }

  private async onProvisioningAcceptedHandler(credential: AndroidCredential<any>): Promise<void> {
    await this.credentialService.updateCachedCredential$(EndpointStatuses.DELETE_CONFIRMED)
    await this.deleteCredentialFromServer$();
    await this.credentialService.getEndpointStateFromLocalCache(true);
    await this.deleteCredentialFromDevice$();
    console.log('onProvisioningAcceptedHandler ', credential.isAvailable(),credential.isProvisioned() );
    if (credential.isAvailable()) {
      await this.showTermsAndConditions();
    } else if (credential.isProvisioned()) {
      await this.showCredentialAlreadyProvisionedAlert(this.handleDelete);
    }
  };
  
  private async handleDelete()  {
    const deleteSuccessfull = await this.deleteCredentialFromServer$();

    if (deleteSuccessfull) {
      if (await this.checkCredentialAvailability()) {
        await this.showTermsAndConditions();
      } else {
        await this.showInstallationErrorAlert();
      }
    } else {
      await this.showInstallationErrorAlert();
    }
  }

  private onTermsAndConditionsAccepted(): void {
    this.showLoading();
    this.getCredentialBundle$()
      .then(credentialBundle => {
        this.mCredential.setCredentialBundle(credentialBundle);
        this.installCredentialOnDevice();
      })
      .catch(() => {
        this.loadingService.closeSpinner();
        this.showInstallationErrorAlert();
      })
      .finally(async () => await this.loadingService.closeSpinner());
  }

  private async installCredentialOnDevice(): Promise<void> {
    console.log('installCredentialOnDevice');
    const credentialDeviceInstallSuccess = await this.doNativeInstall$();
    console.log('installCredentialOnDevice ', credentialDeviceInstallSuccess);
    if (credentialDeviceInstallSuccess) {
      this.mCredential.setStatus(MobileCredentialStatuses.PROVISIONED); // You want to show to user that it processing, HID normally takes a while to be active.
      const credentialServerUpdateSuccess = await this.updateCredentialOnServer$();
      console.log('credentialServerUpdateSuccess ', credentialServerUpdateSuccess);
      if (credentialServerUpdateSuccess) {
        delete (<HidCredentialBundle> this.mCredential.credentialBundle).invitationCode;
        this.onCredentialStateChanged();
      } else {
        this.showInstallationErrorAlert();
        this.deleteCredentialFromDevice$();
      }
    } else {
      if (this.hidSdkErrorMessage === HID_WALLET_SDK_ERR.INVALID_ISSUANCE_TOKEN) {
        delete this.mCredential.credentialBundle;
        await this.showInstallationErrorAlert();
      } else if (this.hidSdkErrorMessage === HID_WALLET_SDK_ERR.ADD_CARD_TO_WALLET_FAILED) {
        await this.deleteCredentialFromServer$();
        await this.showInstallationErrorAlert("Add to card failed");
      }
      this.hidSdkErrorMessage = null;
    }
    this.loadingService.closeSpinner();
  }

  private deleteCredentialFromDevice$ = async (): Promise<boolean> => {
    const transactionResultCode = await this.hidSdkManager().deleteEndpoint();
    if (transactionResultCode === HID_SDK_ERR.TRANSACTION_SUCCESS) {
      this.mCredential.setStatus(MobileCredentialStatuses.AVAILABLE);
      await this.onCredentialStateChanged();
      return true;
    }
    return false;
  };

  private doNativeInstall$ = async (): Promise<boolean> => {
    const params = { invitationCode: (this.mCredential as HIDCredential).getInvitationCode() };
    return await this.hidSdkManager()
      .setupEndpoint(params)
      .catch(({ message }) => {
        this.hidSdkErrorMessage = message;
        return false;
      })
      .finally(async () => await this.loadingService.closeSpinner());
  };

  private async getCredentialBundle$(): Promise<HidCredentialBundle> {
    const currentCredential = this.mCredential as HIDCredential;
    const invitationCodeValid = !!currentCredential.getInvitationCode();

    if (invitationCodeValid) {
      return currentCredential.getCredentialBundle() as HidCredentialBundle;
    } else {
      return this.credentialService.androidCredentialBundle$(currentCredential.getReferenceIdentifier()).toPromise();
    }
  }

  private credentialStateChangedSubscription() {
    this.hidSdkManager().taskExecutionObs$.subscribe(endpointStatus => {
      if (endpointStatus === EndpointStatuses.PROVISIONED_ACTIVE) {
        this.mCredential.setStatus(MobileCredentialStatuses.PROVISIONED);
        this.credentialService.updateCachedCredential$(EndpointStatuses.PROVISIONED_ACTIVE);
      }
    });
  }

  private async checkDeviceEndpointState$(): Promise<boolean> {
    const deviceEndpointState = await this.getDeviceEndpointState();
    const cachedEndpointState = await this.getLocalCachedEndpointState();
    if (deviceEndpointState.isProvisioned()) {
      if (cachedEndpointState.isProcessing()) {
        this.mCredential.setStatus(MobileCredentialStatuses.PROCESSING);
      } else {
        this.mCredential.setStatus(MobileCredentialStatuses.AVAILABLE);
      }
    } else if (deviceEndpointState.isInactive()) {
      if (await this.isEndpointRevoked()) {
        await this.onEndpointRevoked();
      } else if (cachedEndpointState.isProcessing()) {
        this.mCredential.setStatus(MobileCredentialStatuses.PROCESSING);
      } else {
        this.mCredential.setStatus(MobileCredentialStatuses.AVAILABLE);
      }
    } else {
      this.mCredential.setStatus(MobileCredentialStatuses.AVAILABLE);
    }
    return true;
  }

  private async onEndpointRevoked(): Promise<void> {
    this.setCredentialRevoked();
    const newCredential = await this.fetchFromServer$(true);
    const updateSuccess = !(newCredential.revoked() || newCredential.isProvisioned());
    if (updateSuccess) {
      this.mCredential = newCredential;
      this.hidSdkManager().deleteEndpoint();
      this.onCredentialStateChanged();
    }
  }
}
