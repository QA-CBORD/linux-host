import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export abstract class StateManager<T> {
  protected abstract state: T;
  protected abstract activeUpdaters: number;
  protected abstract readonly _state$: BehaviorSubject<T>;
  protected abstract readonly _isUpdating$: BehaviorSubject<boolean>;

  get state$(): Observable<T> {
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

  addUpdater() {
    this.activeUpdaters++;
    this._isUpdating$.next(!!this.activeUpdaters);
  }

  removeUpdater() {
    this.activeUpdaters--;
    this.activeUpdaters = this.activeUpdaters < 0 ? 0 : this.activeUpdaters;
    this._isUpdating$.next(!!this.activeUpdaters);
  }

  abstract clearState(): void

  protected abstract dispatchStateChanges(): void
}
