import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { CoordsService } from '@core/service/coords/coords.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { TIMEZONE_REGEXP } from '@core/utils/regexp-patterns';
import { LocationPermissionsService } from '@sections/dashboard/services/location-permissions.service';
import { MerchantService } from '@sections/ordering';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { forkJoin, from, zip } from 'rxjs';

import { Observable } from 'rxjs/internal/Observable';
import { finalize, map, take } from 'rxjs/operators';
import { CheckingServiceFacade } from '../services/check-in-facade.service';

@Injectable()
export class CheckinPendingResolver implements Resolve<Observable<any>> {
  constructor(
    private readonly merchantService: MerchantService,
    private readonly userFacadeService: UserFacadeService,
    private readonly checkInService: CheckingServiceFacade,
    private readonly commonService: CommonService,
    private readonly loadingService: LoadingService,
    public readonly checkinService: CheckingServiceFacade,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    this.loadingService.showSpinner();
    this.checkInService.getContentStringByName('pickup_info');
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
      map(([contentStrings, data]) => ({
        contentStrings,
        data,
        total,
        orderId,
        orderNew,
        checkNumber,
        mealBased,
      })),
      finalize(() => {
        this.loadingService.closeSpinner();
      })
    );
  }
}
