import { Injectable } from '@angular/core';
import { LocalStorageState, LocalStorageStateEntity } from '@core/state/local-storage-state';
import { ServiceStateFacade } from '@core/utils/classes/service-state-facade';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageFacadeService extends ServiceStateFacade {

  constructor(private readonly localStorageState: LocalStorageState ) {
    super();
  }

  get data$(): Observable<LocalStorageStateEntity> {
    return this.localStorageState.state$;
  }

  getStorageEntityByKey$<T>(key: string): Observable<T> {
    return this.localStorageState.getStateEntityByKey$<T>(key);
  }

  isKeyInStorage(key: string): boolean {
    return this.localStorageState.isKeyExistInState(key)
  }

  addKeyToStorage(key: string, value: any) {
    this.localStorageState.registerStateEntity(key, value);
  }

  updateStorageEntityByKey(key: string, value: any) {
    this.localStorageState.updateStateByKey(key, value);
  }

  removeStorageEntityByKey(key: string) {
    this.localStorageState.deleteStateEntityByKey(key);
  }

}
