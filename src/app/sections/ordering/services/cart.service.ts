import { Injectable } from '@angular/core';
import { distinctUntilChanged, filter, first, map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ORDER_TYPE } from '@sections/ordering/ordering.config';
import { MerchantService } from './merchant.service';
import { MerchantInfo, OrderInfo, MenuInfo, OrderItem, OrderPayment, ItemsOrderInfo } from '../shared/models';
import { AddressInfo } from '@core/model/address/address-info';
import { getDateTimeInGMT } from '@core/utils/date-helper';
import { OrderingApiService } from '@sections/ordering/services/ordering.api.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { UuidGeneratorService } from '@shared/services/uuid-generator.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { TIMEZONE_REGEXP } from '@core/utils/regexp-patterns';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cart = { order: null, merchant: null, menu: null, orderDetailsOptions: null };
  private readonly _cart$: BehaviorSubject<CartState> = new BehaviorSubject<CartState>(<CartState> this.cart);
  // temporary cachedError for the cart:
  private _catchError: string | null = null;
  private _clientOrderId: string = null;
  private _pendingOrderId: string = null;
  public orderIsAsap = false;
  checkNumber: number;
  currentOrderId: string;
  merchantTimeZone: string;

  constructor(
    private readonly userFacadeService: UserFacadeService,
    private readonly merchantService: MerchantService,
    private readonly api: OrderingApiService,
    private readonly uuidGeneratorService: UuidGeneratorService,
    private readonly institutionFacade: InstitutionFacadeService
  ) {}

  get merchant$(): Observable<MerchantInfo> {
    return this._cart$.asObservable().pipe(
      map(({ merchant }) => merchant),
      distinctUntilChanged()
    );
  }

  async onAddItems({ merchant, orderOptions, orderId, orderPayment }) {
    const { dueTime, orderType, address, isASAP } = orderOptions;
    await this.setActiveMerchant(merchant);
    await this.setActiveMerchantsMenuByOrderOptions(dueTime, orderType, address, isASAP);
    await this.setPendingOrder(orderId);
    this.cart.order.orderPayment = [orderPayment];
  }

  get orderInfo$(): Observable<Partial<OrderInfo>> {
    return this._cart$.asObservable().pipe(map(({ order }) => order));
  }

  get menuInfo$(): Observable<MenuInfo> {
    return this._cart$.asObservable().pipe(
      map(({ menu }) => menu),
      distinctUntilChanged()
    );
  }

  get clientOrderId(): string {
    if (!this._clientOrderId) {
      this._clientOrderId = this.uuidGeneratorService.newUUID();
    }
    return this._clientOrderId;
  }

  get changeClientOrderId(): string {
    this._clientOrderId = this.uuidGeneratorService.newUUID();
    return this._clientOrderId;
  }

  get isExistingOrder(): boolean {
    return !!this._pendingOrderId;
  }

  resetClientOrderId(): void {
    this._clientOrderId = null;
  }

  get orderDetailsOptions$(): Observable<OrderDetailOptions> {
    return this._cart$.asObservable().pipe(
      map(({ orderDetailsOptions }) => orderDetailsOptions),
      distinctUntilChanged()
    );
  }

  get isMerchantOpenNow$(): Observable<boolean> {
    return this.merchant$.pipe(map(({ openNow }) => openNow));
  }

  get menuItems$(): Observable<number> {
    return this.orderInfo$.pipe(
      map(orderInfo => orderInfo ? orderInfo.orderItems.reduce((state, { quantity }) => state + quantity, 0) : 0)
    );
  }

  get orderItems$(): Observable<OrderItem[]> {
    return this.orderInfo$.pipe(map(({ orderItems }) => orderItems));
  }

  get cartsErrorMessage(): string | null {
    return this._catchError;
  }

  set cartsErrorMessage(message) {
    this._catchError = message;
  }

  set _order(orderInfo: OrderInfo) {
    this.cart.order = { ...orderInfo };
    this.onStateChanged();
  }

  extractTimeZonedString(dateStr: string, timeZone: string, fullDate = true): string {
    // Formatted timezone from +0000 to +00:00 to support Safari dates
    if (!timeZone) timeZone = this.merchantTimeZone;

    let date = new Date(dateStr);
    if (/Invalid Date/.test(date.toString())) {
      try {
        date = new Date(dateStr.replace(TIMEZONE_REGEXP, '$1:$2'));
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        date = <any>dateStr;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {
      day: '2-digit',
      month: 'short',
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
    };

    if (/Invalid Date/.test(String(date))) return;

    if (!timeZone) return Intl.DateTimeFormat('en-US', options).format(date);
    options.timeZone = timeZone;
    options.timeZoneName = 'short';
    let fullDateStr = Intl.DateTimeFormat('en-US', options).format(date);
    const choppedStr = fullDateStr.split(' ');
    const tz = choppedStr[choppedStr.length - 1];
    fullDateStr = fullDateStr.replace(tz, `(${tz})`);
    return (fullDate && fullDateStr) || this.getHoursOnly(fullDateStr);
  }

  private getHoursOnly(fullDateStr: string): string {
    const [, , time] = fullDateStr.split(/,/);
    return time;
  }

  // --------------------------------------- SETTERS BLOCK ---------------------------------------------//

  async setActiveMerchant(merchant: MerchantInfo): Promise<void> {
    const prevMerchant = this.cart.merchant;
    this.cart.merchant = JSON.parse(JSON.stringify(merchant));
    this.merchantTimeZone = this.cart.merchant.timeZone;
    if (prevMerchant && prevMerchant.id !== merchant.id) await this.refreshCartDate();
    if (!prevMerchant) await this.setInitialEmptyOrder();
    this.onStateChanged();
    if (!this.merchantTimeZone) {
      await this.institutionFacade.cachedInstitutionInfo$
        .pipe(
          take(1),
          map(({ timeZone }) => (this.merchantTimeZone = timeZone))
        )
        .toPromise();
    }
  }

  async setActiveMerchantsMenuByOrderOptions(
    dueTime: Date,
    orderType: ORDER_TYPE,
    address: AddressInfo,
    isASAP?: boolean
  ): Promise<void> {
    this.cart.orderDetailsOptions = { orderType, dueTime, address, isASAP };
    const { id } = await this.merchant$.pipe(first()).toPromise();

    await this.getMerchantMenu(id, dueTime, orderType).then(menu => (this.cart.menu = menu));
    this.onStateChanged();
  }

  private async setInitialEmptyOrder(): Promise<void> {
    this._pendingOrderId = null;
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
    this._pendingOrderId = null;
    this.onStateChanged();
  }

  public async setPendingOrder(orderId: string): Promise<void> {
    this._pendingOrderId = orderId;
    this.cart.order = await this.initEmptyOrder();
    this.onStateChanged();
  }
  // ----------------------------------------- UPDATERS BLOCK -----------------------------------------//

  addOrderItems(orderItems: Partial<OrderItem> | Partial<OrderItem>[]) {
    if (!this.cart.order) return;
    if (orderItems instanceof Array) orderItems.forEach(this.addOrderItem.bind(this));
    else this.addOrderItem(orderItems);
    this.onStateChanged();
  }

  getAddress(type: ORDER_TYPE, addr) {
    return type === ORDER_TYPE.DELIVERY ? { deliveryAddressId: addr.id } : { pickupAddressId: addr.id };
  }

  getDate(dueTime, locale: string, timeZone: string) {
    return dueTime instanceof Date ? getDateTimeInGMT(dueTime, locale, timeZone) : dueTime;
  }

  validateOrder(): Observable<OrderInfo> {
    const { orderType: type, dueTime, address: addr } = this.cart.orderDetailsOptions;
    let address = {};

    if (addr) {
      address = this.getAddress(type, addr);
    }

    return this.userFacadeService.getUserData$().pipe(
      first(),
      switchMap(({ timeZone, locale }) => {
        this.cart.order = {
          ...this.cart.order,
          ...address,
          type,
          dueTime: this.getDate(dueTime, locale, timeZone),
        };

        if (!this._pendingOrderId) {
          return this.merchantService.validateOrder(this.cart.order);
        }

        return this.merchantService
          .validatePendingOrder(
            { orderID: this._pendingOrderId, itemsToAdd: this.cart.order.orderItems },
            this.cart.order.orderPayment[0].accountId
          )
          .pipe(
            map(order => {
              const allItems = order.orderItems;
              const newItems = this.cart.order.orderItems;
              order.orderItems = [];
              newItems.forEach(({ menuItemId, quantity }) => {
                const theFoundItem = allItems.find(i => i.menuItemId == menuItemId && i.quantity == quantity);
                if (theFoundItem) {
                  order.orderItems.push(theFoundItem);
                } else {
                  console.error('Something wrong, item: ', menuItemId, ' Not found');
                }
              });
              return order;
            })
          );
      }),
      tap(updatedOrder => {
        this._order = { ...updatedOrder, dueTime: this.cart.order.dueTime };
        if (this.orderIsAsap || !this.cart.order.dueTime) {
          this.cart.orderDetailsOptions = { ...this.cart.orderDetailsOptions, dueTime: updatedOrder.dueTime };
        }
      })
    );
  }

  validateReOrderItems(): Observable<ItemsOrderInfo> {
    const { orderType: type, dueTime, address: addr } = this.cart.orderDetailsOptions;
    let address = {};

    if (addr) {
      address = this.getAddress(type, addr);
    }

    return this.userFacadeService.getUserData$().pipe(
      first(),
      switchMap(({ timeZone, locale }) => {
        this.cart.order = {
          ...this.cart.order,
          ...address,
          type,
          dueTime: this.getDate(dueTime, locale, timeZone),
        };

        return this.merchantService.validateOrderItems(this.cart.order);
      }),
      tap(({ order: updatedOrder }) => {
        this._order = { ...updatedOrder, dueTime: this.cart.order.dueTime };
        if (this.orderIsAsap || !this.cart.order.dueTime) {
          this.cart.orderDetailsOptions = { ...this.cart.orderDetailsOptions, dueTime: updatedOrder.dueTime };
        }
      })
    );
  }

  submitOrder(accId: string, cvv: string, clientOrderID: string): Observable<OrderInfo> {
    if (this._pendingOrderId) {
      return this.merchantService.addItemsToOrder(
        {
          clientAddItemsID: clientOrderID,
          orderID: this._pendingOrderId,
          itemsToAdd: this.cart.order.orderItems,
          cvv,
        },
        accId
      );
    }
    if (this.orderIsAsap) this.cart.order.dueTime = undefined;
    const order = { ...this.cart.order, clientOrderID };
    return this.api.submitOrder(order, accId, cvv);
  }

  updateOrderAddress(address: AddressInfo) {
    if (this.cart.orderDetailsOptions) {
      this.cart.orderDetailsOptions = { ...this.cart.orderDetailsOptions, address };
      this.onStateChanged();
    }
  }

  updateOrderNote(note: string) {
    this.cart.order.notes = note;
  }

  removeLastOrderItem() {
    this.cart.order.orderItems.pop();
    this.onStateChanged();
  }

  setOrderTip(amount: number) {
    this.cart.order.tip = amount;
    this.cart.order.total = this.calculateTotal();
    this.onStateChanged();
  }

  addPaymentInfoToOrder(peymentInfo: Partial<OrderPayment>) {
    this.cart.order.orderPayment = [peymentInfo];
  }

  updateOrderPhone(phone: string) {
    this.cart.order.userPhone = phone;
  }

  async clearActiveOrder(): Promise<void> {
    await this.setInitialEmptyOrder();
  }

  async getMerchantMenu(id: string, dueTime: string | Date, type: number): Promise<MenuInfo> {
    const { timeZone, locale } = await this.userFacadeService
      .getUserData$()
      .pipe(first())
      .toPromise();
    dueTime = dueTime || new Date();
    const timeInGMT =
      dueTime instanceof Date ? getDateTimeInGMT(dueTime, locale, this.merchantTimeZone || timeZone) : dueTime;
    return this.merchantService
      .getDisplayMenu(id, timeInGMT, type)
      .pipe(first())
      .toPromise();
  }

  private addOrderItem(orderItem: Partial<OrderItem>) {
    this.cart.order.orderItems.push(orderItem);
  }

  private onStateChanged() {
    this._cart$.next(this.cart);
  }

  private calculateTotal(): number {
    const { subTotal, tax, useFee, deliveryFee, pickupFee, tip, discount } = this.cart.order;
    return (
      (subTotal || 0) +
      (tax || 0) +
      (useFee || 0) +
      (deliveryFee || 0) +
      (pickupFee || 0) +
      (tip || 0) -
      (discount || 0)
    );
  }

  private async initEmptyOrder(): Promise<Partial<OrderInfo>> {
    return this.userFacadeService
      .getUserData$()
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
  getMenuItemByCode(code: string) {
    code = this.removeLeadingZerosAndUpperCase(code);

    return this.menuInfo$.pipe(
      filter(menu => !!menu.menuCategories),
      map(menu =>
        menu.menuCategories
          .map(cat => cat.menuCategoryItems.map(item => item.menuItem))
          .reduce((prev, curr) => [...prev, ...curr], [])
          .find(item => this.removeLeadingZerosAndUpperCase(item.barcode) === code)
      ),
      take(1)
    );
  }

  private removeLeadingZerosAndUpperCase(code: string): string {
    if (!code) return;

    return code.toUpperCase().replace(/\b0+/g, '');
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
