/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MerchantInfo,
  MerchantSearchOption,
  OrderInfo,
  BuildingInfo,
  MenuInfo,
  MerchantAccountInfoList,
  MenuItemInfo,
  MerchantOrderTypesInfo,
  MerchantSettingInfo,
  ItemsOrderInfo,
} from '../shared/models';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';

import { BehaviorSubject, Observable, zip, of, iif } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';

import { OrderingApiService } from './ordering.api.service';

import { MerchantSearchOptions } from '../utils';
import { MerchantSearchOptionName, MerchantSettings, PAYMENT_SYSTEM_TYPE } from '../ordering.config';
import { AddressInfo } from '@core/model/address/address-info';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { UserAccount } from '@core/model/account/account.model';
import { UserSettingInfo } from '@core/model/user';
import { isCashlessAccount } from '@core/utils/general-helpers';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings, User } from '../../../app.global';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { Schedule } from '../shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { TIMEZONE_REGEXP } from '@core/utils/regexp-patterns';
import { ExistingOrderInfo } from '../shared/models/pending-order-info.model';
import {
  ORDERS_PERIOD,
  ORDERING_STATUS_BY_LABEL,
} from '../shared/ui-components/recent-oders-list/recent-orders-list-item/recent-orders.config';
import { getTimeRangeByPeriod } from '@sections/accounts/shared/ui-components/filter/date-util';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  private menuMerchants: MerchantInfo[] = [];
  private recentOrders: OrderInfo[] = [];

  private readonly _menuMerchants$: BehaviorSubject<MerchantInfo[]> = new BehaviorSubject<MerchantInfo[]>([]);
  private readonly _recentOrders$: BehaviorSubject<OrderInfo[]> = new BehaviorSubject<OrderInfo[]>([]);
  private readonly _selectedAddress$: BehaviorSubject<any> = new BehaviorSubject<any>(<any>{});
  private readonly _orderTypes$: BehaviorSubject<MerchantOrderTypesInfo> = new BehaviorSubject<MerchantOrderTypesInfo>(
    <MerchantOrderTypesInfo>{}
  );

  private _period: ORDERS_PERIOD;
  private _orderStatus: string;

  constructor(
    private readonly orderingApiService: OrderingApiService,
    private readonly commerceApiService: CommerceApiService,
    private readonly userFacadeService: UserFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly auth: AuthFacadeService,
    private readonly institutionService: InstitutionFacadeService
  ) {}

  get menuMerchants$(): Observable<MerchantInfo[]> {
    return this._menuMerchants$.asObservable();
  }

  private set _menuMerchants(value: MerchantInfo[]) {
    this.menuMerchants = [...value];
    this._menuMerchants$.next([...this.menuMerchants]);
  }

  get orderTypes$(): Observable<MerchantOrderTypesInfo> {
    return this._orderTypes$.asObservable();
  }

  set orderTypes(value: MerchantOrderTypesInfo) {
    this._orderTypes$.next({ ...value });
  }

  get recentOrders$(): Observable<OrderInfo[]> {
    return this._recentOrders$.asObservable();
  }

  private set _recentOrders(value: OrderInfo[]) {
    this.recentOrders = [...value];
    this.recentOrders.sort((a, b) => new Date(b.dueTime).getTime() - new Date(a.dueTime).getTime());
    this._recentOrders$.next([...this.recentOrders]);
  }

  get selectedAddress$(): Observable<any> {
    return this._selectedAddress$.asObservable();
  }

  set selectedAddress(value: any) {
    this._selectedAddress$.next(value);
  }

  get period(): ORDERS_PERIOD {
    return this._period;
  }

  get orderStatus(): string {
    return this._orderStatus;
  }

  setOrderPeriodStates(period: ORDERS_PERIOD, orderStatuses: string) {
    this._period = period;
    this._orderStatus = orderStatuses;
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

  extractTimeZonedString(dateStr: string, timeZone: string): string {
    let timez = null;
    const dateObj = new Date(dateStr);
    const [, , , tz] = dateObj.toLocaleString('en-US', { timeZone, timeZoneName: 'short' }).split(' ');
    timez = tz;

    if (!timez) {
      const iosDate = () => new Date(dateStr.replace(TIMEZONE_REGEXP, '$1:$2'));
      const [, , , tz] = iosDate().toLocaleString('en-US', { timeZone, timeZoneName: 'short' }).split(' ');

      timez = tz;
    }
    return format(dateObj, `h:mm aa '(${timez})'`);
  }

  getMerchantsWithFavoriteInfo(): Observable<MerchantInfo[]> {
    const searchOptions: MerchantSearchOptions = new MerchantSearchOptions();
    searchOptions.addSearchOption({
      key: MerchantSearchOptionName.INCLUDE_SETTINGS,
      value: 1,
    });

    const resultHandler = (favoriteMerchants: MerchantInfo[], merchantList: MerchantInfo[]): MerchantInfo[] => {
      if (!favoriteMerchants || favoriteMerchants.length <= 0) {
        this._menuMerchants = merchantList;
        return merchantList;
      }
      merchantList.forEach(
        merchant => (merchant.isFavorite = favoriteMerchants.some(item => item['id'] === merchant.id))
      );
      this._menuMerchants = merchantList;
      return merchantList;
    };

    return zip(
      this.orderingApiService.getFavoriteMerchants(),
      this.orderingApiService.getMenuMerchants(searchOptions),
      resultHandler
    );
  }

  validateOrder(order: OrderInfo): Observable<OrderInfo> {
    return this.orderingApiService.validateOrder(order);
  }

  validateOrderItems(order: OrderInfo): Observable<ItemsOrderInfo> {
    return this.orderingApiService.validateOrderItems(order);
  }

  validatePendingOrder(order: ExistingOrderInfo, accountId: string): Observable<OrderInfo> {
    return this.orderingApiService.validatePendingOrder(order, accountId);
  }

  addItemsToOrder(order: ExistingOrderInfo, accountId: string): Observable<OrderInfo> {
    return this.orderingApiService.addItemsToOrder(order, accountId);
  }

  cancelOrderById(id: string): Observable<boolean> {
    return this.orderingApiService.cancelOrder(id);
  }

  getRecentOrders(): Observable<OrderInfo[]> {
    return this.userFacadeService.getUserData$().pipe(
      switchMap(({ id, institutionId }) =>
        zip(
          this.orderingApiService.getSuccessfulOrdersList(id, institutionId),
          this.getMenuMerchants(),
          (orders, merchants) =>
            orders.filter(order => {
              const merchant = merchants.find(({ id }) => id === order.merchantId);
              const merchantFound = !!merchant;
              order.merchantName = merchantFound && merchant.name;
              return merchantFound;
            })
        )
      ),
      tap(recentOrders => (this._recentOrders = recentOrders))
    );
  }

  getRecentOrdersPeriod(
    period: ORDERS_PERIOD = ORDERS_PERIOD.LAST30DAYS,
    orderStatus = 'All'
  ): Observable<OrderInfo[]> {
    const time = getTimeRangeByPeriod(period);
    return this.userFacadeService.getUserData$().pipe(
      switchMap(({ id }) =>
        zip(
          this.orderingApiService.getSuccessfulOrdersListQuery({
            ...time,
            merchantId: '',
            institutionId: '',
            orderStatuses: ORDERING_STATUS_BY_LABEL[orderStatus],
            userId: id,
          }),
          this.getMenuMerchants(),
          (orders, merchants) =>
            orders.filter(order => {
              const merchant = merchants.find(({ id }) => id === order.merchantId);
              const merchantFound = !!merchant;
              order.merchantName = merchantFound && merchant.name;
              return merchantFound;
            })
        )
      ),
      tap(() => this.setOrderPeriodStates(period, orderStatus)),
      tap(recentOrders => (this._recentOrders = recentOrders))
    );
  }

  getMerchantOrderSchedule(merchantId: string, orderType: number, merchantTimeZone: string): Observable<Schedule> {
    const orderSchedule1$ = this.orderingApiService
      .getMerchantOrderSchedule(merchantId, orderType)
      .pipe(map(response => this.dataTransform(response, merchantTimeZone)));

    const orderSchedule2$ = this.institutionService.cachedInstitutionInfo$.pipe(
      switchMap(({ timeZone }) => {
        merchantTimeZone = timeZone;
        return orderSchedule1$;
      })
    );
    return iif(() => !!merchantTimeZone, orderSchedule1$, orderSchedule2$);
  }

  private dataTransform(schedule: Schedule, timeZone: string) {
    schedule.days.forEach(day => {
      day.hourBlocks = day.hourBlocks.map(hour => {
        hour.periods = hour.timestamps.map(dateStr => this.extractTimeZonedString(dateStr, timeZone));
        return hour;
      });
      return day;
    });
    return schedule;
  }

  retrieveUserAddressList(): Observable<AddressInfo[]> {
    return this.userFacadeService.getUserAddresses$();
  }

  retrievePickupLocations(storeAddress: AddressInfo, info: MerchantSettingInfo) {
    switch (info?.value) {
      case null:
        return of([]);
      case 'true':
        return this.orderingApiService.retrievePickupLocations();
      case 'false':
        return of([storeAddress]);
    }
  }

  addFavoriteMerchant(merchantId: string): Observable<string> {
    return this.orderingApiService.addFavoriteMerchant(merchantId);
  }

  removeFavoriteMerchant(merchantId: string): Observable<boolean> {
    return this.orderingApiService.removeFavoriteMerchant(merchantId);
  }

  retrieveBuildings(): Observable<BuildingInfo[]> {
    return this.orderingApiService.retrieveBuildings();
  }

  updateUserAddress(updateUserAddress): Observable<AddressInfo> {
    return this.orderingApiService.updateUserAddress(updateUserAddress);
  }

  retrieveDeliveryAddresses(merchantId) {
    return this.getDefaultAddress().pipe(
      switchMap(({ value }) =>
        zip(
          of({ defaultAddress: value }),
          this.retrieveUserAddressList().pipe(
            switchMap(addresses => this.filterDeliveryAddresses(merchantId, addresses))
          )
        )
      )
    );
  }

  getMerchantPaymentAccounts(merchantId: string): Observable<MerchantAccountInfoList> {
    return this.orderingApiService.getMerchantPaymentAccounts(merchantId).pipe(
      switchMap(data => this.auth.isGuestUser().pipe(map(isGuestUser => ({ data, isGuestUser })))),
      map(({ data, isGuestUser }) => {
        if (isGuestUser) {
          data.accounts = data.accounts.filter(acc => acc.paymentSystemType == PAYMENT_SYSTEM_TYPE.USAEPAY);
        }
        return data;
      })
    );
  }

  isOutsideMerchantDeliveryArea(merchantId: string, latitude: number, longitude: number): Observable<boolean> {
    return this.orderingApiService.isOutsideMerchantDeliveryArea(merchantId, latitude, longitude);
  }

  getSettingByConfig(config): Observable<SettingInfo> {
    return this.orderingApiService.getSettingByConfig(config);
  }

  getDisplayMenu(merchantId: string, dateTime: string, orderType: number): Observable<MenuInfo> {
    return this.orderingApiService.getDisplayMenu(merchantId, dateTime, orderType);
  }

  getUserAccounts(): Observable<UserAccount[]> {
    return this.commerceApiService
      .getUserAccounts()
      .pipe(map(accounts => this.filterAccountsByPaymentSystem(accounts)));
  }

  extractAllAvailableMenuItemsFromMenu({ menuCategories }: MenuInfo): MenuItemInfo[] {
    return menuCategories.reduce((state, { menuCategoryItems }) => {
      const item = menuCategoryItems.map(({ active, visible, menuItem }) => {
        if (active && visible && menuItem && menuItem.active && menuItem.visible && !menuItem.deleted) {
          return menuItem;
        }
      });
      return [...state, ...item];
    }, []);
  }

  extractAllAvailableMenuItemOptionsFromMenuItem({ menuItemOptions }: MenuItemInfo): MenuItemInfo[] {
    return menuItemOptions.reduce((state, { menuGroup: { menuGroupItems } }) => {
      const res = menuGroupItems.reduce((state, { active, visible, menuItem }) => {
        if (active && visible && menuItem.active && menuItem.visible && !menuItem.deleted) {
          return [...state, menuItem];
        }
      }, []);
      return [...state, ...res];
    }, []);
  }

  getDefaultAddress(): Observable<UserSettingInfo> {
    return this.settingsFacadeService.getUserSetting(User.Settings.DEFAULT_ADDRESS);
  }

  private filterAccountsByPaymentSystem(accounts: UserAccount[]): UserAccount[] {
    return accounts.filter((account: UserAccount) => isCashlessAccount(account));
  }

  filterDeliveryAddresses(merchantId, addresses): Observable<AddressInfo[]> {
    return zip(this.menuMerchants$, this.settingsFacadeService.getSetting(Settings.Setting.ADDRESS_RESTRICTION)).pipe(
      map(([merchants, institutionRestriction]) => {
        const merchant = merchants.find(({ id }) => id === merchantId);
        const deliveryAddressRestriction = merchant.settings.map[MerchantSettings.deliveryAddressRestriction];
        let modifiedAddresses;

        if (parseInt(deliveryAddressRestriction.value) === 0) {
          modifiedAddresses = addresses;
        } else {
          modifiedAddresses = addresses.filter(({ onCampus }) => onCampus === 1);
        }

        return modifiedAddresses.filter(address => {
          if (parseInt(institutionRestriction.value) === 1) {
            return address.onCampus === 1;
          }

          if (parseInt(institutionRestriction.value) === 2) {
            return address.onCampus === 0;
          }

          return address;
        });
      })
    );
  }

  getDeliveryAddressById(deliveryId: string): Observable<AddressInfo> {
    return this.retrieveUserAddressList().pipe(map(addresses => addresses.find(({ id }) => id === deliveryId)));
  }

  removeAddress(addressId: string): Observable<boolean> {
    return this.orderingApiService.removeAddress(addressId);
  }

  getCurrentLocaleTime(merchantTimeZone: string): Observable<Date> {
    return this.userFacadeService.getUserData$().pipe(
      map(({ timeZone, locale }) => {
        const date = new Date();
        timeZone = merchantTimeZone || timeZone;
        const dueTime = date.toLocaleString(locale, { hour12: false, timeZone });

        return new Date(dueTime);
      })
    );
  }
}
