import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { from, Observable, of } from 'rxjs';
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
      return from<MGeoCoordinates>(
        this.geolocation
          .getCurrentPosition()
          .then(({ coords: { accuracy, latitude, longitude } }: Position) => ({ accuracy, latitude, longitude }))
      ).pipe(take(1));
    } else {
      return from<MGeoCoordinates>(
        new Promise(function(resolve, reject) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              position => {
                resolve(position);
              },
              () => {
                resolve({ coords: { accuracy: NaN, latitude: NaN, longitude: NaN } });
              }
            );
          } else {
            resolve({ coords: { accuracy: NaN, latitude: NaN, longitude: NaN } });
          }
        }).then(({ coords: { accuracy, latitude, longitude } }: Position) => ({ accuracy, latitude, longitude }))
      ).pipe(take(1));
    }
  }
}
