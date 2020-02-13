import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
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
}
