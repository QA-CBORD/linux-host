import { InjectionToken, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { Observable, from } from 'rxjs';

import { ObservableSessionStorageService } from '../observable-session-storage/observable-session-storage.service';

export interface ObservableStorage {
  get(key: string): Observable<any>;
  set(key: string, value: any): Observable<any>;
  remove(key: string): Observable<any>;
  clear(): Observable<void>;
}

export const OBSERVABLE_STORAGE_TOKEN: InjectionToken<ObservableStorage> = new InjectionToken<any>(
  'OBSERVABLE_STORAGE'
);

export const OBSERVABLE_STORAGE_PROVIDERS = [
  {
    provide: OBSERVABLE_STORAGE_TOKEN,
    deps: [Platform, Storage],
    useFactory(platform: Platform, storage: Storage): ObservableStorage {
      if (platform.is('desktop')) {
        return new ObservableSessionStorageService();
      }

      return new ObservableStorageService(storage);
    },
  },
];

@Injectable()
export class ObservableStorageService implements ObservableStorage {
  constructor(private _storage: Storage) {}

  get(key: string): Observable<any> {
    return from(this._storage.get(key));
  }

  set(key: string, value: any): Observable<any> {
    return from(this._storage.set(key, value));
  }

  remove(key: string): Observable<any> {
    return from(this._storage.remove(key));
  }

  clear(): Observable<void> {
    return from(this._storage.clear());
  }
}
