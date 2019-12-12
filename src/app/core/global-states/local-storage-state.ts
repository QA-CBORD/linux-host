import { ExtendableStateManager } from '@core/classes/extendable-state-manager';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageState extends ExtendableStateManager<LocalStorageStateEntity> {
  private localStorage: Storage = window.localStorage;
  private lsKey: string = 'cbordIdentifier';
  protected activeUpdaters: number = 0;
  protected state: LocalStorageStateEntity = {};
  protected readonly _state$: BehaviorSubject<LocalStorageStateEntity> = new BehaviorSubject<LocalStorageStateEntity>(this.state);
  protected readonly _isUpdating$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    super();
    this.initState();
  }

  get state$(): Observable<LocalStorageStateEntity> {
    return this._state$.asObservable().pipe(distinctUntilChanged());
  }

  /**Stream which gives information about current
   * updating state use methods 'removeUpdater' and  'addUpdater'
   * to manage 'activeUpdaters'
   *
   * !!! IMPORTANT: It is important to think about corner cases when you
   * are trying to update state asynchronously. Incorrect amount of using these methods
   * might lead to get an infinity state updating indicator
   *  */
  get isUpdating$(): Observable<boolean> {
    return this._isUpdating$.asObservable().pipe(distinctUntilChanged());
  }

  removeUpdater(): void {
    this.activeUpdaters--;
    this.activeUpdaters = this.activeUpdaters < 0 ? 0 : this.activeUpdaters;
    this._isUpdating$.next(!!this.activeUpdaters);
  }

  addUpdater(): void {
    this.activeUpdaters++;
    this._isUpdating$.next(!!this.activeUpdaters);
  }

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
    if (this.isKeyExistInState(key)) return;
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

  private setStateFromLocalStorage() {
    this.state = this.getStateFromLocalStorage();
  }

  private initState(): void {
    this.setStateFromLocalStorage();
    this.setStateToLocalStorage();
  }

  private setStateToLocalStorage(): void {
    this.localStorage.setItem(this.lsKey, JSON.stringify(this.state));
    this.dispatchStateChanges();
  }

  private getStateFromLocalStorage(): LocalStorageStateEntity {
    try {
      const state = JSON.parse(this.localStorage.getItem(this.lsKey));
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

  protected clearState(): void {
    this.state = {};
    this.setStateToLocalStorage();
  }
}

export interface LocalStorageStateEntity {
  [key: string]: any;
}
