/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs';
import { StateManager } from '@core/classes/state-manager';

export abstract class ExtendableStateManager<T = { [key: string]: any }> extends StateManager<T> {
  abstract registerStateEntity(key: string, value): void

  abstract deleteStateEntityByKey(key: string): void

  abstract updateStateByKey(key: string, value): void

  abstract getStateEntityByKey$<M>(key: string): Observable<M | StorageEntity<M>>

  abstract isKeyExistInState(key: string): boolean | Promise<boolean>
}

export interface StorageEntity<T = any> {
  lastModified: number;
  timeToLive: number;
  permanent?: boolean;
  value: T;
}
