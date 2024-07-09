/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AndroidCredential, GooglePayCredentialBundle } from '../android-credential.model';
import { GooglePayCredentialDataService } from '@shared/ui-components/mobile-credentials/service/google-pay-credential.data.service';
import { Injectable } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { MobileCredentialsComponent } from '@shared/ui-components/mobile-credentials/mobile-credentials.component';
import { AbstractAndroidCredentialManager } from '../abstract-android-credential.management';
import { registerPlugin } from '@capacitor/core';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';

let GooglePayPlugin: any;
@Injectable({ providedIn: 'root' })
export class GooglePayCredentialManager extends AbstractAndroidCredentialManager {
  constructor(
    private readonly modalCtrl: ModalController,
    protected readonly loadingService: LoadingService,
    private readonly credentialServ: GooglePayCredentialDataService,
    private identityFacadeService: IdentityFacadeService,
    protected readonly alertCtrl: AlertController,
    private readonly platform: Platform
  ) {
    super(loadingService, credentialServ, alertCtrl);

    if (this.platform.is('android')) {
      GooglePayPlugin = registerPlugin<any>('GooglePayPlugin');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    if (!this.platform.is('android')) {
      return;
    }

    const appResumedEventListener = GooglePayPlugin.addListener('appResumed', async () => {
      appResumedEventListener.remove();
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
    if (!this.platform.is('android')) {
      this.showInstallationErrorAlert();
      return;
    }

    const { googlePayNonce } = await GooglePayPlugin.getGooglePayNonce();
    const { referenceIdentifier } = this.mCredential.getCredentialState();
    const newCredential = await this.getGoogleCredentialBundle(googlePayNonce, referenceIdentifier);
    this.loadingService.closeSpinner();
    if (!newCredential) {
      this.showInstallationErrorAlert();
      return;
    }
    const estimatedTimeInMillis = 900000;
    this.mCredential = newCredential;
    const { digitizationReference } = <GooglePayCredentialBundle> this.mCredential.getCredentialBundle();
    this.identityFacadeService.updateVaultTimeout({ extendTimeout: true, estimatedTimeInMillis });
    GooglePayPlugin.openGooglePay({ uri: digitizationReference }).catch(() => {
      this.showInstallationErrorAlert();
    });
    setTimeout(() => this.watchOnResume(), 2000);
  }
}
