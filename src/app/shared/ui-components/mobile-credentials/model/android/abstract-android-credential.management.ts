import { LoadingService } from '@core/service/loading/loading.service';
import { AlertController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { catchError, finalize, first } from 'rxjs/operators';
import { AndroidCredentialDataService, NFCDialogContentString } from '../shared/android-credential-data.service';
import { MobileCredential } from '../shared/mobile-credential';
import { MobileCredentialDataService } from '../shared/mobile-credential-data.service';
import { CredentialStateChangeListener, MobileCredentialManager } from '../shared/mobile-credential-manager';
import { AndroidCredential } from './android-credential.model';
import { Plugins } from '@capacitor/core';
const { MobileCredentialStatusPlugin } = Plugins;

export abstract class AbstractAndroidCredentialManager implements MobileCredentialManager {
  protected customLoadingOptions = { message: 'Processing ... Please wait', duration: 150000 };
  protected mCredential: AndroidCredential<any>;
  protected credentialStateChangeListener: CredentialStateChangeListener;

  constructor(
    protected readonly loadingService: LoadingService,
    protected readonly credentialSrvc: AndroidCredentialDataService,
    protected readonly alertCtrl: AlertController
  ) {}

  getService(): MobileCredentialDataService {
    return this.credentialSrvc;
  }

  async onWillLogout(): Promise<void> {}

  refresh(): void {
    // do nothing
  }

  setCredentialStateChangeListener(credentialStateChangeSubscription: CredentialStateChangeListener): void {
    this.credentialStateChangeListener = credentialStateChangeSubscription;
  }

  protected async createAlertDialog(header: string, msg: string, buttons: Array<any>): Promise<HTMLIonAlertElement> {
    return await this.alertCtrl.create({
      cssClass: 'alert-dialog',
      backdropDismiss: false,
      mode: 'ios',
      message: msg,
      buttons: buttons,
      header: header,
    });
  }

  protected async showInstallationErrorAlert(operation = 'installation'): Promise<void> {
    const header = 'Unexpected error';
    const message = `An unexpected error occurred during mobile ID ${operation}, please try again later.`;
    const buttons = [{ text: 'OK', role: 'cancel' }];
    const alertDialog = await this.createAlertDialog(header, message, buttons);
    this.loadingService.closeSpinner();
    await alertDialog.present();
  }

  protected async nfcOffAlert(
    contentString: NFCDialogContentString,
    callerOnPreceedHandler?: () => Promise<any>
  ): Promise<void> {
    const noContent = 'No content';
    const header = contentString.title != noContent ? contentString.title : 'NFC is turned off';
    const message =
      contentString.text != noContent
        ? contentString.text
        : 'The NFC setting is turned off for your phone. You can proceed and provision your credential, but it will not work when presented to an NFC reader to open a door or pay for a purchase until you turn on your NFC setting.';
    const buttons = [
      { text: contentString.cancelButton != noContent ? contentString.cancelButton : 'Cancel', role: 'cancel' },
      {
        text: contentString.acceptButton != noContent ? contentString.acceptButton : 'Proceed',
        handler: callerOnPreceedHandler,
      },
    ];
    const alert = await this.createAlertDialog(header, message, buttons);
    this.loadingService.closeSpinner();
    alert.present();
  }

  protected async nfcIsOn(): Promise<boolean> {
    const response = await MobileCredentialStatusPlugin.deviceNativeState({ credentialType: '' });
    return response.deviceState.nfcOn;
  }

  protected showLoading(): void {
    if (this.loadingService.notLoading()) {
      this.loadingService.showSpinner(this.customLoadingOptions);
    }
  }

  protected async checkCredentialAvailability(showLoading: boolean = true): Promise<boolean> {
    return (await this.fetchFromServer$(!showLoading)).isAvailable();
  }

  protected async fetchFromServer$(runInBackground?: boolean, nullOnErr?: boolean): Promise<AndroidCredential<any>> {
    const shouldShowLoadingIndicator = !runInBackground;
    if (shouldShowLoadingIndicator) {
      this.showLoading();
    }
    return await this.credentialSrvc
      .activePasses$()
      .pipe(
        first(),
        catchError(() => (nullOnErr ? of(null) : of(this.mCredential))),
        finalize(() => {
          if (shouldShowLoadingIndicator) {
            this.loadingService.closeSpinner();
          }
        })
      )
      .toPromise();
  }

  onUiIconClicked(): void {}

  getCredential(): MobileCredential {
    return this.mCredential;
  }

  credentialAvailable$(): Observable<boolean> {
    return of(this.mCredential.isAvailable());
  }

  setCredential(mobileCredential: AndroidCredential<any>): void {
    this.mCredential = mobileCredential;
  }

  abstract credentialEnabled$(): Observable<boolean>;

  abstract onUiImageClicked(event?: any): void;
}
