import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import { MerchantInfo, OrderInfo, OrderItem } from '@sections/ordering';
import { distinctUntilChanged, map, take } from 'rxjs/operators';
import { UserService } from '@core/service/user-service/user.service';

@Injectable()
export class CartService {
  private cart = { order: null, merchant: null };
  private readonly _cart$: BehaviorSubject<CartState> = new BehaviorSubject<CartState>(<CartState>this.cart);

  constructor(private readonly userService: UserService) {}

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

  setInitialEmptyOrder(userId, institutionId) {
    this.initEmptyOrder().pipe(
      take(1)
    ).subscribe(order => {
      this.cart.order = order;
      this.onStateChanged();
    });
  }

  addOrderItems(orderItems: OrderItem | OrderItem[]) {
    // this.cart.order = this.cart.order !== null ? this.cart.order : this.getEmptyOrder();
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

  private initEmptyOrder(): Observable<Partial<OrderInfo>> {
    return zip(this.userService.userData, this.merchant$).pipe(
      map(([{institutionId, id: userId}, {id: merchantId}]) => {
        return {
          userId,
          orderItems: [],
          merchantId,
          institutionId,
        };
      })
    );
  }

  private onStateChanged() {
    this._cart$.next(this.cart);
  }
}

export interface CartState {
  order: OrderInfo;
  merchant: MerchantInfo
}
