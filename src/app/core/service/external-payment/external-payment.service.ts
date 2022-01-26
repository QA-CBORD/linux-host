import { Injectable, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { InAppBrowser, InAppBrowserObject, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { USAePayResponse } from '@core/model/add-funds/usaepay-response.model';
import { ApplePayResponse, ApplePay } from '@core/model/add-funds/applepay-response.model';
import { Plugins } from '@capacitor/core';
import { zip } from 'rxjs';
import { ToastService } from '@core/service/toast/toast.service';
import { OrderInfo } from '@sections/ordering';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { IonContent } from '@ionic/angular';
const { Browser, IOSDevice } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class ExternalPaymentService {
  @ViewChild(IonContent) myContent: IonContent;
  constructor(
    private inAppBrowser: InAppBrowser,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly toastService: ToastService,
    private readonly accessibilityService: AccessibilityService
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
            this.hideElementsBehindBrowser();
            this.handleUSAePayResponse(event, resolve, reject, browser);
          });
          browser.on('loaderror').subscribe(() => {
            reject('Your request failed. Please try again.');
            browser.close();
          });
          browser.on('exit').subscribe(() => {
            this.hideElementsBehindBrowser(false);
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

  async payWithApplePay(handleApplePay: ApplePay, queryParams: Partial<OrderInfo> | DepositInfo): Promise<any> {
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

  private async openApplePayPage(
    queryParams: Partial<OrderInfo> | DepositInfo,
    handleApplePay: ApplePay,
    authToken: string,
    shortName: string
  ) {
    const url = this.buildApplePayURL(queryParams, handleApplePay, authToken, shortName);
    await Browser.open({ url });
  }

  private openUSAePayPage(authToken: string, shortName: string): InAppBrowserObject {
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
    return this.inAppBrowser.create(url, target, options);
  }

  private buildApplePayURL(
    queryParams: Partial<OrderInfo> | DepositInfo,
    handleApplePay: ApplePay,
    authToken: string,
    shortName: string
  ): string {
    const applePayBaseURL = `${this.environmentFacadeService.getSitesURL()}/${shortName}/full/applepay.php?`;
    switch (handleApplePay) {
      case ApplePay.ORDERS_WITH_APPLE_PAY: {
        const { total, subTotal, useFee, tax, discount, pickupFee, deliveryFee, tip, merchantId } = <
          Partial<OrderInfo>
        >queryParams;
        return `${applePayBaseURL}order_total=${total || ''}&session_token=${authToken || ''}&sub_total=${subTotal ||
          ''}&fee=${useFee || ''}&tax=${tax || '0.00'}&discount=${discount || '0.00'}&pickup_fee=${pickupFee ||
          ''}&delivery_fee=${deliveryFee || ''}&tip=${tip || ''}&merchantId=${merchantId || ''}`;
      }
      case ApplePay.DEPOSITS_WITH_APPLE_PAY: {
        const { depositAmount, accountId } = <DepositInfo>queryParams;
        return `${applePayBaseURL}amount=${depositAmount || ''}&select_account=${accountId ||
          ''}&session_token=${authToken || ''}`;
      }
      default: {
        return '';
      }
    }
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
      });
    });
  }

  private async onUSAePayCallBackRetrieve(message: string) {
    await this.toastService.showToast({ message });
  }

  // Work-around to allow reader to navigate through the browser first
  private async hideElementsBehindBrowser(hide: boolean = true) {
    if (await this.accessibilityService.isVoiceOverEnabled$) {
      const displayType = hide ? 'none' : 'block';
      const elements = document.getElementsByClassName('browser-hidden');
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element instanceof HTMLElement) {
          element.style.display = displayType;
        }
      }
    }
  }
}
export interface DepositInfo {
  depositAmount: number;
  accountId: number;
}
