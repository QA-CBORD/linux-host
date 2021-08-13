import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoordsService } from '@core/service/coords/coords.service';
import { CheckingService } from './checkin-service';
import { first, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class CheckingServiceFacade {
   barcodeScanResult: string;
   navedFromCheckin:boolean;

  constructor(
    private readonly checkingService: CheckingService,
    private readonly coordsService: CoordsService,
  ) {}

  checkInOrderByLocation(orderId: string, checkinBarcode: string = null): Observable<any> {
    return this.coordsService.getCoords().pipe(
      first(),
      switchMap(({ coords: { latitude, longitude } }) => {
        return this.checkingService.checkInOrder({
          orderId,
          latitude,
          longitude,
          checkinBarcode,
        });
      })
    );
  }

  checkInOrderByBarcode(
    orderId: string,
    checkinBarcode: string,
    latitude: number = null,
    longitude: number = null
  ): Observable<boolean> {
    return this.checkingService.checkInOrder({
      orderId,
      latitude,
      longitude,
      checkinBarcode,
    });
  }
}
