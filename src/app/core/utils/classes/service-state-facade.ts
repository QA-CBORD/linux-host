import { HttpEvent } from '@angular/common/http';
import { StateManager } from '@core/utils/classes/state-manager';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export abstract class ServiceStateFacade {

  protected makeRequestWithUpdatingStateHandler<T = any>(req: Observable<HttpEvent<T>>, state: StateManager<any>): Observable<HttpEvent<T>> {
    state.addUpdater();
    const removeUpdater = state.removeUpdater.bind(state);
    return req.pipe(tap(removeUpdater, removeUpdater),
    );
  }
}
