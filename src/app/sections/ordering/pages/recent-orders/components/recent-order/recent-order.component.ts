import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, switchMap, take, tap } from 'rxjs/operators';
import { Observable, zip } from 'rxjs';

import { AddressInfo } from '@core/model/address/address-info';
import { MenuItemInfo, MerchantInfo, MerchantService, OrderInfo, OrderItem } from '@sections/ordering';
import { LOCAL_ROUTING, ORDER_TYPE } from '@sections/ordering/ordering.config';
import { NAVIGATE } from '../../../../../../app.global';
import { ModalController, PopoverController } from '@ionic/angular';
import { ORDERING_STATUS } from '@sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list-item/recent-orders.config';
import { ConfirmPopoverComponent } from '@sections/ordering/pages/recent-orders/components/confirm-popover/confirm-popover.component';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { OrderOptionsActionSheetComponent } from '@sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { CartService } from '@sections/ordering/services/cart.service';
import { LoadingService } from '@core/service/loading/loading.service';

@Component({
  selector: 'st-recent-order',
  templateUrl: './recent-order.component.html',
  styleUrls: ['./recent-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentOrderComponent implements OnInit {
  order$: Observable<OrderInfo>;
  address$: Observable<string>;
  merchant$: Observable<MerchantInfo>;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly merchantService: MerchantService,
              private readonly router: Router,
              private readonly popoverController: PopoverController,
              private readonly modalController: ModalController,
              private readonly cart: CartService,
              private readonly loadingService: LoadingService) {
  }

  ngOnInit() {
    const orderId = this.activatedRoute.snapshot.params.id;
    this.setActiveOrder(orderId);
    this.setActiveMerchant(orderId);
    this.setActiveAddress();
  }

  async onReorderHandler() {
    const merchant = await this.merchant$.pipe(first()).toPromise();
    await this.initOrderOptionsModal(merchant);
  }

  resolveMenuItemsInOrder(): Observable<MenuItemInfo[][]> {
    return zip(this.cart.menuInfo$, this.order$).pipe(
      map(([menu, orderInfo]) => {
        const existingMenuItems = this.merchantService.extractAllAvailableMenuItemsFromMenu(menu);
        const availableMenuItems = [];
        const unavailableMenuItemsName = [];

        for (let i = 0; i < orderInfo.orderItems.length; i++) {
          const item = existingMenuItems.find(({ id }) => id === orderInfo.orderItems[i].menuItemId);
          if (item) availableMenuItems.push(this.getOrderItemInitialObject(orderInfo.orderItems[i], item));
          else unavailableMenuItemsName.push(orderInfo.orderItems[i].name);
        }

        return [availableMenuItems, unavailableMenuItemsName];
      }),
    );
  }

  get orderStatus() {
    return ORDERING_STATUS;
  }

  async showModal(): Promise<void> {
    this.order$.pipe(
      take(1),
      map(({ checkNumber }) => checkNumber),
    ).subscribe(await this.initCancelOrderModal.bind(this));
  }

  async back(): Promise<void> {
    await this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.recentOrders]);
  }

  private setActiveOrder(orderId) {
    this.order$ = this.merchantService.recentOrders$.pipe(
      map(orders => orders.find(({ id }) => id === orderId)),
    );
  }

  private setActiveMerchant(orderId) {
    this.merchant$ = this.merchantService.recentOrders$.pipe(
      map(orders => orders.find(({ id }) => id === orderId)),
      switchMap(({ merchantId }) => this.merchantService.menuMerchants$.pipe(
        map(merchants => merchants.find(({ id }) => id === merchantId)),
      )));
  }

  private getOrderItemInitialObject(orderItem: OrderItem, menuItem: MenuItemInfo) {
    return {
      menuItemId: menuItem.id,
      orderItemOptions: orderItem.orderItemOptions.length
        ? this.getOrderItemOptionsInitialObjects(orderItem.orderItemOptions, menuItem)
        : [],
      quantity: orderItem.quantity,
    };
  }

  private getOrderItemOptionsInitialObjects(orderOptions: OrderItem[], menuItem: MenuItemInfo) {
    const allAvailableMenuOptions = this.merchantService.extractAllAvailableMenuItemOptionsFromMenuItem(menuItem);

    return orderOptions.map((orderItem) => {
      const res = allAvailableMenuOptions.find(({ id }) => id === orderItem.menuItemId);
      return res && this.getOrderItemInitialObject(orderItem, res);
    });
  }

  private async initOrder({ addressId, dueTime, orderType }): Promise<void> {
    await this.loadingService.showSpinner();
    const merchant = await this.merchant$.pipe(take(1)).toPromise();
    await this.cart.setActiveMerchant(merchant);
    await this.cart.setActiveMerchantsMenuByOrderOptions(dueTime, orderType, addressId);
    const [availableItems] = await this.resolveMenuItemsInOrder().pipe(first()).toPromise();
    this.cart.addOrderItems(availableItems);
    await this.cart.validateOrder().pipe(first()).toPromise();
    await this.loadingService.closeSpinner();
    console.log(dueTime);
    await this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.cart], {skipLocationChange: true});
  }

  private setActiveAddress() {
    this.address$ = this.order$.pipe(
      switchMap(({ type, deliveryAddressId }) => {
          return type === ORDER_TYPE.DELIVERY
            ? this.getDeliveryAddress(deliveryAddressId)
            : this.getPickupAddress();
        },
      ),
    );
  }

  private getPickupAddress(): Observable<string> {
    return this.order$.pipe(
      switchMap(({ merchantId }) =>
        this.merchantService.menuMerchants$.pipe(
          map((merchants) => merchants.find(({ id }) => id === merchantId))),
      ),
      map(({ storeAddress }) => this.getPickupAddressAsString(storeAddress)),
    );
  }

  private getDeliveryAddress(deliveryId: string): Observable<string> {
    return this.merchantService.retrieveUserAddressList().pipe(
      map((addresses) =>
        addresses.find(({ id }) => id === deliveryId),
      ),
      map(address => this.getDeliveryAddressAsString(address)),
    );
  }

  private getPickupAddressAsString({ address1, address2, city }: AddressInfo): string {
    address1 = address1 ? address1 : '';
    address2 = address2 ? address2 : '';
    city = city ? city : '';
    return `${address1} ${address2} ${city}`.trim();
  }

  private getDeliveryAddressAsString(addressInfo: AddressInfo = {} as AddressInfo): string {
    if (!Object.keys(addressInfo).length) return '';
    let { onCampus, address1, address2, city, room, building, state } = addressInfo;
    room = room ? `Room ${room}` : '';
    building = building ? building : '';
    address1 = address1 ? address1 : '';
    state = state ? state : '';
    address2 = address2 ? address2 : '';
    city = city ? city : '';

    return Boolean(Number(onCampus))
      ? `${room}, ${building}`.trim()
      : `${address1} ${address2}, ${city}, ${state}`.trim();
  }

  private cancelOrder(): Observable<any> {
    return this.order$.pipe(
      switchMap(({ id }) => this.merchantService.cancelOrderById(id)),
    );
  }

  private async initCancelOrderModal(n: number): Promise<void> {
    const modal = await this.popoverController.create({
      component: ConfirmPopoverComponent,
      componentProps: {
        data: { message: `Are you sure you want to cancel order #${n}` },
      },
      animated: false,
      backdropDismiss: true,
    });
    modal.onDidDismiss().then(({ role }) => {
      role === BUTTON_TYPE.CANCEL && this.cancelOrder().pipe(
        take(1),
      ).subscribe(response => response && this.back());
    });
    await modal.present();
  }

  private async initOrderOptionsModal({ orderTypes, id: merchantId, storeAddress, settings }: MerchantInfo): Promise<void> {
    const footerButtonName = 'continue';
    const cssClass = 'order-options-action-sheet order-options-action-sheet-p-d';

    const { deliveryAddressId, type } = await this.order$.pipe(first()).toPromise();

    const modal = await this.modalController.create({
      component: OrderOptionsActionSheetComponent,
      cssClass,
      componentProps: {
        activeDeliveryAddressId: type === ORDER_TYPE.PICKUP ? null : deliveryAddressId,
        orderTypes,
        footerButtonName,
        merchantId,
        storeAddress,
        settings,
        activeOrderType: type === ORDER_TYPE.DELIVERY ? ORDER_TYPE.DELIVERY : null,
      },
    });

    modal.onDidDismiss().then(({ data, role }) => {
      console.log(data);
      role === BUTTON_TYPE.CONTINUE && this.initOrder(data)
    });

    await modal.present();
  }
}
