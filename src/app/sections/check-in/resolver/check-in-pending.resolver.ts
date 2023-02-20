import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { TIMEZONE_REGEXP } from '@core/utils/regexp-patterns';
import { MerchantService } from '@sections/ordering';
import { MerchantSettings } from '@sections/ordering/ordering.config';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { forkJoin, zip } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { finalize, map, switchMap, take } from 'rxjs/operators';
import { CheckingServiceFacade } from '../services/check-in-facade.service';

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class CheckinPendingResolver implements Resolve<Observable<any>> {
  constructor(
    private readonly merchantService: MerchantService,
    private readonly userFacadeService: UserFacadeService,
    private readonly checkInService: CheckingServiceFacade,
    private readonly commonService: CommonService,
    private readonly loadingService: LoadingService,
    public readonly checkinService: CheckingServiceFacade
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    this.loadingService.showSpinner();
    this.checkInService.getContentStringByName('pickup_info');
    const checkinPending$ = this.commonService.loadContentString(ContentStringCategory.checkin);
    const dueTime = route.queryParams.dueTime;
    const merchantId = route.queryParams.merchantId;
    const total = route.queryParams.total;
    const orderId = route.queryParams.orderId;
    const isExistingOrder = route.queryParams.isExistingOrder;
    const checkNumber = route.queryParams.checkNumber;
    const orderType = route.queryParams.type;
    const orderPayment = route.queryParams.orderPayment;
    const pickupAddressId = route.queryParams.pickupAddressId;

    const data$ = zip(this.userFacadeService.getUserData$(), this.merchantService.menuMerchants$).pipe(
      switchMap(([user, merchants]) => {
        const merchant = merchants.find(({ id }) => id == merchantId);
        const { settings } = merchant;
        return this.merchantService
          .retrievePickupLocations(merchant.storeAddress, settings.map[MerchantSettings.pickupLocationsEnabled])
          .pipe(
            map(pickupLocations => {
              const address = pickupLocations.find(({ addressInfo }) => addressInfo && addressInfo.id == pickupAddressId);
              const storeAddress = (address && address.addressInfo) || merchant.storeAddress;
              return [ user, merchant, storeAddress];
            })
          );
      }),
      map(([{ locale, timeZone }, merchant, storeAddress]) => {
        const { orderTypes } = merchant;
        const date = new Date(dueTime.replace(TIMEZONE_REGEXP, '$1:$2'));
        const pickupTime = date.toLocaleString(locale, { hour12: false, timeZone });
        return { merchant, orderType, storeAddress, pickupTime: { dueTime: pickupTime }, orderTypes };
      })
    );

    return forkJoin([checkinPending$, data$]).pipe(
      take(1),
      map(([contentStrings, data]) => ({
        contentStrings,
        data,
        total,
        orderId,
        orderPayment,
        isExistingOrder,
        checkNumber,
      })),
      finalize(() => {
        this.loadingService.closeSpinner.bind(this.loadingService);
      })
    );
  }
}
