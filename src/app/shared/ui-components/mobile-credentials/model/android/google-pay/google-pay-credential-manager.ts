import { Observable, of } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AndroidCredential } from '../android-credential.model';
import { GooglePayCredentialDataService } from '@shared/ui-components/mobile-credentials/service/google-pay-credential.data.service';
import { Injectable } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { ModalController } from '@ionic/angular';
import { MobileCredentialsComponent } from '@shared/ui-components/mobile-credentials/mobile-credentials.component';
import { AbstractAndroidCredentialManager } from '../abstract-android-credential.management';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
const { GooglePayPlugin } = Plugins;

@Injectable()
export class GooglePayCredentialManager extends AbstractAndroidCredentialManager {
  constructor(
    private googlePayCrendential: GooglePayCredentialDataService,
    private readonly modalCtrl: ModalController,
    protected readonly loadingService: LoadingService,
    private readonly credentialService: GooglePayCredentialDataService,
    private readonly sessionFacadeService: SessionFacadeService
  ) {
    super(loadingService, credentialService);
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
    const appResumedEventListener = GooglePayPlugin.addListener('appResumed', () => {
      appResumedEventListener.remove();
      this.checkCredentialAvailability().then(({ credentialState }) => {
        this.mCredential.setCredentialState(credentialState);
        this.credentialStateChangeListener.onCredentialStateChanged();
        if (credentialState.isProcessing()) {
          // if true, then set interval to check in background for possible update.
        }
      });
      setTimeout(() => {
        this.sessionFacadeService.navigatedFromGpay = false;
      }, 2000);
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

  credentialAvailable$(): Observable<boolean> {
    return of(this.mCredential.isAvailable());
  }

  refresh(): void {
    console.log('refreshing google pay credentials')
    this.checkCredentialAvailability().then(({ credentialState }) => {
      this.mCredential.setCredentialState(credentialState);
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
                })
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
    this.mCredential = await this.getAndroidCredential(googlePayNonce, referenceIdentifier);
    this.loadingService.closeSpinner();
    let { digitizationReference } = this.mCredential.getCredentialBundle();
    this.sessionFacadeService.navigatedFromGpay = true;
    GooglePayPlugin.openGooglePay({ uri: digitizationReference });
    setTimeout(() => this.watchOnResume(), 2000);
  }

  get termsAndConditionsSource$(): Promise<string> {
    const termsNConditionsConfig = {
      domain: CONTENT_STRINGS_DOMAINS.patronUi,
      category: CONTENT_STRINGS_CATEGORIES.mobileCredential,
      name: 'terms',
    };
    return this.credentialService
      .contentString$(termsNConditionsConfig)
      .pipe(catchError(() => 'No content'))
      .toPromise();
  }
}
