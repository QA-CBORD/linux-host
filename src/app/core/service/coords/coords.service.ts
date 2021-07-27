import { Injectable } from '@angular/core';

import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, skipWhile, take } from 'rxjs/operators';

import { GeolocationPosition, Plugins } from '@capacitor/core';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';

const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class CoordsService {
  private readonly fetchInterval: number = 5000;
  private timestamp: number = 0;

  private latestPosition: GeolocationPosition = {
    timestamp: null,
    coords: {
      accuracy: null,
      latitude: null,
      longitude: null,
    },
  };
  private readonly _location$: BehaviorSubject<GeolocationPosition> = new BehaviorSubject<GeolocationPosition>(
    undefined
  );
  private readonly emptyPosition: GeolocationPosition = {
    timestamp: null,
    coords: {
      accuracy: null,
      latitude: null,
      longitude: null,
    },
  };

  constructor( private readonly navigationFacade: NavigationFacadeSettingsService,) {}

  get location$(): Observable<GeolocationPosition> {
    return this._location$.asObservable().pipe(skipWhile(value => !value));
  }

  set _latestLocation(position: GeolocationPosition) {
    this.latestPosition = { ...position };
    this._location$.next(this.latestPosition);
  }

  /// get device coordinates
  getCoords(): Observable<GeolocationPosition> {
    /// use time delay to request location from device every 5 seconds, otherwise subscribe to behavior subject
    /// this prevents several simultaneous requests to the device
    const timeDiff = new Date().getTime() - this.timestamp;
    if (timeDiff > this.fetchInterval) {
      this.navigationFacade.isFirstNav$.pipe(take(1)).subscribe(isFirst => {
        if (isFirst) {
          this.requestLocationFromDevice();
        }
      });
    }
    return this.location$;
  }

  private requestLocationFromDevice() {

    this.timestamp = new Date().getTime();

    const options = {
      enableHighAccuracy: true,
      timeout: 5,
    };

    from(Geolocation.getCurrentPosition(options))
      .pipe(
        take(1),
        catchError(error => of(this.emptyPosition))
      )
      .subscribe(
        resp => {

          this._latestLocation = resp;
        },
        error => {
          /// clear timestamp and return empty position so we can try another request
          this.timestamp = 0;
          this._latestLocation = this.emptyPosition;
        }
      );
  }
}
