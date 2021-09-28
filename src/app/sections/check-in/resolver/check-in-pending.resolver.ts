import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { CoordsService } from '@core/service/coords/coords.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { TIMEZONE_REGEXP } from '@core/utils/regexp-patterns';
import { MerchantService } from '@sections/ordering';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { forkJoin, of, zip } from 'rxjs';

import { Observable } from 'rxjs/internal/Observable';
import { catchError, first, map, take, tap } from 'rxjs/operators';
import { CheckingContentCsModel } from '../contents-strings/check-in-content-string.model';
import { CheckingServiceFacade } from '../services/checkin-facade.service';

@Injectable()
export class CheckinPendingResolver implements Resolve<Observable<any>> {
  constructor(
    private readonly merchantService: MerchantService,
    private readonly userFacadeService: UserFacadeService,
    private readonly checkInService: CheckingServiceFacade,
    private readonly coordsService: CoordsService,
    private readonly commonService: CommonService,
    private readonly loadingService: LoadingService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    this.checkInService.getContentStringByName('pickup_info');
    let locationPermissionDisabled = true;

    (async () => {
      try {
        const {
          coords: { latitude, longitude },
        } = await this.coordsService
          .getCoords()
          .pipe(first())
          .toPromise();
        locationPermissionDisabled = !(latitude && longitude);
      } catch (error) {}
    })();

    const checkinPending$ = this.commonService.loadContentString(ContentStringCategory.checkin);
    const dueTime = route.queryParams.dueTime;
    const merchantId = route.queryParams.merchantId;
    const total = route.queryParams.total;
    const orderId = route.queryParams.orderId;
    const orderNew = route.queryParams.orderNew;
    const checkNumber = route.queryParams.checkNumber;
    const mealBased = route.queryParams.mealBased;
    const data$ = zip(this.userFacadeService.getUserData$(), this.merchantService.menuMerchants$).pipe(
      map(([{ locale, timeZone }, merchants]) => {
        const { storeAddress, orderTypes } = merchants.find(({ id }) => id == merchantId);
        const date = new Date(dueTime.replace(TIMEZONE_REGEXP, '$1:$2'));
        const pickupTime = date.toLocaleString(locale, { hour12: false, timeZone });
        return { storeAddress, pickupTime: { dueTime: pickupTime }, orderTypes };
      })
    );

    return forkJoin(checkinPending$, data$).pipe(
      take(1),
      tap(() => {
        this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner();
      }),
      map(([contentStrings, data]) => ({
        contentStrings,
        data,
        locationPermissionDisabled,
        total,
        orderId,
        orderNew,
        checkNumber,
        mealBased,
      }))
    );
  }
}
