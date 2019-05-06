import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';

import { from, Observable, of, throwError } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { MGeoCoordinates } from '../../model/geolocation/geocoordinates.interface';

@Injectable({
  providedIn: 'root',
})
export class CoordsService {
  private cordovaAvailable: boolean = false;
  private readonly timeoutOfGettingPosition: number = 5000;
  private readonly emptyPosition = { accuracy: null, latitude: null, longitude: null };

  constructor(private readonly platform: Platform, private readonly geolocation: Geolocation) {
    this.platform.ready().then(() => {
      this.cordovaAvailable = this.platform.is('cordova');
    });
  }

  getCoords(options?: GeolocationOptions): Observable<MGeoCoordinates> {
    return this.cordovaAvailable ? this.getLocationFromCordova(options) : this.getLocationFromBrowser(options);
  }

  startWatchCoords(options?: GeolocationOptions): Observable<MGeoCoordinates> {
    return this.cordovaAvailable
      ? this.startWatchLocationFromCordova(options)
      : this.startWatchLocationFromBrowser(options);
  }

  private getLocationFromCordova(options?: GeolocationOptions): Observable<MGeoCoordinates> {
    options = options && options.timeout ? options : { timeout: this.timeoutOfGettingPosition };

    return from<MGeoCoordinates>(
      this.geolocation
        .getCurrentPosition(options)
        .then(
          ({ coords: { accuracy, latitude, longitude } }: Position) => ({ accuracy, latitude, longitude }),
          () => this.emptyPosition
        )
    ).pipe(take(1));
  }

  private getLocationFromBrowser(options?: GeolocationOptions): Observable<MGeoCoordinates> {
    options = options && options.timeout ? options : { timeout: this.timeoutOfGettingPosition };

    if (!navigator.geolocation) return of(this.emptyPosition).pipe(take(1));

    return Observable.create(observer => {
      const onSuccess = ({ coords: { latitude, longitude, accuracy } }: Position) => {
        observer.next({ latitude, longitude, accuracy });
        observer.complete();
      };

      const onError = () => {
        observer.next(this.emptyPosition);
        observer.complete();
      };

      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    });
  }

  private startWatchLocationFromCordova(options?: GeolocationOptions): Observable<MGeoCoordinates> {
    return this.geolocation
      .watchPosition(options)
      .pipe(map(({ coords: { longitude, accuracy, latitude } }: Geoposition) => ({ longitude, accuracy, latitude })));
  }

  private startWatchLocationFromBrowser(options?: GeolocationOptions): Observable<MGeoCoordinates> {
    if (!navigator.geolocation) return throwError('Unavailable option');

    return Observable.create(observer => {
      const onSuccess = ({ coords: { latitude, longitude, accuracy } }: Position) => {
        observer.next({ latitude, longitude, accuracy });
      };
      const onError = error => {
        observer.error(error);
      };
      const watcher: number = navigator.geolocation.watchPosition(onSuccess, onError, options);

      return () => {
        navigator.geolocation.clearWatch(watcher);
      };
    });
  }
}
