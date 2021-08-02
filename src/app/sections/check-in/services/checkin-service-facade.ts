import { Injectable } from '@angular/core';
import { CoordsService } from '@core/service/coords/coords.service';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { Observable, of } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { CheckingContentCsModel } from '../contents-strings/checkin-content-string.model';
import { CheckingService } from './checkin-service';

@Injectable({ providedIn: 'root' })
export class CheckingServiceFacade {
  constructor(
    private readonly checkingService: CheckingService,
    private readonly coordsService: CoordsService,
    private readonly commonService: CommonService
  ) {}

  /**
   * solo se llama al cargar el primer componente del flow de checking
   * @returns
   */
  loadAllContentString(): Observable<CheckingContentCsModel> {
    return this.commonService.loadContentString(ContentStringCategory.checkin);
  }

  /**
   * llamar desde cualquier component del flow de checking
   * @returns
   */
  getContent(): CheckingContentCsModel {
    return this.commonService.getString(ContentStringCategory.checkin);
  }

  locationPermissionDisabled(): Observable<boolean> {
    return this.coordsService.getCoords().pipe(
      first(),
      map(({ coords: { latitude, longitude } }) => !(latitude && longitude)),
      catchError((err) => {
        console.log('GOT ERROR: ', err)
        return of(true);
      })
    );
  }

  checkInOrder(orderId: string, checkinBarcode: string = null): Observable<any> {
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
}
