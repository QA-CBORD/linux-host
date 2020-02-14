import { forwardRef, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { Observable, from } from 'rxjs';

import { ObservableSessionStorageService } from '../observable-session-storage/observable-session-storage.service';

export const OBSERVABLE_STORAGE_PROVIDERS = [
  {
    provide: forwardRef(() => ObservableStorageService),
    deps: [Platform, Storage],
    useFactory(platform: Platform, storage: Storage): ObservableStorageService | ObservableSessionStorageService {
      if (platform.is('desktop')) {
        return new ObservableSessionStorageService();
      }

      return new ObservableStorageService(storage);
    },
  },
];

@Injectable()
export class ObservableStorageService {
  constructor(private _storage: Storage) {}

  get<T>(key: string): Observable<T> {
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
