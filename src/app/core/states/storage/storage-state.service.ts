/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { ExtendableStateManager, StorageEntity } from '@core/classes/extendable-state-manager';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { distinctUntilChanged, map, skipWhile } from 'rxjs/operators';
import { Preferences as Storage } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';
import { ObservableSessionStorageService, ObservableStorage, ObservableStorageService } from '@shared/services';
@Injectable({
  providedIn: 'root',
})
export class StorageStateService extends ExtendableStateManager<WebStorageStateEntity> {
  protected activeUpdaters = 0;
  protected state: WebStorageStateEntity = {};
  protected readonly _state$: BehaviorSubject<WebStorageStateEntity> = new BehaviorSubject<WebStorageStateEntity>(
    this.state
  );
  protected readonly _isUpdating$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.activeUpdaters);
  private readonly storageKey: string = 'cbord_gcs';
  private readonly storage = Storage; //TODO:  Remove ionic/preferences  after v4.25
  private isStateInitialized = false;
  private _observableStorage: ObservableStorage;

  constructor(
    private readonly platform: Platform,
    private _observableStorageService: ObservableStorageService,
    private _observableSessionStorageService: ObservableSessionStorageService
  ) {
    super();

    this._observableStorage = this.platform.is('desktop')
      ? this._observableSessionStorageService
      : this._observableStorageService;

    this.initialization();
  }

  initialization() {
    Storage.migrate(); //TODO: try to use Storage.removeOld() when all users migrates to newversion.
    this.initState();
    this.initSaveStorageListeners();
  }

  getStateEntityByKey$<T>(key: string): Observable<StorageEntity<T>> {
    return this.state$.pipe(
      skipWhile(() => !this.isStateInitialized),
      map(state => (state[key] ? state[key] : null)),
      distinctUntilChanged()
    );
  }

  isKeyExistInState(key: string): boolean {
    return key in this.state;
  }

  updateStateEntity(key: string, value: any, entityConfig: EntityConfig = {}) {
    this.isKeyExistInState(key)
      ? this.updateStateByKey(key, value, entityConfig.ttl, entityConfig.keepOnLogout)
      : this.registerStateEntity(key, value, entityConfig.ttl, entityConfig.keepOnLogout);
    if (entityConfig.highPriorityKey) {
      this.setStateToStorage();
    }
  }

  registerStateEntity(key: string, value = null, timeToLive = 0, permanent?: boolean) {
    const storageEntity = { value, lastModified: Date.now(), timeToLive, permanent };
    this.state = { ...this.state, [key]: this.deepObjectCopy(storageEntity) };
    this.dispatchStateChanges();
  }

  updateStateByKey(key: string, value: any, timeToLive?: number, permanent?: boolean) {
    const entity = this.state[key];
    const ttl: number = timeToLive !== undefined ? timeToLive : 'timeToLive' in entity ? entity.timeToLive : 0;
    const storageEntity = {
      value,
      lastModified: Date.now(),
      timeToLive: ttl,
      permanent: permanent,
    };
    this.state = { ...this.state, [key]: this.deepObjectCopy(storageEntity) };
    this.dispatchStateChanges();
  }

  async deleteStateEntityByKey(key: string, clearPermanent?: boolean) {
    if (!this.isKeyExistInState(key)) return;
    delete this.state[key];
    if (clearPermanent) {
      this.setStateToStorage();
    }
    this.dispatchStateChanges();
  }

  protected async initState(): Promise<void> {
    this.state = await this.getStateFromIonicStorage();

    // Remove this lines after v4.25, we don't need to use ionic/prefereces anymore.
    if (Object.keys(this.state).length === 0) {
      this.state = await this.getStateFromLocalStorage();
    }

    this.isStateInitialized = true;
    await this.setStateToStorage();
  }

  protected async setStateToStorage(): Promise<void> {
    this._observableStorage.set(this.storageKey, this.convertIntoStr(this.state));
    this.dispatchStateChanges();
  }

  //TODO:  Remove this method after v4.25, we don't need to use ionic/prefereces anymore.
  protected async getStateFromLocalStorage(): Promise<WebStorageStateEntity> {
    const { value } = await this.storage.get({ key: this.storageKey });
    try {
      const state = this.convertIntoObject(value);
      if (typeof state === 'object' && state !== null && state.__proto__ === Object.prototype) {
        return state;
      }
      return {};
    } catch (e) {
      return {};
    }
  }

  protected async getStateFromIonicStorage(): Promise<WebStorageStateEntity> {
    await this._observableStorage.init();
    const value = await lastValueFrom(this._observableStorage.get(this.storageKey));
    try {
      const state = this.convertIntoObject(value);
      if (typeof state === 'object' && state !== null && state.__proto__ === Object.prototype) {
        return state;
      }
      return {};
    } catch (e) {
      return {};
    }
  }

  protected dispatchStateChanges(): void {
    this._state$.next({ ...this.state });
  }

  async clearStorage(): Promise<void> {
    const state = await this.getStateFromIonicStorage();

    const tempData: Array<{ key: string; data: StorageEntity }> = [];
    Object.entries(state).forEach(([key, value]) => value.permanent && tempData.push({ key: key, data: value }));

    await lastValueFrom(this._observableStorage.clear());

    tempData.forEach(({ key, data }) =>
      this.updateStateEntity(key, data.value, { highPriorityKey: true, ttl: data.timeToLive, keepOnLogout: true })
    );
  }

  clearState() {
    this.state = {};
    this.dispatchStateChanges();
  }

  private deepObjectCopy(value) {
    const str = this.convertIntoStr(value);
    return this.convertIntoObject(str);
  }

  private convertIntoStr(value): string {
    return JSON.stringify(value, this.stringifyMapHandler);
  }

  private convertIntoObject(value) {
    return JSON.parse(value, this.parseMapHandler);
  }

  private initSaveStorageListeners() {
    this.platform.pause.subscribe(async () => await this.setStateToStorage());
    window.onbeforeunload = async () => await this.setStateToStorage();
  }

  private stringifyMapHandler(key: string, value: any): any {
    let convertedMap;
    const originalObject = this[key];
    if (originalObject && originalObject.value && originalObject.value.map instanceof Map) {
      convertedMap = {
        dataType: 'Map',
        value: Array.from(originalObject.value.map.entries()),
      };
      return { ...originalObject, value: { list: originalObject.value.list, map: convertedMap } };
    } else {
      return value;
    }
  }

  private parseMapHandler(key: string, value: any): any {
    if (typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }
}

export interface WebStorageStateEntity {
  [key: string]: StorageEntity;
}

interface EntityConfig {
  ttl?: number;
  highPriorityKey?: boolean;
  keepOnLogout?: boolean;
}
