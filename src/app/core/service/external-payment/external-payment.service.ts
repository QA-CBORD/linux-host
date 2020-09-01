import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { USAePayResponse } from '@core/model/add-funds/usaepay-response.model';
import { ApplePayResponse, ApplePay } from '@core/model/add-funds/applepay-response.model';
import { Plugins } from '@capacitor/core';
import { zip } from 'rxjs';
import { ToastController } from '@ionic/angular';
const { Browser, IOSDevice } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class ExternalPaymentService {

  constructor(
    private inAppBrowser: InAppBrowser,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly toastController: ToastController,
  ) {}

  /* USAePay */
  /* WKWebView is the required webview by Apple  */

  addUSAePayCreditCard(): Promise<USAePayResponse> {
    return new Promise<USAePayResponse>((resolve, reject) => {
      const authTokenObservable = this.authFacadeService.getAuthenticationToken$().pipe(take(1));
      const institutionInfoObservable = this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1));
      zip(authTokenObservable, institutionInfoObservable).subscribe(
        ([authToken, institutionInfo]) => {
          const browser = this.openUSAePayPage(authToken, institutionInfo.shortName);
          browser.on('loadstart').subscribe(event => {
            this.handleUSAePayResponse(event, resolve, reject, browser);
          });
          browser.on('loaderror').subscribe(() => {
            reject('Your request failed. Please try again.');
            browser.close();
          });
        },
        error => {
          reject({ success: false, errorMessage: `The request failed: ${error}` });
        }
      );
    });
  }

  /* Apple Pay */
  /* Safari browser is required by Aople to use Apple Pay */

  async payWithApplePay(handleApplePay: ApplePay, queryParams: Object): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const authTokenObservable = this.authFacadeService.getAuthenticationToken$().pipe(take(1));
      const institutionInfoObservable = this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1));
      zip(authTokenObservable, institutionInfoObservable).subscribe(
        async ([authToken, institutionInfo]) => {
          await this.openApplePayPage(queryParams, handleApplePay, authToken, institutionInfo.shortName);
        },
        error => {
          reject({ success: false, errorMessage: `The request failed: ${error}` });
        }
      );
        this.handleApplePayResponse(resolve, reject);
    });
  }

  private async openApplePayPage(queryParams: Object, handleApplePay: ApplePay, authToken: string, shortName: string) {
    let fullURL = this.getApplePayURL(queryParams, handleApplePay, authToken, shortName);
    await Browser.open({ url: `${fullURL}` });
  }

  private openUSAePayPage(authToken: string, shortName: string) {
    const target = '_blank';
    const url = `${this.environmentFacadeService.getSitesURL()}/${shortName}/full/add_card_mobile.php?session_token=${authToken}`;
    const options: InAppBrowserOptions = {
      usewkwebview: 'yes',
      toolbarposition: 'top',
      closebuttoncaption: 'Back',
      location: 'no',
      hidenavigationbuttons: 'yes',
      toolbarcolor: '#ffffff',
    };
    const browser = this.inAppBrowser.create(url, target, options);
    return browser;
  }

  private getApplePayURL(queryParams: Object, handleApplePay: ApplePay, authToken: string, shortName: string) {
    let fullURL = '';
    const params = JSON.parse(JSON.stringify(queryParams));
    const applePayBaseURL = `${this.environmentFacadeService.getSitesURL()}/${shortName}/full/applepay.php?`;
    if (handleApplePay === ApplePay.ORDERS_WITH_APPLE_PAY) {
      fullURL = `${applePayBaseURL}order_total=${params.total || ''}&session_token=${authToken ||
        ''}&sub_total=${params.subTotal || ''}&fee=${params.useFee || ''}&tax=${params.tax ||
        '0.00'}&discount=${params.discount || '0.00'}&pickup_fee=${params.pickupFee ||
        ''}&delivery_fee=${params.deliveryFee || ''}&tip=${params.tip || ''}`;
    } else if (handleApplePay === ApplePay.DEPOSITS_WITH_APPLE_PAY) {
      fullURL = `${applePayBaseURL}amount=${params.depositAmount || ''}&select_account=${params.accountId ||
        ''}&session_token=${authToken || ''}`;
    }
    return fullURL;
  }

  private handleUSAePayResponse(
    event,
    resolve: (value?: USAePayResponse | PromiseLike<USAePayResponse>) => void,
    reject: (reason?: any) => void,
    browser
  ) {
    if (event && event.url) {
      const url = event.url;
      if (url.includes('action_complete')) {
        if (url.includes('action_complete=1')) {
          resolve(<USAePayResponse>{ success: true });
        } else if (url.includes('error=')) {
          const errorMessage = new URLSearchParams(url).get('error');
          this.onUSAePayCallBackRetrieve(`Your request failed: ${errorMessage}. Please try again.`);
          reject(`Your request failed: ${errorMessage}. Please try again.`);
        }
        browser.close();
      }
    }
  }

  private handleApplePayResponse(resolve: (value?: any) => void, reject: (reason?: any) => void) {
    const applePayEvent = IOSDevice.addListener('ApplePayEvent', async (info: any) => {
      if (info.url && info.url.includes('applepay')) {
        if (info.url.includes('status=success')) {
          const accountId = new URLSearchParams(info.url).get('accountId') || '';
          const accountName = new URLSearchParams(info.url).get('accountName') || '';
          const amount = new URLSearchParams(info.url).get('amount') || '';
          resolve(<ApplePayResponse>{
            success: true,
            amount: amount, 
            selectedAccount: { accountDisplayName: accountName },
            accountId: accountId,
            sourceAcc: { accountTender: 'Apple Pay' },
          });
        } else {
          reject({ success: false, errorMessage: 'The request failed.' });
        }
      } else {
        reject({ success: false, errorMessage: 'The request failed.' });
      }
      await Browser.close().then(() => {
        applePayEvent.remove();
      })
    });
  }

  private async onUSAePayCallBackRetrieve(message: string) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 3000,
    });
    toast.present();
  }
}
