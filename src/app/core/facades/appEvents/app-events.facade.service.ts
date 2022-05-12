import { Injectable } from '@angular/core';
import { App, AppState, URLOpenListenerEvent } from '@capacitor/app';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppStatesFacadeService {
  protected readonly _appStateChangeEvent$: BehaviorSubject<AppState> = new BehaviorSubject<AppState>({} as AppState);
  protected readonly _appUrlOpenEvent$: BehaviorSubject<URLOpenListenerEvent> = new BehaviorSubject<
    URLOpenListenerEvent
  >({} as URLOpenListenerEvent);

  constructor() {
    /**
     * This list could increase based on requirements
     */
    App.addListener('appStateChange', async appState => (this._appStateChangeEvent = appState));
    App.addListener('appUrlOpen', async appState => (this._appUrlOpenEvent = appState));
  }

  get getStateChangeEvent$(): Observable<AppState> {
    return this._appStateChangeEvent$.asObservable().pipe(filter(state => state !== null));
  }

  private set _appStateChangeEvent(state: AppState) {
    this._appStateChangeEvent$.next(state);
  }

  get getAppUrlOpenEvent$(): Observable<URLOpenListenerEvent> {
    return this._appUrlOpenEvent$.asObservable();
  }

  private set _appUrlOpenEvent(state: URLOpenListenerEvent) {
    this._appUrlOpenEvent$.next(state);
  }
}
