import { Injectable } from '@angular/core';
import { distinctUntilChanged, first, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserService } from '@core/service/user-service/user.service';
import { ORDER_TYPE } from '@sections/ordering/ordering.config';
import { MerchantService } from './merchant.service';
import { MerchantInfo, OrderInfo, MenuInfo, MenuItemInfo, OrderItem } from '../shared/models';
import { MerchantService } from './merchant.service';
import { MerchantInfo, OrderInfo, MenuInfo, MenuItemInfo, OrderItem } from '../shared/models';
import { UserService } from '@core/service/user-service/user.service';

@Injectable()
export class CartService {
  private readonly cart = { order: null, merchant: null, menu: null, orderDetailsOptions: null };
  private readonly _cart$: BehaviorSubject<CartState> = new BehaviorSubject<CartState>(<CartState>this.cart);

  constructor(private readonly userService: UserService,
              private readonly merchantService: MerchantService) {
  }

  get merchant$(): Observable<MerchantInfo> {
    return this._cart$.asObservable().pipe(
      map(cart => cart.merchant),
      distinctUntilChanged(),
    );
  }

  get orderInfo$(): Observable<Partial<OrderInfo>> {
    return this._cart$.asObservable().pipe(
      map(cart => cart.order),
      distinctUntilChanged(),
    );
  }

  get menuInfo$(): Observable<MenuInfo> {
    return this._cart$.asObservable().pipe(
      map(cart => cart.menu),
      distinctUntilChanged(),
    );
  }

  get orderDetailsOptions$(): Observable<OrderDetailOptions> {
    return this._cart$.asObservable().pipe(
      map(cart => cart.orderDetailsOptions),
      distinctUntilChanged(),
    );
  }

  get isMerchantOpenNow$(): Observable<boolean> {
    return this.merchant$.pipe(map(({ openNow }) => openNow));
  }

  set _order(orderInfo: OrderInfo) {
    this.cart.order = { ...orderInfo };
    this.onStateChanged();
  }

  // --------------------------------------- SETTERS BLOCK ---------------------------------------------//

  async setActiveMerchant(merchant: MerchantInfo): Promise<void> {
    const prevMerchant = this.cart.merchant;
    this.cart.merchant = JSON.parse(JSON.stringify(merchant));

    if (prevMerchant && prevMerchant.id !== merchant.id)
      await this.refreshCartDate();
    if (!prevMerchant)
      await this.setInitialEmptyOrder();

    this.onStateChanged();
  }

  async setActiveMerchantsMenuByOrderOptions(dueTime: Date, orderType: ORDER_TYPE, addressId: string): Promise<void> {
    this.cart.orderDetailsOptions = { orderType, dueTime, addressId };
    await this.getMerchantMenu().then(menu => this.cart.menu = menu);
    this.onStateChanged();
  }

  private async setInitialEmptyOrder(): Promise<void> {
    await this.initEmptyOrder().then(order => this.cart.order = order);
    this.onStateChanged();
  }

  // ----------------------------------------- REMOVE BLOCK ---------------------------------------//

  removeOrderItemFromOrderById(id: string) {
    if (!this.cart.order) return;
    const itemIndex = this.cart.order.orderItems.findIndex(({ id: oId }: OrderItem) => oId === id);
    if (itemIndex !== -1) {
      this.cart.order.orderItems.splice(itemIndex, 1);
      this.onStateChanged();
    }
  }

  removeActiveOrderDetailsOptions() {
    this.cart.orderDetailsOptions = null;
    this.onStateChanged();
  }

  clearCrat() {
    this.cart.merchant = null;
    this.cart.orderDetailsOptions = null;
    this.cart.menu = null;
    this.cart.order = null;
    this.onStateChanged();
  }

  // ----------------------------------------- UPDATERS BLOCK -----------------------------------------//

  addOrderItems(orderItems: MenuItemInfo | MenuItemInfo[]) {
    if (!this.cart.order) return;
    if (orderItems instanceof Array) orderItems.forEach(this.addOrderItem.bind(this));
    else this.addOrderItem(orderItems);
    this.onStateChanged();
  }

  validateOrder(): Observable<OrderInfo> {
    const { orderType: type, dueTime, addressId } = this.cart.orderDetailsOptions;
    const address = type === ORDER_TYPE.DELIVERY
      ? { deliveryAddressId: addressId }
      : { pickupAddressId: addressId };
    this.cart.order = { ...this.cart.order, type, dueTime, ...address };

    return this.merchantService.validateOrder(this.cart.order).pipe(
      tap(updatedOrder => this._order = updatedOrder),
    );
  }

  async clearActiveOrder(): Promise<void> {
    await this.setInitialEmptyOrder();
  }

  private addOrderItem(orderItem: MenuItemInfo) {
    this.cart.order.orderItems.push(orderItem);
  }

  private onStateChanged() {
    this._cart$.next(this.cart);
  }

  private async initEmptyOrder(): Promise<Partial<OrderInfo>> {
    return this.userService.userData.pipe(
      map(({ institutionId, id: userId }) => {
        return {
          userId,
          orderItems: [],
          merchantId: this.cart.merchant.id,
          institutionId,
        };
      }),
      first(),
    ).toPromise();
  }

  private async refreshCartDate(): Promise<void> {
    this.cart.order = null;
    this.cart.orderDetailsOptions = null;
    this.cart.menu = null;
    await this.setInitialEmptyOrder();
  }

  // ----------------------------------------- GETTERS BLOCK -----------------------------------------//

  private getMerchantMenu(): Promise<MenuInfo> {
    const { orderDetailsOptions: options, merchant } = this.cart;
    if (!options || !merchant || !options.dueTime || isNaN(options.orderType)) return Promise.reject();

    return this.merchantService.getDisplayMenu(merchant.id, options.dueTime.toISOString(), options.orderType).toPromise();
  }
}

export interface CartState {
  order: Partial<OrderInfo>;
  merchant: MerchantInfo;
  menu: MenuInfo;
  orderDetailsOptions: OrderDetailOptions;
}

export interface OrderDetailOptions {
  addressId: string;
  dueTime: Date;
  orderType: ORDER_TYPE;
}
