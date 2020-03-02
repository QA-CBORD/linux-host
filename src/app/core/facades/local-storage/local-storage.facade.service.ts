import { Injectable } from '@angular/core';
import { WebStorageStateEntity } from '@core/classes/web-storage-state.service';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { Observable } from 'rxjs';
import { LocalStorageStateService } from '@core/states/local-storage/local-storage-state.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageFacadeService extends ServiceStateFacade {

  constructor(private readonly localStorageState: LocalStorageStateService ) {
    super();
  }

  get data$(): Observable<WebStorageStateEntity> {
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
