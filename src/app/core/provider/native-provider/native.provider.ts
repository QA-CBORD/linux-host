import { NAVIGATE } from './../../../app.global';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { Platform, ModalController, PopoverController, ActionSheetController } from '@ionic/angular';
import { Observable, Observer, from, of } from 'rxjs';
import { X_Y_REGEXP } from '@core/utils/regexp-patterns';

declare var androidInterface: any;

export enum NativeData {
  SESSION_ID = 'getSessionId',
  DESTINATION_PAGE = 'getDestinationPage',
  APPLE_WALLET_INFO = 'getAppleWalletInfo',
  ADD_TO_APPLE_WALLET = 'addToAppleWallet',
  INSTITUTION_ID = 'getInstitutionId',
  USER_INFO = 'getUserInfo',
  USER_PHOTO = 'getAcceptedUserPhoto',
  ADD_TO_USAEPAY = 'addUSAePayCreditCard',
  UPDATE_ROUTE = 'updateNativeWithRoute',
  ORDERS_WITH_APPLE_PAY = 'ordersApplePay',
  DEPOSITS_WITH_APPLE_PAY = 'depositsApplePay',
}
export enum AppleWalletCredentialStatus {
  Disabled = 0,
  Available = 1,
  SuspendRequested = 4,
  Suspended = 5,
  UnlinkRequested = 6,
  DisableRequested = 7,
  ResumeRequested = 8,
  StatusActive = 20
};

export interface USAePayResponse {
  success: boolean;
  errorMessage: string;
}
export interface ApplePayResponse {
  success: boolean;
  errorMessage: string;
  accountId: string;
  selectedAccount?: {accountDisplayName: string};
  amount?: string;
  sourceAcc?:  { accountTender: string };
}
export interface AppleWalletInfo {
  iPhoneProvisioned: boolean;
  watchProvisioned: boolean;
  watchPaired: boolean;
  iPhoneCredStatus: any;
  watchCredStatus: any;
  isAppleWalletEnabled: boolean;
  canAddPass: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NativeProvider {
  private previousRoute: string = '';
  constructor(
    private readonly platform: Platform,
    private readonly router: Router,
    private readonly zone: NgZone,
    private readonly modalController: ModalController,
    private readonly popoverController: PopoverController,
    private readonly actionSheetController: ActionSheetController,
  ) {
    window['NativeInterface'] = this;
  }

  // object for storing references to our promise-objects
  private promises = {};

  isAndroid(): boolean {
    return this.platform.platforms().includes('android') && typeof androidInterface !== 'undefined';
  }

  isIos(): boolean {
    return this.platform.platforms().includes('ios') && typeof window['webkit'] !== 'undefined';
  }

  sendAndroidData<T>(methodName: NativeData, data: T) {
    androidInterface[methodName](data);
  }

  updatePreviousRoute(){
    this.previousRoute = this.router.url;
  }

  getAndroidData<T>(methodName: NativeData): T {
    return androidInterface[methodName]() || null;
  }

  /// get data from native Android in observable form
  private androidObserver: Observer<any>;
  getAndroidDataAsObservable<T>(methodName: NativeData): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this.androidObserver = observer;
      try {
        this.getAndroidData<T>(methodName) || null;
      } catch (error) {
        observer.error(error);
        observer.complete();
      }
    });
  }

  onNativeBackClicked() {
    Promise.all([this.modalController.getTop(), this.popoverController.getTop(), this.actionSheetController.getTop()])
      .then(([modal, popover, actionSheet]) => {
        if (modal) modal.dismiss();
        if (popover) popover.dismiss();
        if (actionSheet) actionSheet.dismiss();
      })
      .finally(() => this.zone.run(() => this.doNativeNavigation()));
  }

  private doNativeNavigation() {
    let url: string = this.router.url;
    let destination: string = NAVIGATE.dashboard;

    for (let n in NAVIGATE) {
      /// if 1 page deep from dashboard, navigate back to dashboard
      destination = url.indexOf(NAVIGATE[n]) >= 0 && url !== `/${NAVIGATE[n]}` ? NAVIGATE[n] : destination;
      /// if beyond initial order page, navigate back to main order page
      destination =
        url.indexOf(`/${NAVIGATE.ordering}/`) >= 0 &&
        url.indexOf('full-menu') < 0 &&
        url.indexOf('recent-orders') < 0 &&
        url.indexOf('saved-addresses') < 0 &&
        url.indexOf('favorite-merchants') < 0
          ? `${NAVIGATE.ordering}/full-menu`
          : destination;

      /// if beyond main accounts page, navigate back to accounts page
      destination = url.indexOf(`/${NAVIGATE.accounts}/`) >= 0 ? NAVIGATE.accounts : destination;

      /// if in add-card page from the deposit page, navigate back to deposit page
      destination = (url.indexOf('add-credit-card') > 0 && this.previousRoute.indexOf('add-funds') > 0) ? 'accounts/add-funds' : destination;

      /// if in add-card page from the cart page, navigate back to cart page
      destination = (url.indexOf('add-credit-card') > 0 && this.previousRoute.indexOf('cart') > 0) ? 'ordering/cart' : destination;

    }
    this.router.navigate(['/' + destination], { skipLocationChange: true });
  }

  /// used to allow user to add USAePay CC and handle response
  addUSAePayCreditCard(): Observable<USAePayResponse> {
    if (this.isAndroid()) {
      return this.getAndroidDataAsObservable<USAePayResponse>(NativeData.ADD_TO_USAEPAY);
    } else if (this.isIos()) {
      return from(this.getIosData(NativeData.ADD_TO_USAEPAY));
    } else {
      return of({ success: false, errorMessage: 'This is not a native device' });
    }
  }

  /// do not use -- for native devices to call only
  addUSAePayCreditCardComplete(response: USAePayResponse) {
    if (this.isAndroid()) {
      this.androidObserver.next(response);
      this.androidObserver.complete();
    }
  }

  /**
   *  Apple Pay
   */
  payWithApplePay(payType: NativeData, moreParams: Object): Observable<ApplePayResponse> {
    if (this.isAndroid()) {
      return of({ success: false, errorMessage: 'Apple Pay does not work on Android.', accountId: null});
    } else if (this.isIos()) {
      return from(this.getIosData(payType, moreParams));
    } else {
      return of({ success: false, errorMessage: 'This is not a native device', accountId: null});
    }
  }

  getIosData(methodName: NativeData, moreParams?: Object): Promise<any> {
    return new Promise((resolve, reject) => {
      // we generate a unique id to reference the promise later
      // from native function
      const promiseId = this.generateUUID();
      // save reference to promise in the global variable
      this.promises[promiseId] = { resolve, reject };
      try {
        this.postAppMessage({ promiseId: promiseId, methodName: methodName, ...moreParams });
      } catch (exception) {
        throw new Error('Error with NativeInterface');
      }
    });
  }

  // generates a unique id, not obligator a UUID
  private generateUUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(X_Y_REGEXP, c => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }

  resolvePromise(promiseId, data, error?) {
    if (error || !data) {
      this.promises[promiseId].reject(error);
    } else {
      this.promises[promiseId].resolve(data);
    }

    // remove reference to stored promise
    delete this.promises[promiseId];
  }

  private postAppMessage(msg) {
    if (this.isIos()) {
      window['webkit'].messageHandlers.JSListener.postMessage(msg);
    } else {
      throw new Error('No NativeInterface exists. Use service.');
    }
  }
}
