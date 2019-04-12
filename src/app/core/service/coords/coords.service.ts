import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { BehaviorSubject, from, Observable } from 'rxjs';

import { MGeoCoordinates } from '../../model/geolocation/geocoordinates.interface';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoordsService {
  private coords: MGeoCoordinates = { longitude: null, accuracy: null, latitude: null };
  private readonly coords$: BehaviorSubject<MGeoCoordinates> = new BehaviorSubject<MGeoCoordinates>(this.coords);

  constructor(private readonly geolocation: Geolocation) {}

  get coordinates(): Observable<MGeoCoordinates> {
    return this.coords$.asObservable();
  }

  private set _coordinates(coords: MGeoCoordinates) {
    this.coords = { ...this.coords, ...coords };
    this.coords$.next({ ...this.coords });
  }

  initCoords(): Observable<MGeoCoordinates> {
    return from<MGeoCoordinates>(
      this.geolocation
        .getCurrentPosition()
        .then(({ coords: { accuracy, latitude, longitude } }: Position) => ({ accuracy, latitude, longitude }))
        .then((coords: MGeoCoordinates) => (this._coordinates = { ...coords }))
    ).pipe(take(1));
  }
}
