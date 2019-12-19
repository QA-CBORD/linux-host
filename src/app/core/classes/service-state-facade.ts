import { StateManager } from '@core/classes/state-manager';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export abstract class ServiceStateFacade {

  protected makeRequestWithUpdatingStateHandler<T = any>(req: Observable<T>, state: StateManager<any>): Observable<T> {
    const removeUpdater = state.removeUpdater.bind(state);
    return of(true).pipe(
      tap(() => state.addUpdater()),
      switchMap(() => req),
      tap(removeUpdater, removeUpdater),
    );
  }
}
