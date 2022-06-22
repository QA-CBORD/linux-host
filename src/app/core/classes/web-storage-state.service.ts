import { ExtendableStateManager } from '@core/classes/extendable-state-manager';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export class WebStorageState extends ExtendableStateManager<WebStorageStateEntity> {
  protected activeUpdaters = 0;
  protected state: WebStorageStateEntity = {};
  protected readonly _state$: BehaviorSubject<WebStorageStateEntity> = new BehaviorSubject<WebStorageStateEntity>(this.state);
  protected readonly _isUpdating$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.activeUpdaters);

  constructor(protected readonly storage: Storage,
              private readonly storageKey: string = 'cbord') {
    super();
    this.initState();
  }

  /**Stream which gives information about current
   * updating state use methods 'removeUpdater' and  'addUpdater'
   * to manage 'activeUpdaters'
   *
   * !!! IMPORTANT: It is important to think about corner cases when you
   * are trying to update state asynchronously. Incorrect amount of using these methods
   * might lead to get an infinity state updating indicator
   *  */

  getStateEntityByKey$<T>(key: string): Observable<T> {
    if (!this.isKeyExistInState(key)) return EMPTY;

    return this.state$.pipe(
      map(({ [key]: target }) => target),
      distinctUntilChanged(),
    );
  }

  isKeyExistInState(key: string): boolean {
    this.setStateFromLocalStorage();
    return key in this.state;
  }

  registerStateEntity(key: string, value = null): void {
    this.setStateFromLocalStorage();
    this.state = { ...this.state, [key]: JSON.parse(JSON.stringify(value)) };
    this.setStateToLocalStorage();
  }

  updateStateByKey(key: string, value: any): void {
    if (!this.isKeyExistInState(key)) return;
    value = JSON.parse(JSON.stringify(value));
    this.state = { ...this.state, [key]: value };
    this.setStateToLocalStorage();
  }

  deleteStateEntityByKey(key: string): void {
    if (!this.isKeyExistInState(key)) return;
    delete this.state[key];
    this.setStateToLocalStorage();
  }

  protected setStateFromLocalStorage() {
    this.state = this.getStateFromLocalStorage();
  }

  protected initState(): void {
    this.setStateFromLocalStorage();
    this.setStateToLocalStorage();
  }

  protected setStateToLocalStorage(): void {
    this.storage.setItem(this.storageKey, JSON.stringify(this.state));
    this.dispatchStateChanges();
  }

  protected getStateFromLocalStorage(): WebStorageStateEntity {
    try {
      const state = JSON.parse(this.storage.getItem(this.storageKey));
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

  clearState(): void {
    this.state = {};
    this.setStateToLocalStorage();
  }
}

export interface WebStorageStateEntity {
  [key: string]: any;
}
