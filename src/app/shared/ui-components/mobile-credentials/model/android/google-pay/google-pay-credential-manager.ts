import { Observable, of } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AndroidCredential, GooglePayCredentialBundle } from '../android-credential.model';
import { GooglePayCredentialDataService } from '@shared/ui-components/mobile-credentials/service/google-pay-credential.data.service';
import { Injectable } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { AlertController, ModalController } from '@ionic/angular';
import { MobileCredentialsComponent } from '@shared/ui-components/mobile-credentials/mobile-credentials.component';
import { AbstractAndroidCredentialManager } from '../abstract-android-credential.management';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
const { GooglePayPlugin } = Plugins;

@Injectable({ providedIn: 'root' })
export class GooglePayCredentialManager extends AbstractAndroidCredentialManager {
  constructor(
    private readonly modalCtrl: ModalController,
    protected readonly loadingService: LoadingService,
    private readonly credentialServ: GooglePayCredentialDataService,
    private readonly sessionFacadeService: SessionFacadeService,
    protected readonly alertCtrl: AlertController
  ) {
    super(loadingService, credentialServ, alertCtrl);
  }

  onUiImageClicked(event?: any): void {
    const showTermsAndConditions = async () => {
      const terms = (await this.contentStringAsync()).termString$;
      const modal = await this.modalCtrl.create({
        backdropDismiss: false,
        mode: 'ios',
        component: MobileCredentialsComponent,
        componentProps: { terms },
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      if (data.termsAccepted) {
        this.onTermsAndConditionsAccepted();
      }
    };

    (async () => {
      if (await this.nfcIsOn()) {
        showTermsAndConditions();
      } else {
        const string$ = (await this.contentStringAsync()).nfcDialogString$;
        this.nfcOffAlert(string$, async () => {
          showTermsAndConditions();
        });
      }
    })();
  }

  private async watchOnResume(): Promise<void> {
    const appResumedEventListener = GooglePayPlugin.addListener('appResumed', async () => {
      appResumedEventListener.remove();
      setTimeout(() => (this.sessionFacadeService.navigatedFromGpay = false), 2500); // this is so we don't get the loggin screen, we're already logged in.
      let counter = 0;
      let timeOut = 3000;
      const intervalId = setInterval(async () => {
        const newCredential = await this.fetchFromServer$(true);
        const credentialStatusChanged = !newCredential.isAvailable();
        if (credentialStatusChanged) {
          this.mCredential = newCredential;
          this.credentialStateChangeListener.onCredentialStateChanged();
        }
        const shouldStopRefresh =
          counter++ == 100 || newCredential.isProvisioned() || (newCredential.isAvailable() && counter == 3);
        if (shouldStopRefresh) {
          clearInterval(intervalId);
        }
        timeOut = 30000;
        if (counter == 25) {
          timeOut = 120000;
        }
      }, timeOut);
    });
  }

  credentialEnabled$(): Observable<boolean> {
    return of(this.mCredential.isEnabled()).pipe(
      map(googleCredentialEnabled => {
        if (googleCredentialEnabled) {
          GooglePayPlugin.getGoogleClient();
        }
        return googleCredentialEnabled;
      })
    );
  }

  refresh(): void {
    this.fetchFromServer$(true).then(newCredential => {
      this.mCredential = newCredential;
      this.credentialStateChangeListener.onCredentialStateChanged();
    });
  }

  private async getGoogleCredentialBundle(
    googlePayNonce: string,
    referenceIdentifier: string
  ): Promise<AndroidCredential<any>> {
    return await of(this.mCredential)
      .pipe(
        switchMap(credential => {
          if (credential.getCredentialBundle()) {
            return of(credential);
          } else {
            return this.credentialServ
              .androidCredentialBundle$({
                referenceIdentifier,
                googlePayNonce,
              })
              .pipe(
                map(credentialBundle => {
                  this.mCredential.setCredentialBundle(credentialBundle);
                  return this.mCredential;
                }),
                catchError(() => of(null))
              );
          }
        })
      )
      .toPromise();
  }

  private async onTermsAndConditionsAccepted(): Promise<void> {
    this.showLoading();
    const { googlePayNonce } = await GooglePayPlugin.getGooglePayNonce();
    const { referenceIdentifier } = this.mCredential.getCredentialState();
    const newCredential = await this.getGoogleCredentialBundle(googlePayNonce, referenceIdentifier);
    this.loadingService.closeSpinner();
    if (!newCredential) {
      this.showInstallationErrorAlert();
      return;
    }
    this.mCredential = newCredential;
    let { digitizationReference } = <GooglePayCredentialBundle>this.mCredential.getCredentialBundle();
    this.sessionFacadeService.navigatedFromGpay = true;
    GooglePayPlugin.openGooglePay({ uri: digitizationReference }).catch(() => {
      this.showInstallationErrorAlert();
    });
    setTimeout(() => this.watchOnResume(), 2000);
  }
}
