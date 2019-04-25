import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { from, Observable } from 'rxjs';

import { MGeoCoordinates } from '../../model/geolocation/geocoordinates.interface';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoordsService {
  constructor(private readonly geolocation: Geolocation) {}

  initCoords(): Observable<MGeoCoordinates> {
    return from<MGeoCoordinates>(
      this.geolocation
        .getCurrentPosition()
        .then(({ coords: { accuracy, latitude, longitude } }: Position) => ({ accuracy, latitude, longitude }))
    ).pipe(take(1));
  }
}
