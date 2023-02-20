import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoordsService } from '@core/service/coords/coords.service';
import { CheckingService } from './check-in-service';
import { first, map, switchMap } from 'rxjs/operators';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';

@Injectable({ providedIn: 'root' })

export class CheckingServiceFacade {
  navedFromCheckin: boolean;

  constructor(
    private readonly contentStringFacade: ContentStringsFacadeService,
    private readonly checkingService: CheckingService,
    private readonly coordsService: CoordsService
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

  getContentStringByName(contentStringName: string): Observable<string> {
    return this.contentStringFacade
      .resolveContentString$(CONTENT_STRINGS_DOMAINS.patronUi, CONTENT_STRINGS_CATEGORIES.checkin, contentStringName)
      .pipe(map((string: ContentStringInfo) => (string ? string.value : '')));
  }

  getContentStringByName$(contentStringName: string): Observable<string> {
    return this.contentStringFacade
      .getContentString$(CONTENT_STRINGS_DOMAINS.patronUi, CONTENT_STRINGS_CATEGORIES.checkin, contentStringName)
      .pipe(map((string: ContentStringInfo) => (string ? string.value : '')));
  }

  checkInOrderByBarcode(
    orderId: string,
    checkinBarcode: string,
  ): Observable<boolean> {
    return this.checkingService.checkInOrder({
      orderId,
      latitude: null,
      longitude: null,
      checkinBarcode,
    });
  }
}
