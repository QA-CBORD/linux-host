import {
  MerchantInfo,
  MerchantSearchOption,
  OrderInfo,
  BuildingInfo,
  MenuInfo,
  MerchantAccountInfoList,
} from '../shared/models';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, zip, of } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';

import { OrderingApiService } from './ordering.api.service';

import { MerchantSearchOptions } from '../utils';
import { MerchantSearchOptionName, PAYMENT_SYSTEM_TYPE, SYSTEM_SETTINGS_CONFIG, MerchantSettings } from '../ordering.config';
import { UserService } from 'src/app/core/service/user-service/user.service';
import { AddressInfo } from '@core/model/address/address-info';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { UserAccount } from '@core/model/account/account.model';

@Injectable()
export class MerchantService {
  private menuMerchants: MerchantInfo[] = [];
  private recentOrders: OrderInfo[] = [];
  private _pickerTime: string;

  private readonly _menuMerchants$: BehaviorSubject<MerchantInfo[]> = new BehaviorSubject<MerchantInfo[]>([]);
  private readonly _recentOrders$: BehaviorSubject<OrderInfo[]> = new BehaviorSubject<OrderInfo[]>([]);
  private readonly _menu$: BehaviorSubject<MenuInfo> = new BehaviorSubject<MenuInfo>(null);

  constructor(
    private readonly orderingApiService: OrderingApiService,
    private readonly userService: UserService,
    private readonly commerceApiService: CommerceApiService
  ) { }

  get menuMerchants$(): Observable<MerchantInfo[]> {
    return this._menuMerchants$.asObservable();
  }

  private set _menuMerchants(value: MerchantInfo[]) {
    this.menuMerchants = [...value];
    this._menuMerchants$.next([...this.menuMerchants]);
  }

  get menu$(): Observable<MenuInfo> {
    return this._menu$.asObservable();
  }

  private set _menu(value: MenuInfo) {
    this._menu$.next(value);
  }

  get recentOrders$(): Observable<OrderInfo[]> {
    return this._recentOrders$.asObservable();
  }

  private set _recentOrders(value: OrderInfo[]) {
    this.recentOrders = [...value];
    this._recentOrders$.next([...this.recentOrders]);
  }

  get pickerTime() {
    return this._pickerTime;
  }

  set pickerDateTime(value: Date) {
    this._pickerTime = value.toISOString();
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

  retrieveUserAddressList(): Observable<AddressInfo[]> {
    return this.userService.getUserAddresses();
  }

  retrievePickupLocations(): Observable<any> {
    return this.orderingApiService.retrievePickupLocations();
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

  updateUserAddress(updateUserAddress): Observable<any> {
    return this.orderingApiService.updateUserAddress(updateUserAddress);
  }

  retrieveDeliveryAddresses(merchantId) {
    return this.userService
      .getUserSettingsBySettingName('defaultaddress')
      .pipe(
        switchMap(({ response }) => zip(
          of({ defaultAddress: response.value }),
          this.retrieveUserAddressList()
            .pipe(
              switchMap(addresses => this.filterDeliveryAddresses(merchantId, addresses))
            )))
      );
  }

  getMerchantPaymentAccounts(merchantId: string): Observable<MerchantAccountInfoList> {
    return this.orderingApiService.getMerchantPaymentAccounts(merchantId);
  }

  isOutsideMerchantDeliveryArea(merchantId: string, latitude: number, longitude: number): Observable<boolean> {
    return this.orderingApiService.isOutsideMerchantDeliveryArea(merchantId, latitude, longitude);
  }

  getSettingByConfig(config): Observable<SettingInfo> {
    return this.orderingApiService.getSettingByConfig(config);
  }

  getDisplayMenu(merchantId: string, dateTime: string, orderType: number): Observable<MenuInfo> {
    return this.orderingApiService
      .getDisplayMenu(merchantId, dateTime, orderType)
      .pipe(tap(menu => (this._menu = menu)));
  }

  getUserAccounts(): Observable<UserAccount[]> {
    return this.commerceApiService
      .getUserAccounts()
      .pipe(map(accounts => this.filterAccountsByPaymentSystem(accounts)));
  }

  private filterAccountsByPaymentSystem(accounts: UserAccount[]): UserAccount[] {
    return accounts.filter(
      ({ paymentSystemType: type }) => type === PAYMENT_SYSTEM_TYPE.OPCS || type === PAYMENT_SYSTEM_TYPE.CSGOLD
    );
  }

  filterDeliveryAddresses(merchantId, addresses) {
    return zip(this.menuMerchants$, this.getSettingByConfig(SYSTEM_SETTINGS_CONFIG.addressRestrictionToOnCampus))
      .pipe(
        map(([merchants, institutionRestriction]) => {
          const merchant = merchants.find(({ id }) => id === merchantId)
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
          })
        }
        ))
  }
}
