import { ChangeDetectorRef } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { PartnerPaymentApiService } from '@core/service/payments-api/partner-payment-api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { MobileCredentialsComponent } from '@shared/ui-components/mobile-credentials/mobile-credentials.component';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AbstractAndroidCredentialManager } from '../abstract-android-credential.management';
import { AndroidCredentialStateEntity, HID } from '../android-credentials';
import { HIDSdkAdapter } from './hid-plugin.adapter';

export class HIDCredentialManager extends AbstractAndroidCredentialManager {
  private static instance: HIDCredentialManager;
  private static NOT_INSTALLED_ON_DEVICE = 'NO_KEY_INSTALLED';
  private credentialAlreadyInstalledOnOtherDevice: boolean = false;

  private constructor(
    private readonly modalCtrl: ModalController,
    private readonly alertCtrl: AlertController,
    private readonly popoverCtrl: PopoverController,
    private readonly loadingService: LoadingService,
    protected partnerPaymentApi: PartnerPaymentApiService,
    protected readonly storageStateService: StorageStateService,
    protected readonly authFacadeService: AuthFacadeService,
    protected readonly institutionFacadeService: InstitutionFacadeService,
    protected readonly contentStringFacade: ContentStringsFacadeService
  ) {
    super(partnerPaymentApi, storageStateService, authFacadeService, institutionFacadeService);
  }

  onUiImageClicked(event?: any): void {
    const verifyCanInstallCredential$ = () =>
      this.androidActivePassesFromServer().pipe(map(androidCredential => androidCredential.isAvailable()));

    const doCredentialFirstInstallation = async () => {
      this.loadingService.showSpinner({ message: 'Processing... Please wait...' });
      let componentProps = {
        termsAndConditions$: this.termsAndConditions$,
        credentialManager: this,
      };
      const modal = await this.modalCtrl.create({
        backdropDismiss: false,
        component: MobileCredentialsComponent,
        componentProps,
      });
      return await modal.present();
    };

    if (this.credentialAlreadyInstalledOnOtherDevice) {
      this.loadingService.showSpinner({message: 'Processing... Please wait...'})
      verifyCanInstallCredential$()
        .pipe(take(1))
        .subscribe(itHasBeenRemovedFromPreviousDevice => {
          if(itHasBeenRemovedFromPreviousDevice) {
             doCredentialFirstInstallation();
          } else {
            // notify user he needs to uninstall from previous device first.
            let showNotifyAlert = async () => {
              let notifyAlert = await this.alertCtrl.create({
                backdropDismiss: true,
                message:
                  'Your Mobile ID is already installed on another device. Pleasa uninstall it from previous device and try again or contact your system administrator.',
                animated: true,
                header: 'Notification',
                mode: 'ios',
                buttons: [
                  {
                    text: 'OK',
                    role: 'cancel',
                  },
                ],
              });
              return await notifyAlert.present();
            };

            showNotifyAlert();
          }
          this.loadingService.closeSpinner();
        });
    } else {
      doCredentialFirstInstallation();
    }
  }

  // handles when HID question mark is clicked, should show instructions and an uninstall option if already installed.
  onUiIconClicked(): void {
    const showCredentialUsageContentString = async () => {
      let hidSdkStatus = null;
      let btnText = 'OK';
      if (this.mCredential.isProvisioned()) {
        hidSdkStatus = this.getSdkAdapter().installedCredentialInfo$;
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

  onDeleteCredential(event?: string): void {
    if (event != 'Uninstall') {
      this.popoverCtrl.dismiss();
      return;
    }
    const confirmDelete = async () => {
      let confirmAlert = await this.alertCtrl.create({
        backdropDismiss: false,
        mode: 'ios',
        animated: true,
        message: 'Are you sure you want to uninstall your mobile ID ?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Confirm',
            handler: () => {
              this.loadingService.showSpinner({ message: 'Processing... Please wait...' });
              confirmAlert.dismiss();
              this.uninstallCredential();
            },
          },
        ],
      });
      this.popoverCtrl.dismiss();
      await confirmAlert.present();
    };
    confirmDelete();
  }

  credentialAvailable$(): Observable<boolean> {
    return of(this.mCredential.isAvailable());
  }

  credentialEnabled$(): Observable<boolean> {
    if (!this.mCredential) {
      return this.androidActivePasses().pipe(map(mCredential => mCredential.isEnabled()));
    }
    if (this.mCredential.isProvisioned()) {
      return from(this.getSdkAdapter().installedCredentialInfo$).pipe(
        map(hidSdkResponse => {
          let { transactionResult } = hidSdkResponse;
          console.log('transactionResult ====>>> ', transactionResult, hidSdkResponse);
          return transactionResult == HIDCredentialManager.NOT_INSTALLED_ON_DEVICE;
        }),
        switchMap(credentialAlreadyInstalledOnOtherDevice => {
          console.log('isNotInstalledOnDevice ====>>> ', credentialAlreadyInstalledOnOtherDevice);
          if (credentialAlreadyInstalledOnOtherDevice) {
            this.credentialAlreadyInstalledOnOtherDevice = true;
            return this.updateLocalCache({ status: AndroidCredentialStateEntity.IS_AVAILABLE }).pipe(
              take(1),
              map(updatedCredential => {
                this.mCredential = updatedCredential;
                return true;
              })
            );
          }
          return of(true);
        })
      );
    }
    return of(this.mCredential.isEnabled());
  }

  onTermsAndConditionsAccepted(): void {
    this.modalCtrl.dismiss();
    this.loadingService.showSpinner({ message: 'Processing... Please wait...' });
    this.androidCredential()
      .pipe(take(1))
      .subscribe(credential => {
        this.mCredential = credential;
        console.log('credential received: ', this.mCredential, credential);
        this.getSdkAdapter()
          .installCredential(this.mCredential.getCredentialData<HID>().invitationCode)
          .then(result => {
            console.log('installation on process, stand by: ', result);
            this.updateCredential({ status: AndroidCredentialStateEntity.IS_PROVISIONED })
              .pipe(take(1))
              .subscribe(updatedCredential => {
                console.log('The credential Updated: ', updatedCredential);
                this.mCredential = updatedCredential;
                this.credentialStateChangeSubscription.onCredentialStateChanged();
                this.loadingService.closeSpinner();
              });
            // if successfull, need to call update credential.
          });
      });
  }

  onTermsAndConditionsDeclined(): void {
    this.modalCtrl.dismiss();
  }

  private uninstallCredential(): void {
    this.getSdkAdapter()
      .deleteCurrentCredential()
      .then(sdkResponse => {
        console.log('Credential uninstall sdkResponse: ', sdkResponse);
        let { transactionResult } = sdkResponse;
        if(transactionResult == HIDCredentialManager.NOT_INSTALLED_ON_DEVICE) {
          this.loadingService.closeSpinner();
          return;
        }
        this.deleteCredential()
          .pipe(take(1))
          .subscribe(operationResult => {
            console.log('OperationSuccess?, ', operationResult);
            this.mCredential = operationResult.current;
            this.credentialStateChangeSubscription.onCredentialStateChanged();
            this.loadingService.closeSpinner();
          });
      });
  }

  private getSdkAdapter(): HIDSdkAdapter {
    return HIDSdkAdapter.getInstance();
  }

  protected onInstallationFinished(): void {
    console.log('install finished successfully');
    // update credential states, local and on server.
  }

  initialize(): Promise<any> {
    return this.getSdkAdapter().initializeSdk();
  }

  static getInstance(
    modalCtrl: ModalController,
    alertCtrl: AlertController,
    popoverCtrl: PopoverController,
    loadingService: LoadingService,
    partnerPaymentApi: PartnerPaymentApiService,
    storageStateService: StorageStateService,
    authFacadeService: AuthFacadeService,
    institutionFacadeService: InstitutionFacadeService,
    contentStringFacade: ContentStringsFacadeService
  ): HIDCredentialManager {
    if (!this.instance) {
      this.instance = new HIDCredentialManager(
        modalCtrl,
        alertCtrl,
        popoverCtrl,
        loadingService,
        partnerPaymentApi,
        storageStateService,
        authFacadeService,
        institutionFacadeService,
        contentStringFacade
      );
    }
    return this.instance;
  }

  get termsAndConditions$(): Promise<string> {
    const { domain, category, name } = this.mCredential.getConfig().terms;
    return this.contentStringFacade
      .fetchContentString$(domain, category, name)
      .pipe(
        map(data => {
          return data.value;
        }),
        take(1),
        tap(resp => this.loadingService.closeSpinner())
      )
      .toPromise();
  }
}
