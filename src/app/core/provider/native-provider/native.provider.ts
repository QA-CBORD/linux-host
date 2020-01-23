import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable, Observer, from, of } from 'rxjs';

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
}

@Injectable({
  providedIn: 'root',
})
export class NativeProvider {
  constructor(private readonly platform: Platform) {
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

  getAndroidData<T>(methodName: NativeData): T {
    return androidInterface[methodName]() || null;
  }

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

  /// I'd like this to return an observable
   addUSAePayCreditCard(): Observable<boolean> {
    if(this.isAndroid()){
      return this.getAndroidDataAsObservable<boolean>(NativeData.ADD_TO_USAEPAY);
    } else if(this.isIos()){
      return from(this.getIosData(NativeData.ADD_TO_USAEPAY));
    } else {
      return of(false);
    }
  }

  addUSAePayCreditCardComplete(success: boolean) {
    if(this.isAndroid()){
      this.androidObserver.next(success);
      this.androidObserver.complete();
    }
  }

  getIosData(methodName: NativeData): Promise<any> {
    return new Promise((resolve, reject) => {
      // we generate a unique id to reference the promise later
      // from native function
      const promiseId = this.generateUUID();
      // save reference to promise in the global variable
      this.promises[promiseId] = { resolve, reject };
      try {
        this.postAppMessage({ promiseId: promiseId, methodName: methodName });
      } catch (exception) {
        throw new Error('Error with NativeInterface');
      }
    });
  }

  // generates a unique id, not obligator a UUID
  private generateUUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }

  resolvePromise(promiseId, data, error?) {
    if (error || !data) {
      this.promises[promiseId].reject(data);
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
