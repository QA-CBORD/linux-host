import { MobileCredentialManager, CredentialStateChangeListener } from '../../shared/mobile-credential-manager';
import { MobileCredential } from '../../shared/mobile-credential';
import { Observable, of } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { map, catchError } from 'rxjs/operators';
import { GoogleCredential, AndroidCredentialState, GOOGLE } from '../android-credential.model';
import { GooglePayCredentialDataService } from '@shared/ui-components/mobile-credentials/service/google-pay-credential.data.service';
import { Injectable } from '@angular/core';
import { MobileCredentialStatuses } from '../../shared/credential-state';
import { LoadingService } from '@core/service/loading/loading.service';
import { HidCredentialDataService } from '@shared/ui-components/mobile-credentials/service/hid-credential.data.service';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { MobileCredentialsComponent } from '@shared/ui-components/mobile-credentials/mobile-credentials.component';
import { ModalController } from '@ionic/angular';
const { GooglePayPlugin } = Plugins;

@Injectable()
export class GooglePayCredentialManager implements MobileCredentialManager {
  private mCredential: GoogleCredential;
  private credentialStateChangeSubscription: CredentialStateChangeListener;
  private customLoadingOptions = { message: 'Processing ... Please wait', duration: 100000 };

  constructor(private googlePayCrendential: GooglePayCredentialDataService, private readonly modalCtrl: ModalController, private readonly loadingService: LoadingService, private readonly credentialService: HidCredentialDataService) {}

  initialize(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  setCredential(mobileCredential: MobileCredential): void {
    this.mCredential = mobileCredential as GoogleCredential;
  }
  onUiImageClicked(event?: any): void {
    // console.log('onTermsAndConditionsAccepted');
    // this.showLoading();
    // (async () => {
    //   const nonce = await GooglePayPlugin.getGooglePayNonce();
    //   const refObj = await this.getAndroidCredential(
    //     nonce.googlePayNonce,
    //     this.mCredential.getCredentialState().referenceIdentifier
    //   );
    //   const plugin = await GooglePayPlugin.openGooglePay({ uri: refObj.digitizationReference });
    //   // Update active passes / Update credential
    //   this.mCredential.setStatus(MobileCredentialStatuses.IS_PROVISIONED);
    //   this.googlePayCrendential.updateCredential$(this.mCredential);
    // })();
    const showTermsAndConditions = async () => {
      let componentProps = {
        termsAndConditions$: this.termsAndConditionsSource$,
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
    }
  }
  credentialEnabled$(): Observable<boolean> {
    console.log('credentialEnabled: ', this.mCredential.isEnabled())
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
  getCredential(): MobileCredential {
    return this.mCredential;
  }
  onUiIconClicked(): void {
    //
  }
  setCredentialStateChangeListener(credentialStateChangeSubscription: CredentialStateChangeListener): void {
    this.credentialStateChangeSubscription = credentialStateChangeSubscription;
  }
  refresh(): void {
    //
  }

  private async getAndroidCredential(googlePayNonce: string, referenceIdentifier: string): Promise<GOOGLE> {
    return this.googlePayCrendential
      .androidCredential$({
        referenceIdentifier,
        googlePayNonce,
      })
      .toPromise();
  }

  private onTermsAndConditionsAccepted(): void {

    console.log('onTermsAndConditionsAccepted');
    this.showLoading();
    (async () => {
      const nonce = await GooglePayPlugin.getGooglePayNonce();
      const refObj = await this.getAndroidCredential(
        nonce.googlePayNonce,
        this.mCredential.getCredentialState().referenceIdentifier
      );
      const plugin = await GooglePayPlugin.openGooglePay({ uri: refObj.digitizationReference });
      // Update active passes / Update credential
      this.mCredential.setStatus(MobileCredentialStatuses.IS_PROVISIONED);
      this.googlePayCrendential.updateCredential$(this.mCredential);
    })();
  }

  get termsAndConditionsSource$(): Promise<string> {
    this.showLoading();
    const termsNConditionsConfig = {
      domain: CONTENT_STRINGS_DOMAINS.get_web_gui,
      category: CONTENT_STRINGS_CATEGORIES.termsScreen,
      name: 'terms',
    };
    return this.credentialService
      .contentString$(termsNConditionsConfig)
      .pipe(
        map(contentString => {
          this.loadingService.closeSpinner();
          return contentString;
        }),
        catchError(() => {
          this.loadingService.closeSpinner();
          throw new Error('Error loading content');
        })
      )
      .toPromise();
  }

  private showLoading(): void {
    if (this.loadingService.notLoading()) {
      this.loadingService.showSpinner(this.customLoadingOptions);
    }
  }
}
