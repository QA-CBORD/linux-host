import { LoadingService } from '@core/service/loading/loading.service';
import { AlertController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { catchError, finalize, first } from 'rxjs/operators';
import { AndroidCredentialDataService } from '../shared/android-credential-data.service';
import { MobileCredential } from '../shared/mobile-credential';
import { MobileCredentialDataService } from '../shared/mobile-credential-data.service';
import { CredentialStateChangeListener, MobileCredentialManager } from '../shared/mobile-credential-manager';
import { AndroidCredential } from './android-credential.model';

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
    await alertDialog.present();
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
