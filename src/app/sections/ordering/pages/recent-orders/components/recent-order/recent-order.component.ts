import { ChangeDetectionStrategy, Component, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, take } from 'rxjs/operators';
import { Observable, zip } from 'rxjs';

import { AddressInfo } from '@core/model/address/address-info';
import { MenuInfo, MenuItemInfo, MerchantInfo, MerchantService, OrderInfo, OrderItem } from '@sections/ordering';
import { LOCAL_ROUTING, ORDER_TYPE } from '@sections/ordering/ordering.config';
import { NAVIGATE } from '../../../../../../app.global';
import { ModalController, PopoverController } from '@ionic/angular';
import { ORDERING_STATUS } from '@sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list-item/recent-orders.config';
import { ConfirmPopoverComponent } from '@sections/ordering/pages/recent-orders/components/confirm-popover/confirm-popover.component';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { OrderOptionsActionSheetComponent } from '@sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { UserService } from '@core/service/user-service/user.service';

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
              private readonly us: UserService) {
  }

  ngOnInit() {
    const orderId = this.activatedRoute.snapshot.params.id;
    this.setActiveOrder(orderId);
    this.setActiveMerchant(orderId);
    this.setActiveAddress();

    this.order$.subscribe(d => console.log(d));
    this.getMenuByActiveMerchant().subscribe(d => console.log(d));

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

  getAbsencesMenuItemsInOrder(): Observable<MenuItemInfo[][]> {
    return zip(this.getMenuByActiveMerchant(), this.order$).pipe(
      map(([menu, orderInfo]) => {
        const existingMenuItems = this.merchantService.extractAllAvailableMenuItemsFromMenu(menu);
        const availableMenuItems = [];
        const unavailableMenuItemsName = [];

        for (let i = 0; i < orderInfo.orderItems.length; i++) {
          const item = existingMenuItems.find(({ id }) => id === orderInfo.orderItems[i].menuItemId);
          if (item) {
            availableMenuItems.push(this.getOrderItemInitialObject(orderInfo.orderItems[i], item));
          } else unavailableMenuItemsName.push(orderInfo.orderItems[i].name);
        }

        return [availableMenuItems, unavailableMenuItemsName];
      }),
    );
  }

  private getOrderItemInitialObject(orderItem: OrderItem, menuItem: MenuItemInfo) {
    return {
      menuItemId: menuItem.id,
      name: menuItem.name,
      orderItemOptions: orderItem.orderItemOptions.length ? this.getOrderItemOptionsInitialObjects(orderItem.orderItemOptions, menuItem) : [],
      quantity: orderItem.quantity,
      reportingCategory: menuItem.reportingCategory ? menuItem.reportingCategory : '',
      salePrice: menuItem.price,
    };
  }

  private getOrderItemOptionsInitialObjects(orderOptions: OrderItem[], menuItem: MenuItemInfo) {
    const allAvailableMenuOptions = this.merchantService.extractAllAvailableMenuItemOptionsFromMenuItem(menuItem);

    return orderOptions.map((orderItem) => {
      const res = allAvailableMenuOptions.find(({ id }) => id === orderItem.menuItemId);
      return res && this.getOrderItemInitialObject(orderItem, res);
    });
  }

  get isMerchantOpenNow(): Observable<boolean> {
    return this.merchant$.pipe(map(({ openNow }) => openNow));
  }

  get orderStatus() {
    return ORDERING_STATUS;
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

  private getMenuByActiveMerchant(): Observable<MenuInfo> {
    return zip(this.merchant$, this.order$).pipe(
      switchMap(([merchant, order]) => this.merchantService.getDisplayMenu(merchant.id, new Date().toISOString(), order.type)),
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

  async back(): Promise<void> {
    await this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.recentOrders]);
  }

  private cancelOrder(): Observable<any> {
    return this.order$.pipe(
      switchMap(({ id }) => this.merchantService.cancelOrderById(id)),
    );
  }

  async showModal(): Promise<void> {
    this.order$.pipe(
      take(1),
      map(({ checkNumber }) => checkNumber),
    ).subscribe(await this.initModal.bind(this));
  }

  private async initModal(n: number): Promise<void> {
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

  onReorderHandler() {
    zip(this.us.userData, this.merchant$, this.getAbsencesMenuItemsInOrder(), this.order$).pipe(
      switchMap(([user, merchant, options]) => {
        const order = {
          merchantName: null,
          dueTime: new Date(Date.now() + 5455555555).toISOString(),
          userId: user.id,
          type: 0, // from modal pick or delivery
          orderItems: [...options[0]],
          merchantId: merchant.id,
          institutionId: user.institutionId,
          pickupAddressId: merchant.storeAddress.id,
          submittedTime: new Date().toISOString(),
          status: 2,
          orderPayment: [],
          orderNotifications: [],
        };
        return this.merchantService.validateOrder(order)
      })
    ) .subscribe(d => console.log(d));
    // this.merchant$.pipe(take(1)).subscribe(this.orderOptions.bind(this));
  }

  private async showOrderOptions({ orderTypes, id: merchantId, storeAddress, settings }: MerchantInfo): Promise<void> {
    const footerButtonName = 'continue';
    const cssClass = 'order-options-action-sheet order-options-action-sheet-p-d';

    const modal = await this.modalController.create({
      component: OrderOptionsActionSheetComponent,
      cssClass,
      componentProps: {
        orderTypes,
        footerButtonName,
        merchantId,
        storeAddress,
        settings,
      },
    });

    modal.onDidDismiss().then((d) => {
      console.log(d);
    });
    await modal.present();
  }
}
