import { Injectable, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { from, Observable, BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { MGeoCoordinates } from '../../model/geolocation/geocoordinates.interface';

@Injectable({
  providedIn: 'root',
})
export class CoordsService implements OnDestroy {
  private cordovaAvailable: boolean = false;
  private watchLocationId: number = null;
  private watchLocationSubscription: Subscription;

  private readonly coordinates$: BehaviorSubject<MGeoCoordinates> = new BehaviorSubject<MGeoCoordinates>({
    accuracy: null,
    latitude: null,
    longitude: null,
  });
  private coordinatesInfo: MGeoCoordinates = { accuracy: null, latitude: null, longitude: null };

  constructor(private readonly platform: Platform, private readonly geolocation: Geolocation) {
    this.platform.ready().then(() => {
      this.cordovaAvailable = this.platform.is('cordova') || false;
    });
  }

  ngOnDestroy() {
    this.endWatchLocation();
  }

  get coordinates(): Observable<MGeoCoordinates> {
    return this.coordinates$.asObservable().pipe(take(1));
  }

  private set _coordinates(coordinates: MGeoCoordinates) {
    this.coordinatesInfo = coordinates;
    this.coordinates$.next(this.coordinatesInfo);
  }

  getCoords(): Observable<MGeoCoordinates> {
    if (this.cordovaAvailable) {
      return this.getLocationFromCordova();
    } else {
      return this.getLocationFromBrowser();
    }
  }

  private getLocationFromCordova(): Observable<MGeoCoordinates> {
    return from<MGeoCoordinates>(
      this.geolocation.getCurrentPosition().then(({ coords: { accuracy, latitude, longitude } }: Position) => {
        this._coordinates = { accuracy, latitude, longitude };
        return { accuracy, latitude, longitude };
      })
    ).pipe(take(1));
  }

  private getLocationFromBrowser(): Observable<MGeoCoordinates> {
    return from<MGeoCoordinates>(
      new Promise(resolve => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              resolve(position);
            },
            () => {
              resolve({ coords: { accuracy: null, latitude: null, longitude: null } });
            },
            { timeout: 5000 }
          );
        } else {
          resolve({ coords: { accuracy: null, latitude: null, longitude: null } });
        }
      })
        .then(({ coords: { accuracy, latitude, longitude } }: Position) => {
          this._coordinates = { accuracy, latitude, longitude };
          return { accuracy, latitude, longitude };
        })
        .catch((reason: any) => ({ accuracy: null, latitude: null, longitude: null }))
    ).pipe(take(1));
  }

  startWatchCoords() {
    if (this.cordovaAvailable) {
      this.startWatchLocationFromCordova();
    } else {
      this.startWatchLocationFromBrowser();
    }
  }

  private startWatchLocationFromCordova() {
    this.watchLocationSubscription = this.geolocation
      .watchPosition()
      .subscribe(
        ({ coords: { accuracy, latitude, longitude } }: Position) =>
          (this._coordinates = { accuracy, latitude, longitude }),
        () => {}
      );
  }

  private startWatchLocationFromBrowser() {
    if (navigator.geolocation) {
      this.watchLocationId = navigator.geolocation.watchPosition(
        ({ coords: { accuracy, latitude, longitude } }: Position) =>
          (this._coordinates = { accuracy, latitude, longitude }),
        () => {}
      );
    }
  }

  private endWatchLocation() {
    console.log('EndWatch');
    if (this.cordovaAvailable) {
      if (this.watchLocationSubscription !== null) {
        this.watchLocationSubscription.unsubscribe();
      }
    } else {
      if (navigator.geolocation && this.watchLocationId !== null) {
        navigator.geolocation.clearWatch(this.watchLocationId);
        this.watchLocationId = null;
      }
    }
  }
}
