/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

import { ObservableStorage } from '../observable-storage/observable-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ObservableSessionStorageService implements ObservableStorage {
  get(key: string): Observable<any> {
    return new Observable((subscriber: Subscriber<any>) => {
      const stringifiedValue: string = window.sessionStorage.getItem(key);
      const value: any = JSON.parse(stringifiedValue);

      subscriber.next(value);
      subscriber.complete();
    });
  }

  set(key: string, value: any): Observable<any> {
    return new Observable((subscriber: Subscriber<any>) => {
      const stringifiedValue: any = JSON.stringify(value);

      window.sessionStorage.setItem(key, stringifiedValue);

      subscriber.next(value);
      subscriber.complete();
    });
  }

  remove(key: string): Observable<any> {
    return new Observable((subscriber: Subscriber<any>) => {
      window.sessionStorage.removeItem(key);

      subscriber.next();
      subscriber.complete();
    });
  }

  clear(): Observable<void> {
    return new Observable((subscriber: Subscriber<void>) => {
      window.sessionStorage.clear();

      subscriber.next();
      subscriber.complete();
    });
  }
}
