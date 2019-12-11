import { Observable } from 'rxjs';
import { StateManager } from '@core/utils/classes/state-manager';

export abstract class ExtendableStateManager<T = { [key: string]: any }> extends StateManager<T> {
  abstract registerStateEntity(key: string, value): void

  abstract deleteStateEntityByKey(key: string): void

  abstract updateStateByKey(key: string, value): void

  abstract getStateEntityByKey$<M>(key: string): Observable<M>

  abstract isKeyExistInState(key: string): boolean
}
