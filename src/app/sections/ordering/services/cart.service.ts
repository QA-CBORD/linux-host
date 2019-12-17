import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { distinctUntilChanged, first, map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, zip } from 'rxjs';

import { ORDER_TYPE } from '@sections/ordering/ordering.config';
import { MerchantService } from './merchant.service';
import { MerchantInfo, OrderInfo, MenuInfo, OrderItem } from '../shared/models';
import { UserService } from '@core/service/user-service/user.service';
import { AddressInfo } from '@core/model/address/address-info';
import { OrderingApiService } from '@sections/ordering/services/ordering.api.service';
import { getDateTimeInGMT } from '@core/utils/date-helper';

@Injectable()
export class CartService {
  private readonly cart = { order: null, merchant: null, menu: null, orderDetailsOptions: null };
  private readonly _cart$: BehaviorSubject<CartState> = new BehaviorSubject<CartState>(<CartState>this.cart);

  constructor(
    private readonly userService: UserService,
    private readonly merchantService: MerchantService,
    private readonly api: OrderingApiService
  ) {}

  get merchant$(): Observable<MerchantInfo> {
    return this._cart$.asObservable().pipe(
      map(({ merchant }) => merchant),
      distinctUntilChanged()
    );
  }

  get orderInfo$(): Observable<Partial<OrderInfo>> {
    return this._cart$.asObservable().pipe(
      map(({ order }) => order),
      distinctUntilChanged()
    );
  }

  get menuInfo$(): Observable<MenuInfo> {
    return this._cart$.asObservable().pipe(
      map(cart => cart.menu),
      distinctUntilChanged()
    );
  }

  get orderDetailsOptions$(): Observable<OrderDetailOptions> {
    return zip(this._cart$.asObservable(), this.userService.userData).pipe(
      map(([{ orderDetailsOptions }, { locale, timeZone }]) => {
        if (orderDetailsOptions.isASAP) {
          const date = new Date();
          const dueTime = date.toLocaleString(locale, { hour12: false, timeZone });

          this.cart.orderDetailsOptions = { ...this.cart.orderDetailsOptions, dueTime: new Date(dueTime) };
          this.onStateChanged();
          return { ...this.cart.orderDetailsOptions };
        }
        return { ...orderDetailsOptions };
      }),
      distinctUntilChanged()
    );
  }

  get isMerchantOpenNow$(): Observable<boolean> {
    return this.merchant$.pipe(map(({ openNow }) => openNow));
  }

  get menuItems$(): Observable<number> {
    return this.orderInfo$.pipe(
      map(({ orderItems }) => orderItems.reduce((state, { quantity }) => state + quantity, 0))
    );
  }

  get orderItems$(): Observable<OrderItem[]> {
    return this.orderInfo$.pipe(map(({ orderItems }) => orderItems));
  }

  set _order(orderInfo: OrderInfo) {
    this.cart.order = { ...orderInfo };
    this.onStateChanged();
  }

  // --------------------------------------- SETTERS BLOCK ---------------------------------------------//

  async setActiveMerchant(merchant: MerchantInfo): Promise<void> {
    const prevMerchant = this.cart.merchant;
    this.cart.merchant = JSON.parse(JSON.stringify(merchant));

    if (prevMerchant && prevMerchant.id !== merchant.id) await this.refreshCartDate();
    if (!prevMerchant) await this.setInitialEmptyOrder();

    this.onStateChanged();
  }

  async setActiveMerchantsMenuByOrderOptions(
    dueTime: Date,
    orderType: ORDER_TYPE,
    address: AddressInfo,
    isASAP?: boolean
  ): Promise<void> {
    this.cart.orderDetailsOptions = { orderType, dueTime, address, isASAP };
    await this.getMerchantMenu().then(menu => (this.cart.menu = menu));
    this.onStateChanged();
  }

  private async setInitialEmptyOrder(): Promise<void> {
    await this.initEmptyOrder().then(order => (this.cart.order = order));
    this.onStateChanged();
  }

  // ----------------------------------------- REMOVING DATA BLOCK ---------------------------------------//

  removeOrderItemFromOrderById(id: string): Partial<OrderInfo | void> {
    if (!this.cart.order || !this.cart.order.orderItems.length) return;
    const itemIndex = this.cart.order.orderItems.findIndex(({ id: oId }: OrderItem) => oId === id);
    if (itemIndex !== -1) {
      const [removedItem] = this.cart.order.orderItems.splice(itemIndex, 1);
      this.onStateChanged();
      return removedItem;
    }
  }

  removeOrderDetailsOptions() {
    this.cart.orderDetailsOptions = null;
    this.onStateChanged();
  }

  clearCart() {
    this.cart.merchant = null;
    this.cart.orderDetailsOptions = null;
    this.cart.menu = null;
    this.cart.order = null;
    this.onStateChanged();
  }

  // ----------------------------------------- UPDATERS BLOCK -----------------------------------------//

  addOrderItems(orderItems: Partial<OrderItem> | Partial<OrderItem>[]) {
    if (!this.cart.order) return;
    if (orderItems instanceof Array) orderItems.forEach(this.addOrderItem.bind(this));
    else this.addOrderItem(orderItems);
    this.onStateChanged();
  }

  validateOrder(): Observable<OrderInfo> {
    const { orderType: type, dueTime, address: addr } = this.cart.orderDetailsOptions;
    let address = {};

    if (addr) {
      address = type === ORDER_TYPE.DELIVERY ? { deliveryAddressId: addr.id } : { pickupAddressId: addr.id };
    }

    return this.userService.userData.pipe(
      first(),
      switchMap(({ phone: userPhone, timeZone, locale }) => {
        this.cart.order = {
          ...this.cart.order,
          ...address,
          userPhone,
          type,
          dueTime: getDateTimeInGMT(dueTime, locale, timeZone),
        };
        return this.merchantService.validateOrder(this.cart.order);
      }),
      tap(updatedOrder => (this._order = { ...updatedOrder, dueTime: this.cart.order.dueTime }))
    );
  }

  submitOrder(accId: string, cvv: string): Observable<OrderInfo> {
    return this.api.submitOrder(this.cart.order, accId, cvv);
  }

  updateOrderAddress(address: AddressInfo) {
    if (this.cart.orderDetailsOptions) {
      this.cart.orderDetailsOptions = { ...this.cart.orderDetailsOptions, address };
      this.onStateChanged();
    }
  }

  removeLastOrderItem() {
    this.cart.order.orderItems.pop();
    this.onStateChanged();
  }

  async clearActiveOrder(): Promise<void> {
    await this.setInitialEmptyOrder();
  }

  private addOrderItem(orderItem: Partial<OrderItem>) {
    this.cart.order.orderItems.push(orderItem);
  }

  private onStateChanged() {
    this._cart$.next(this.cart);
  }

  private async initEmptyOrder(): Promise<Partial<OrderInfo>> {
    return this.userService.userData
      .pipe(
        map(({ institutionId, id: userId }) => {
          return {
            userId,
            orderItems: [],
            merchantId: this.cart.merchant.id,
            institutionId,
          };
        }),
        first()
      )
      .toPromise();
  }

  private async refreshCartDate(): Promise<void> {
    this.cart.order = null;
    this.cart.orderDetailsOptions = null;
    this.cart.menu = null;
    await this.setInitialEmptyOrder();
  }

  // ----------------------------------------- GETTERS BLOCK -----------------------------------------//

  private async getMerchantMenu(): Promise<MenuInfo> {
    const { dueTime, orderType } = await this.orderDetailsOptions$.pipe(first()).toPromise();
    const { id } = await this.merchant$.pipe(first()).toPromise();
    const { timeZone, locale } = await this.userService.userData.pipe(first()).toPromise();
    const timeInGMT = await getDateTimeInGMT(dueTime, locale, timeZone);

    return this.merchantService
      .getDisplayMenu(id, timeInGMT, orderType)
      .pipe(first())
      .toPromise();
  }
}

export interface CartState {
  order: Partial<OrderInfo>;
  merchant: MerchantInfo;
  menu: MenuInfo;
  orderDetailsOptions: OrderDetailOptions;
}

export interface OrderDetailOptions {
  address: AddressInfo;
  dueTime: Date;
  orderType: ORDER_TYPE;
  isASAP: boolean;
}
