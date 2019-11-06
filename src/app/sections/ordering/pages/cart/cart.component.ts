import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CartService, OrderDetailOptions } from '@sections/ordering/services/cart.service';
import { Observable, zip } from 'rxjs';
import { AddressModalSettings, MerchantService, OrderInfo } from '@sections/ordering';
import { first, last, map, switchMap, tap } from 'rxjs/operators';
import {
  ACCOUNT_TYPES,
  MerchantSettings,
  ORDER_TYPE,
  PAYMENT_SYSTEM_TYPE,
  SYSTEM_SETTINGS_CONFIG,
} from '@sections/ordering/ordering.config';
import { LoadingService } from '@core/service/loading/loading.service';
import { SettingService } from '@core/service/settings/setting.service';
import { ActivatedRoute } from '@angular/router';
import { parseArrayFromString } from '@core/utils/general-helpers';
import { UserAccount } from '@core/model/account/account.model';

@Component({
  selector: 'st-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  order$: Observable<Partial<OrderInfo>>;
  addressModalSettings$: Observable<AddressModalSettings>;
  address$: Observable<string>;
  accounts: UserAccount[];

  constructor(private readonly cartService: CartService,
              private readonly merchantService: MerchantService,
              private readonly loadingService: LoadingService,
              private readonly settingService: SettingService,
              private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.order$ = this.cartService.orderInfo$;
    this.addressModalSettings$ = this.initAddressModalConfig();
    this.address$ = this.getActiveAddress();
    this.getAvailableAccounts().then((acc) => this.accounts = acc);
  }

  initAddressModalConfig(): Observable<AddressModalSettings> {
    this.loadingService.showSpinner();
    return zip(
      this.cartService.orderDetailsOptions$,
      this.merchantService.retrieveBuildings(),
      this.cartService.merchant$,
      this.getDeliveryLocations(),
      this.getPickupLocations(),
    ).pipe(
      map(([
             { address: defaultAddress, orderType },
             buildings,
             { id: merchantId },
             deliveryAddresses,
             pickupLocations,
           ]) => ({
        defaultAddress,
        buildings,
        isOrderTypePickup: orderType === ORDER_TYPE.PICKUP,
        pickupLocations,
        deliveryAddresses,
        merchantId,
      })),
      tap(this.loadingService.closeSpinner.bind(this.loadingService)),
    );
  }

  private getDeliveryLocations(): Observable<any> {
    return this.cartService.merchant$.pipe(
      switchMap(({ id }) => this.merchantService.retrieveDeliveryAddresses(id)),
      map(([, deliveryLocations]) => deliveryLocations));
  }

  private getPickupLocations(): Observable<any> {
    return this.cartService.merchant$.pipe(
      switchMap(({ storeAddress, settings }) => this.merchantService.retrievePickupLocations(
        storeAddress, settings.map[MerchantSettings.pickupLocationsEnabled],
      )),
    );
  }

  private getActiveAddress(): Observable<string> {
    return this.cartService.orderDetailsOptions$.pipe(
      map(({ orderType, address }: OrderDetailOptions) => {
          return orderType === ORDER_TYPE.DELIVERY
            ? this.merchantService.getDeliveryAddressAsString(address)
            : this.merchantService.getPickupAddressAsString(address);
        },
      ),
    );
  }

  onAddressChanged({ data: { address } }) {
    this.cartService.updateOrderAddress(address);
  }

  private async getAvailableAccounts(): Promise<UserAccount[]> {
    let accounts = [];
    const { data: [settings, merchantAccInfoList] } = await this.activatedRoute.data.pipe(first()).toPromise();
    const displayTenderSetting = this.settingService.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.displayTenders.name);
    const displayCreditCardSetting = this.settingService.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.displayCreditCard.name);
    const displayTenders = displayTenderSetting ? parseArrayFromString<string>(displayTenderSetting.value) : [];
    const displayCreditCards = displayCreditCardSetting ? parseArrayFromString<string>(displayCreditCardSetting.value) : [];
    const { mealBased } = await this.cartService.menuInfo$.pipe(first()).toPromise();

    if (merchantAccInfoList.cashlessAccepted && !merchantAccInfoList.rollOverr) {
      merchantAccInfoList.accounts.forEach(acc => {
        if (acc.paymentSystemType === PAYMENT_SYSTEM_TYPE.OPCS || acc.paymentSystemType === PAYMENT_SYSTEM_TYPE.CSGOLD) {
          displayTenders.includes(acc.accountTender) && accounts.push(acc);
        }
      });
    }

    if (merchantAccInfoList.creditAccepted) {
      merchantAccInfoList.accounts.forEach(acc => {
        if (acc.paymentSystemType === PAYMENT_SYSTEM_TYPE.MONETRA|| acc.paymentSystemType === PAYMENT_SYSTEM_TYPE.USAEPAY) {
          displayCreditCards.includes(acc.id) && accounts.push(acc);
        }
      });
    }

    if (merchantAccInfoList.rollOver) {
      merchantAccInfoList.accounts.forEach(acc => acc.id === 'rollup' && accounts.push(acc));
    }

    if (mealBased) {
      accounts = accounts.filter(({ accountType }: UserAccount) => accountType === ACCOUNT_TYPES.meals);
    }

    return accounts;
  }
}
