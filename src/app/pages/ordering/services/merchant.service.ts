import { MerchantInfo, MerchantSearchOption, OrderInfo } from '../shared/models';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, zip } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { OrderingApiService } from './ordering.api.service';

import { MerchantSearchOptions } from '../utils';
import { MerchantSearchOptionName } from '../ordering.config';
import { UserService } from 'src/app/core/service/user-service/user.service';

@Injectable()
export class MerchantService {
  private menuMerchants: MerchantInfo[] = [];
  private recentOrders: OrderInfo[] = [];

  private readonly _menuMerchants$: BehaviorSubject<MerchantInfo[]> = new BehaviorSubject<MerchantInfo[]>([]);
  private readonly _recentOrders$: BehaviorSubject<OrderInfo[]> = new BehaviorSubject<OrderInfo[]>([]);

  constructor(private readonly orderingApiService: OrderingApiService, private readonly userService: UserService) {}

  get menuMerchants$(): Observable<MerchantInfo[]> {
    return this._menuMerchants$.asObservable();
  }

  private set _menuMerchants(value: MerchantInfo[]) {
    this.menuMerchants = [...value];
    this._menuMerchants$.next([...this.menuMerchants]);
  }

  get recentOrders$(): Observable<OrderInfo[]> {
    return this._recentOrders$.asObservable();
  }

  private set _recentOrders(value: OrderInfo[]) {
    this.recentOrders = [...value];
    this._recentOrders$.next([...this.recentOrders]);
  }

  getMenuMerchants(): Observable<MerchantInfo[]> {
    const searchOptions: MerchantSearchOptions = new MerchantSearchOptions();
    const op: MerchantSearchOption = {
      key: MerchantSearchOptionName.INCLUDE_SETTINGS,
      value: 1,
    };

    searchOptions.addSearchOption(op);

    return this.orderingApiService
      .getMenuMerchants(searchOptions)
      .pipe(tap(merchantList => (this._menuMerchants = merchantList)));
  }

  getMerchantsWithFavoriteInfo(): Observable<MerchantInfo[]> {
    const searchOptions: MerchantSearchOptions = new MerchantSearchOptions();
    searchOptions.addSearchOption({
      key: MerchantSearchOptionName.INCLUDE_SETTINGS,
      value: 1,
    });

    let resultHandler = (favoriteMerchants: string[], merchantList: MerchantInfo[]): MerchantInfo[] => {
      if (!favoriteMerchants || favoriteMerchants.length <= 0) {
        this._menuMerchants = merchantList;
        return merchantList;
      }
      merchantList.forEach(merchant => (merchant.isFavorite = favoriteMerchants.includes(merchant.id)));
      this._menuMerchants = merchantList;
      return merchantList;
    };

    return zip(
      this.orderingApiService.getFavoriteMerchants(),
      this.orderingApiService.getMenuMerchants(searchOptions),
      resultHandler
    );
  }

  getRecentOrders(): Observable<OrderInfo[]> {
    return this.userService.userData.pipe(
      switchMap(({ id, institutionId }) =>
        zip(
          this.orderingApiService.getSuccessfulOrdersList(id, institutionId),
          this.getMenuMerchants(),
          (orders, merchants) =>
            orders.map(order => ({ ...order, merchantName: merchants.find(({ id }) => id === order.merchantId).name }))
        )
      ),
      tap(recentOrders => (this._recentOrders = recentOrders))
    );
  }

  getMerchantOrderSchedule(merchantId: string, orderType: number): Observable<any[]> {
    return this.orderingApiService.getMerchantOrderSchedule(merchantId, orderType);
  }
}
