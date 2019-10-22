import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MerchantInfo, OrderInfo, OrderItem } from '@sections/ordering';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable()
export class CartService {
  private cart = { order: null, merchant: null };
  private readonly _cart$: BehaviorSubject<CartState> = new BehaviorSubject<CartState>(<CartState>this.cart);

  constructor() {}

  get merchant$(): Observable<MerchantInfo> {
    return this._cart$.asObservable().pipe(
      map(cart => cart.merchant),
      distinctUntilChanged(),
    );
  }

  get orderInfo$(): Observable<OrderInfo> {
    return this._cart$.asObservable().pipe(
      map(cart => cart.order),
      distinctUntilChanged(),
    );
  }

  setInitialEmptyOrder() {
    this.cart.order = this.getEmptyOrder();
    this.onStateChanged();
  }

  setActiveOrder(order: OrderInfo) {
    this.cart.order = JSON.parse(JSON.stringify(order));
    this.onStateChanged();
  }

  addOrderItems(orderItems: OrderItem | OrderItem[]) {
    this.cart.order = this.cart.order !== null ? this.cart.order : this.getEmptyOrder();
    if (orderItems instanceof Array) orderItems.forEach(this.addOrderItem.bind(this));
    else this.addOrderItem(orderItems);
    this.onStateChanged();
  }

  removeOrderItemById(id: string) {
    const itemIndex = this.cart.order.orderItems.findIndex(({id: oId}: OrderItem)=> oId === id);
    if (itemIndex !== -1) {
      this.cart.order.orderItems.splice(itemIndex, 1);
      this.onStateChanged();
    }
  }

  removeOrder() {
    this.cart.order = null;
    this.onStateChanged();
  }

  removeMerchant() {
    this.cart.merchant = null;
    this.onStateChanged();
  }

  setActiveMerchant(merchant: MerchantInfo) {
    this.cart.merchant = JSON.parse(JSON.stringify(merchant));
    this.onStateChanged();
  }

  private addOrderItem(orderItem: OrderItem) {
    this.cart.order.orderItems.push(orderItem);
  }

  private getEmptyOrder(): OrderInfo {
    return <OrderInfo>{
      dueTime: null,
      subTotal: 0,
      tax: 0,
      tip: 0,
      userId: 'TODO id',
      type: 2, // from modal pick or delivery
      useFee: 0,
      deliveryFee: 0,
      status: 0,
      orderItems: [],
      deliveryAddressId: 'TODO address',
      merchantId: 'TODO merchant id',
      institutionId: 'TODO id',
    };
  }

  private onStateChanged() {
    this._cart$.next(this.cart);
  }
}

export interface CartState {
  order: OrderInfo;
  merchant: MerchantInfo
}
