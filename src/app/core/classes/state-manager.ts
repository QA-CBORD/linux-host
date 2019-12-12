import { BehaviorSubject, Observable } from 'rxjs';

export abstract class StateManager<T> {
  protected abstract state: T;
  protected abstract activeUpdaters: number;
  protected abstract readonly _state$: BehaviorSubject<T>;
  protected abstract readonly _isUpdating$: BehaviorSubject<boolean>;

  abstract get state$(): Observable<T>

  abstract get isUpdating$(): Observable<boolean>

  abstract addUpdater(): void

  abstract removeUpdater(): void

  protected abstract clearState(): void

  protected abstract dispatchStateChanges(): void
}
