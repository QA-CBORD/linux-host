import { LoadingService } from '@core/service/loading/loading.service';
import { AlertController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { catchError, finalize, first } from 'rxjs/operators';
import { AndroidCredentialDataService } from '../shared/android-credential-data.service';
import { NFCDialogContentString } from '../shared/credential-content-string';
import { MobileCredential } from '../shared/mobile-credential';
import { MobileCredentialDataService } from '../shared/mobile-credential-data.service';
import { CredentialStateChangeListener, MobileCredentialManager } from '../shared/mobile-credential-manager';
import { AndroidCredential } from './android-credential.model';
import { Plugins } from '@capacitor/core';
import { AndroidCredentialCsModel, NfcDialogCs } from './android-credential-content-strings.model';
import { MobileCredentialStatuses } from '../shared/credential-state';
import { CredentialProviders } from '../shared/credential-utils';
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

  async contentStringAsync(updateUi?: boolean): Promise<AndroidCredentialCsModel> {
    const contentStrings = await this.credentialSrvc.getContents();
    if (updateUi) {
      this.mCredential.setUicString$(contentStrings.credStatuString$);
      this.credentialStateChangeListener && this.credentialStateChangeListener.onCredentialStateChanged();
    }
    return contentStrings;
  }

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

  protected async showInstallationErrorAlert(): Promise<void> {
    const string$ = (await this.contentStringAsync()).installErorDialogString$;

    const header = string$.title;
    const message = string$.mContent;
    const buttons = [{ text: string$.ok, role: 'cancel' }];
    const alertDialog = await this.createAlertDialog(header, message, buttons);
    this.loadingService.closeSpinner();
    await alertDialog.present();
  }

  protected async nfcOffAlert(string$: NfcDialogCs, callerOnPreceedHandler?: () => Promise<any>): Promise<void> {
    const header = string$.title;
    const message = string$.mContent;
    const buttons = [
      { text: string$.cancelTxt, role: 'cancel' },
      {
        text: string$.acceptTxt,
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
