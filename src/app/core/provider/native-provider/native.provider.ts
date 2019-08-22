import { Injectable } from '@angular/core';

declare var androidInterface: any;

export enum NativeData {
  SESSION_ID = 'getSessionId',
  DESTINATION_PAGE = 'getDestinationPage',
  INSTITUTION_ID = 'getInstitutionId',
  USER_INFO = 'getUserInfo',
  USER_PHOTO = 'getAcceptedUserPhoto',
}

@Injectable({
  providedIn: 'root',
})
export class NativeProvider {

  constructor() {
    window['NativeInterface'] = this;
  }

  // object for storing references to our promise-objects
  private promises = {};

  getData(dataType: NativeData): Promise<any> {
    return this.getNativeData(dataType);
  }

  private getNativeData(methodName: string): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      // we generate a unique id to reference the promise later
      // from native function
      const promiseId = this.generateUUID();
      // save reference to promise in the global variable
      this.promises[promiseId] = { resolve, reject };
      try {
        this.postAppMessage({ promiseId: promiseId, methodName: methodName });
      } catch (exception) {
        reject(exception);
      }
    });
    return promise;
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
    if (window['webkit'] && window['webkit'].messageHandlers.JSListener) {
      window['webkit'].messageHandlers.JSListener.postMessage(msg);
    } else if (androidInterface) {
      this.resolvePromise(msg.promiseId, androidInterface[msg.methodName]());
    } else {
      throw new Error('No NativeInterface exists. Use service.');
    }
  }
}
