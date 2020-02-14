import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class ObservableSessionStorageService {
  get<T>(key: string): Observable<T> {
    return new Observable((subscriber: Subscriber<T>) => {
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
    return new Observable((subscriber: Subscriber<void>) => {
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
