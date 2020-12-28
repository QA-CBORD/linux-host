import { Observable, of } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { map, catchError, switchMap, finalize, first } from 'rxjs/operators';
import { AndroidCredential, EndpointState, GOOGLE } from '../android-credential.model';
import { GooglePayCredentialDataService } from '@shared/ui-components/mobile-credentials/service/google-pay-credential.data.service';
import { Injectable } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { AlertController, ModalController } from '@ionic/angular';
import { MobileCredentialsComponent } from '@shared/ui-components/mobile-credentials/mobile-credentials.component';
import { AbstractAndroidCredentialManager } from '../abstract-android-credential.management';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
const { GooglePayPlugin } = Plugins;

@Injectable({providedIn: 'root'})
export class GooglePayCredentialManager extends AbstractAndroidCredentialManager {
  constructor(
    private googlePayCrendential: GooglePayCredentialDataService,
    private readonly modalCtrl: ModalController,
    protected readonly loadingService: LoadingService,
    private readonly credentialService: GooglePayCredentialDataService,
    private readonly sessionFacadeService: SessionFacadeService,
    protected readonly alertCtrl: AlertController
  ) {
    super(loadingService, credentialService, alertCtrl);
  }

  onUiImageClicked(event?: any): void {
    const showTermsAndConditions = async () => {
      let componentProps = {
        termsAndConditions: await this.termsAndConditionsSource$,
      };
      const modal = await this.modalCtrl.create({
        backdropDismiss: false,
        mode: 'ios',
        component: MobileCredentialsComponent,
        componentProps,
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      if (data.termsAccepted) {
        this.onTermsAndConditionsAccepted();
      }
    };
    showTermsAndConditions();
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
          // this.mCredential.setEndpointState(new EndpointState(this.mCredential.credentialState.credStatus));
          // this.credentialService
          //   .updateCredential$(this.mCredential)
          //   .pipe(first())
          //   .subscribe();
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

  private async getAndroidCredential(
    googlePayNonce: string,
    referenceIdentifier: string
  ): Promise<AndroidCredential<any>> {
    return of(this.mCredential)
      .pipe(
        switchMap(credential => {
          if (credential.getCredentialBundle()) {
            return of(credential);
          } else {
            return this.googlePayCrendential
              .androidCredential$({
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
    const newCredential = await this.getAndroidCredential(googlePayNonce, referenceIdentifier);
    this.loadingService.closeSpinner();
    if (!newCredential) {
      this.showInstallationErrorAlert('installation');
      return;
    }
    this.mCredential = newCredential;
    let { digitizationReference } = this.mCredential.getCredentialBundle();
    this.sessionFacadeService.navigatedFromGpay = true;
    GooglePayPlugin.openGooglePay({ uri: digitizationReference });
    setTimeout(() => this.watchOnResume(), 2000);
  }

  get termsAndConditionsSource$(): Promise<string> {
    this.showLoading();
    const termsNConditionsConfig = {
      domain: CONTENT_STRINGS_DOMAINS.patronUi,
      category: CONTENT_STRINGS_CATEGORIES.mobileCredential,
      name: 'terms',
    };
    return this.credentialService
      .contentString$(termsNConditionsConfig)
      .pipe(
        catchError(() => 'No content'),
        finalize(() => this.loadingService.closeSpinner())
      )
      .toPromise();
  }
}
