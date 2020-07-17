import { Injectable } from '@angular/core';
import { ExtendableStateManager, StorageEntity } from '@core/classes/extendable-state-manager';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, skipWhile } from 'rxjs/operators';
import { Storage } from '@capacitor/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class StorageStateService extends ExtendableStateManager<WebStorageStateEntity> {
  protected activeUpdaters: number = 0;
  protected state: WebStorageStateEntity = {};
  protected readonly _state$: BehaviorSubject<WebStorageStateEntity> = new BehaviorSubject<WebStorageStateEntity>(
    this.state
  );
  protected readonly _isUpdating$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.activeUpdaters);
  private readonly storageKey: string = 'cbord';
  private readonly storage = Storage;
  private isStateInitialized: boolean = false;

  constructor(private readonly platform: Platform) {
    super();
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
      ? this.updateStateByKey(key, value, entityConfig.ttl)
      : this.registerStateEntity(key, value, entityConfig.ttl);
    if (entityConfig.highPriorityKey) {
      this.setStateToStorage();
    }
  }

  registerStateEntity(key: string, value = null, timeToLive = 0) {
    const storageEntity = { value, lastModified: Date.now(), timeToLive };
    this.state = { ...this.state, [key]: this.deepObjectCopy(storageEntity) };
    this.dispatchStateChanges();
  }

  updateStateByKey(key: string, value: any, timeToLive?: number) {
    const entity = this.state[key];
    const ttl: number = timeToLive !== undefined ? timeToLive : 'timeToLive' in entity ? entity.timeToLive : 0;
    const storageEntity = {
      value,
      lastModified: Date.now(),
      timeToLive: ttl,
    };
    this.state = { ...this.state, [key]: this.deepObjectCopy(storageEntity) };
    this.dispatchStateChanges();
  }

  async deleteStateEntityByKey(key: string) {
    if (!this.isKeyExistInState(key)) return;
    delete this.state[key];
    this.dispatchStateChanges();
  }

  protected async getStateFromStorage(): Promise<void> {
    this.state = await this.getStateFromLocalStorage();
  }

  protected async initState(): Promise<void> {
    await this.getStateFromStorage()
      .then(() => (this.isStateInitialized = true))
      .then(() => this.setStateToStorage());
  }

  protected async setStateToStorage(): Promise<void> {
    const storageObject = { key: this.storageKey, value: this.convertIntoStr(this.state) };
    await this.storage.set(storageObject);
    this.dispatchStateChanges();
  }

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

  protected dispatchStateChanges(): void {
    this._state$.next({ ...this.state });
  }

  clearStorage() {
    this.storage.clear();
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
}
