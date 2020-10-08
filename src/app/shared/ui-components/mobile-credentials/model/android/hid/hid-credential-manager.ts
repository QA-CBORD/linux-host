import { HttpClient } from '@angular/common/http';
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
import { MobileCredentialState, MobileCredentialStateEnum } from '../../shared/credential-state';
import { AbstractAndroidCredentialManager } from '../abstract-android-credential.management';
import { AndroidCredentialStateEntity, HID } from '../android-credentials';
import { HIDSdkManager } from './hid-plugin.adapter';

export class HIDCredentialManager extends AbstractAndroidCredentialManager {
  private static instance: HIDCredentialManager;
  private static TRANSACTION_SUCCESS_FULL = 'TRANSACTION_SUCCESS';
  private static NO_KEY_INSTALLED = 'NO_KEY_INSTALLED';
  private static MOBILE_KEY_ALREADY_INSTALLED = 'KEY_ALREADY_INSTALLED';
  private static MOBILE_KEY_INSTALLED_ON_THIS_DEVICE = 'MOBILE_KEY_INSTALLED_ON_THIS_DEVICE';
  private custom_loading_message = 'Processing ... Please wait';

  private constructor(
    private readonly modalCtrl: ModalController,
    private readonly alertCtrl: AlertController,
    private readonly popoverCtrl: PopoverController,
    private readonly loadingService: LoadingService,
    protected partnerPaymentApi: PartnerPaymentApiService,
    protected readonly storageStateService: StorageStateService,
    protected readonly authFacadeService: AuthFacadeService,
    protected readonly institutionFacadeService: InstitutionFacadeService,
    protected readonly contentStringFacade: ContentStringsFacadeService,
    protected readonly httpClient: HttpClient
  ) {
    super(partnerPaymentApi, storageStateService, authFacadeService, institutionFacadeService, httpClient);
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
    return this.androidActivePassesFromServer().pipe(map(androidCredential => androidCredential.isAvailable()));
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
              this.mCredential.setStatus(MobileCredentialStateEnum.IS_AVAILABLE);
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
    this.createCredentialFor$(this.mCredential)
      .pipe(take(1))
      .subscribe(
        credential => {
          this.mCredential = credential;
          this.getHidSdkManager()
            .installCredential(this.mCredential.getCredentialData<HID>().invitationCode)
            .then(hidSdkInstallCredentialTransactionResult => {
              if (hidSdkInstallCredentialTransactionResult == HIDCredentialManager.TRANSACTION_SUCCESS_FULL) {
                this.mCredential.setStatus(MobileCredentialStateEnum.IS_PROVISIONED);
                this.updateCredential(this.mCredential)
                  .pipe(take(1))
                  .subscribe(() => {
                    this.credentialStateChangeSubscription.onCredentialStateChanged();
                    this.loadingService.closeSpinner();
                  });
              } else {
                this.showInstallationErrorAlert('installation');
              }
            });
        },
        error => {
          this.showInstallationErrorAlert('installation');
        }
      );
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
    if (this.mCredential.isProvisioned()) {
      this.deleteCredential().subscribe(
        () => {
          this.getHidSdkManager()
            .deleteCurrentCredential()
            .then(() => {
              this.mCredential.setStatus(MobileCredentialStateEnum.IS_AVAILABLE);
              this.credentialStateChangeSubscription.onCredentialStateChanged();
            }).finally(()=> {
              this.loadingService.closeSpinner();
            });
        },
        error => {
          this.loadingService.closeSpinner();
          this.showInstallationErrorAlert('uninstall');
        }
      );
    }
  }

  private getHidSdkManager(): HIDSdkManager {
    return HIDSdkManager.getInstance();
  }

  initialize(): Promise<boolean> {
    return null; // no one calls you.
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
    contentStringFacade: ContentStringsFacadeService,
    httpClient: HttpClient
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
        contentStringFacade,
        httpClient
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
