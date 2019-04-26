import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { from, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { MGeoCoordinates } from '../../model/geolocation/geocoordinates.interface';

@Injectable({
  providedIn: 'root',
})
export class CoordsService {
  private cordovaAvailable: boolean = false;

  constructor(private readonly platform: Platform, private readonly geolocation: Geolocation) {
    this.platform.ready().then(() => {
      this.cordovaAvailable = this.platform.is('cordova') || false;
    });
  }

  initCoords(): Observable<MGeoCoordinates> {
    if (this.cordovaAvailable) {
      return this.getLocationFromCordova();
    } else {
      return this.getLocationFromBrowser();
    }
  }

  private getLocationFromCordova(): Observable<MGeoCoordinates> {
    return from<MGeoCoordinates>(
      this.geolocation
        .getCurrentPosition()
        .then(({ coords: { accuracy, latitude, longitude } }: Position) => ({ accuracy, latitude, longitude }))
    ).pipe(take(1));
  }

  private getLocationFromBrowser(): Observable<MGeoCoordinates> {
    return from<MGeoCoordinates>(
      new Promise(function(resolve) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              resolve(position);
            },
            () => {
              resolve({ coords: { accuracy: null, latitude: null, longitude: null } });
            }
          );
        } else {
          resolve({ coords: { accuracy: null, latitude: null, longitude: null } });
        }
      }).then(({ coords: { accuracy, latitude, longitude } }: Position) => ({ accuracy, latitude, longitude }))
    ).pipe(take(1));
  }
}
