import { HttpEvent } from '@angular/common/http';
import { StateManager } from '@core/classes/state-manager';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export abstract class ServiceStateFacade {

  protected makeRequestWithUpdatingStateHandler<T = any>(req: Observable<HttpEvent<T>>, state: StateManager<any>): Observable<HttpEvent<T>> {
    const removeUpdater = state.removeUpdater.bind(state);
    return of(true).pipe(
      tap(() => state.addUpdater()),
      switchMap(() => req),
      tap(removeUpdater, removeUpdater),
    );
  }
}
