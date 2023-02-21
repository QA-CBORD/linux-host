/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, of } from 'rxjs';
import { finalize, switchMap, take, tap } from 'rxjs/operators';

import { StateManager } from '@core/classes/state-manager';

export abstract class ServiceStateFacade {

  protected makeRequestWithUpdatingStateHandler<T = any>(req: Observable<T>, state: StateManager<any>): Observable<T> {
    return of(true).pipe(
      tap(() => state.addUpdater()),
      switchMap(() => req),
      finalize(() => state.removeUpdater()),
      take(1)
    );
  }
}
