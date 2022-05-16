import { AppState, URLOpenListenerEvent } from '@capacitor/app';
import { Observable, of } from 'rxjs';

export class MockAppEventsService {
  state: AppState = {
    isActive: true,
  };

  urlOpen: URLOpenListenerEvent = {
    url: 'https://www.cbord.com/',
  };

  get getStateChangeEvent$(): Observable<AppState> {
    return of(this.state);
  }
  get getAppUrlOpenEvent$(): Observable<URLOpenListenerEvent> {
    return of(this.urlOpen);
  }
}
