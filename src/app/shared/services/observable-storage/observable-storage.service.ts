/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, from } from 'rxjs';

export interface ObservableStorage {
  get(key: string): Observable<any>;
  set(key: string, value: any): Observable<any>;
  remove(key: string): Observable<any>;
  clear(): Observable<void>;
  init(): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class ObservableStorageService implements ObservableStorage {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  get(key: string): Observable<any> {
    return from(this._storage?.get(key));
  }

  set(key: string, value: any): Observable<any> {
    return from(this._storage?.set(key, value));
  }

  remove(key: string): Observable<any> {
    return from(this._storage?.remove(key));
  }

  clear(): Observable<void> {
    return from(this._storage?.clear());
  }
}
