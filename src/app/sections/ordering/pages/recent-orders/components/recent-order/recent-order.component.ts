import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { iif, Observable, of, zip } from 'rxjs';
import { ItemsOrderInfo, MenuItemInfo, MerchantInfo, MerchantService, OrderInfo, OrderItem } from '@sections/ordering';
import {
  LOCAL_ROUTING,
  ORDER_TYPE,
  ORDER_VALIDATION_ERRORS,
  ORDERING_CONTENT_STRINGS,
  MerchantSettings,
} from '@sections/ordering/ordering.config';
import { PATRON_NAVIGATION } from '../../../../../../app.global';
import { PopoverController, AlertController } from '@ionic/angular';
import { ORDERING_STATUS } from '@sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list-item/recent-orders.config';
import { BUTTON_TYPE, buttons } from '@core/utils/buttons.config';
import { OrderOptionsActionSheetComponent } from '@sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { CartService } from '@sections/ordering/services/cart.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { handleServerError } from '@core/utils/general-helpers';
import { StGlobalPopoverComponent } from '@shared/ui-components';
import { ConfirmPopoverComponent } from '@sections/ordering/shared/ui-components/confirm-popover/confirm-popover.component';
import { TIMEZONE_REGEXP } from '@core/utils/regexp-patterns';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { OrderCheckinStatus } from '@sections/check-in/OrderCheckinStatus';
import { CheckingProcess } from '@sections/check-in/services/check-in-process-builder';
import { CheckingServiceFacade } from '@sections/check-in/services/check-in-facade.service';
import { AddressInfo } from '@core/model/address/address-info';
import { firstValueFrom } from 'rxjs';
import { ItemsUnavailableComponent } from '../items-unavailable/items-unavailable.component';
import { OrderDetailsOptions } from '@sections/ordering/shared/models/order-details-options.model';

interface OrderMenuItem {
  menuItemId: string;
  orderItemOptions: OrderMenuItem[];
  quantity: number;
  specialInstructions: string;
}

@Component({
  selector: 'st-recent-order',
  templateUrl: './recent-order.component.html',
  styleUrls: ['./recent-order.component.scss'],
})
export class RecentOrderComponent implements OnInit, OnDestroy {
  order$: Observable<OrderInfo>;
  orderDetailsOptions$: Observable<OrderDetailsOptions>;
  merchant$: Observable<MerchantInfo>;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};
  merchantTimeZoneDisplayingMessage: string;
  checkinInstructionMessage: Observable<string>;
  addToCartEnabled: boolean;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly merchantService: MerchantService,
    private readonly router: Router,
    private readonly popoverController: PopoverController,
    private readonly modalController: ModalsService,
    private readonly cart: CartService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly userFacadeService: UserFacadeService,
    private readonly orderingService: OrderingService,
    public readonly checkinService: CheckingServiceFacade,
    private readonly alertController: AlertController,
    private readonly institutionService: InstitutionFacadeService,
    private readonly checkinProcess: CheckingProcess
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    const orderId = this.activatedRoute.snapshot.params.id;
    this.setActiveOrder(orderId);
    this.setActiveMerchant(orderId);
    this.setActiveAddress();
    this.initContentStrings();
  }

  ionViewWillEnter() {
    if (this.checkinService.navedFromCheckin) {
      this.initData();
    }
  }

  ngOnDestroy(): void {
    this.checkinService.navedFromCheckin = false;
  }

  async onReorderHandler(): Promise<void> {
    const merchant = await this.merchant$.pipe(first()).toPromise();
    // Is not possible to reorder a Just Walkout order
    if(merchant.walkout) return;
    await this.initOrderOptionsModal(merchant);
  }

  resolveMenuItemsInOrder(): Observable<(boolean | OrderMenuItem[])[]> {
    return zip(this.cart.menuInfo$, this.order$).pipe(
      map(([menu, orderInfo]) => {
        const existingMenuItems = this.merchantService.extractAllAvailableMenuItemsFromMenu(menu);
        let availableMenuItems = [];
        let isOrderHasUnavailableMenuItems = false;

        for (let i = 0; i < orderInfo.orderItems.length; i++) {
          const item = existingMenuItems.find(({ id }) => id === orderInfo.orderItems[i].menuItemId);
          if (item) availableMenuItems.push(this.getOrderItemInitialObject(orderInfo.orderItems[i], item));
          else isOrderHasUnavailableMenuItems = true;
        }
        availableMenuItems = availableMenuItems.map(item => {
          const filteredOptions = item.orderItemOptions.filter(i => !!i);
          if (filteredOptions.length !== item.orderItemOptions.length) {
            isOrderHasUnavailableMenuItems = true;
            return { ...item, orderItemOptions: filteredOptions };
          }
          return item;
        });

        return [availableMenuItems, isOrderHasUnavailableMenuItems];
      })
    );
  }

  get orderStatus() {
    return ORDERING_STATUS;
  }

  async showModal(): Promise<void> {
    this.order$
      .pipe(
        first(),
        map(({ checkNumber }) => checkNumber)
      )
      .subscribe(await this.initCancelOrderModal.bind(this));
  }

  async back(): Promise<boolean> {
    return this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders]);
  }

  private setActiveOrder(orderId) {
    this.order$ = this.merchantService.recentOrders$.pipe(
      take(1),
      map(orders => orders.find(({ id }) => id === orderId)),
      tap(order => {
        if (!order) return of(null);

        const { checkinStatus, status } = order;
        const map = new Map<string, OrderItem>();
        let count = 0;
        order.orderItems.forEach(item => {
          const current = map.get(item.menuItemId);
          if (current) {
            current.quantity += item.quantity;
          } else {
            if (item.orderItemOptions && item.orderItemOptions.length) {
              map.set(`${item.menuItemId}-${count++}`, item);
            } else {
              map.set(item.menuItemId, item);
            }
          }
        });
        order.orderItems = [];
        for (const value of map.values()) {
          order.orderItems.push(value);
        }
        if (OrderCheckinStatus.isNotCheckedIn(checkinStatus, status)) {
          this.checkinInstructionMessage = this.checkinService.getContentStringByName$('pickup_info');
        } else {
          this.checkinInstructionMessage = of(null);
        }
      })
    );
  }

  async openChecking() {
    await this.checkinProcess.start(await this.order$.toPromise());
  }

  private setActiveMerchant(orderId) {
    this.merchant$ = this.merchantService.recentOrders$.pipe(
      first(),
      map(orders => orders.find(({ id }) => id === orderId)),
      filter(merchant => merchant !== null),
      switchMap(merchant => {
        return this.merchantService.menuMerchants$.pipe(
          map(merchants => merchants.find(({ id }) => id === merchant.merchantId))
        );
      }),
      switchMap(merchant => {
        const res = merchant.settings.map[MerchantSettings.addToCartEnabled] || {};
        this.addToCartEnabled = res.value && !!JSON.parse(res.value);
        merchant.orderTypes.merchantTimeZone = merchant.timeZone;
        if (!merchant.timeZone)
          return this.institutionService.cachedInstitutionInfo$.pipe(
            switchMap(({ timeZone }) => {
              merchant.orderTypes.merchantTimeZone = timeZone;
              return of(merchant);
            })
          );
        else {
          this.merchantTimeZoneDisplayingMessage = "The time zone reflects the merchant's location";
          return of(merchant);
        }
      })
    );
  }

  private getOrderItemInitialObject(orderItem: OrderItem, menuItem: MenuItemInfo): OrderMenuItem {
    return {
      menuItemId: menuItem.id,
      orderItemOptions: orderItem.orderItemOptions.length
        ? this.getOrderItemOptionsInitialObjects(orderItem.orderItemOptions, menuItem)
        : [],
      quantity: orderItem.quantity,
      specialInstructions: orderItem.specialInstructions,
    };
  }

  private getOrderItemOptionsInitialObjects(orderOptions: OrderItem[], menuItem: MenuItemInfo) {
    const allAvailableMenuOptions = this.merchantService.extractAllAvailableMenuItemOptionsFromMenuItem(menuItem);

    return orderOptions.map(orderItem => {
      const res = allAvailableMenuOptions.find(({ id }) => id === orderItem.menuItemId);
      return res && this.getOrderItemInitialObject(orderItem, res);
    });
  }

  private async initOrder({ address, dueTime, orderType, isASAP }): Promise<void> {
    const merchant = await this.merchant$.pipe(first()).toPromise();
    this.cart.clearCart();
    await this.cart.setActiveMerchant(merchant);
    await this.cart.setActiveMerchantsMenuByOrderOptions(dueTime, orderType, address, isASAP);
    const orderItems = await firstValueFrom(
      this.order$.pipe(
        first(),
        map(order =>
          order.orderItems.map(({ menuItemId, name, salePrice, orderItemOptions, quantity, specialInstructions }) => ({
            menuItemId,
            salePrice,
            name,
            orderItemOptions,
            quantity,
            specialInstructions,
          }))
        )
      )
    );
    this.reorderOrder(orderItems);
  }

  private async reorderOrder(orderItems) {
    const order = await firstValueFrom(this.order$.pipe(take(1)));
    await this.loadingService.showSpinner();
    this.cart.addOrderItems(orderItems);
    this.cart.updateOrderNote(order.notes);
    await firstValueFrom(this.cart.validateReOrderItems().pipe(first(), handleServerError(ORDER_VALIDATION_ERRORS)))
      .catch(async error => {
        // Temporary solution:
        if (typeof error === 'object') {
          this.loadingService.closeSpinner();
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [code, text] = error;
          await this.presentPopup(text);
          throw text;
        }
        this.onValidateErrorToast(error, null);
      })
      .then(async (orderInfo: ItemsOrderInfo) => {
        if(!orderInfo) return;
        if (orderInfo.orderRemovedItems.length) {
          const t = await this.modalController.createAlert({
            component: ItemsUnavailableComponent,
            componentProps: { orderRemovedItems: orderInfo.orderRemovedItems, mealBased: order.mealBased },
          });
          t.onDidDismiss().then(({ role }) => {
            role === BUTTON_TYPE.CONTINUE ? this.navigateByValidatedOrder(orderInfo) : this.cart.clearCart();
          });
          return t.present();
        }
        this.navigateByValidatedOrder(orderInfo);
      })
      .finally(await this.loadingService.closeSpinner.bind(this.loadingService));
  }

  private async presentPopup(message) {
    const alert = await this.alertController.create({
      header: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.fullMenu]),
        },
      ],
    });

    await alert.present();
  }

  private async redirectToCart(): Promise<void> {
    await this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.cart]);
  }

  private async onValidateErrorToast(message: string, onDismiss: () => void) {
    await this.toastService.showToast({ message, toastButtons: [{ text: 'Close' }], onDismiss: onDismiss });
  }

  private setActiveAddress() {
    const address = this.order$.pipe(
      first(),
      switchMap(
        ({ type, deliveryAddressId }) =>
          iif(() => type === ORDER_TYPE.DELIVERY, this.getDeliveryAddress(deliveryAddressId), this.getPickupAddress())
      )
    );
    this.orderDetailsOptions$ = zip(address, this.order$, this.userFacadeService.getUserData$(), this.merchant$).pipe(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      map(([address, { type, dueTime }, { locale, timeZone }, merchant]) => {
        const date = new Date(dueTime.replace(TIMEZONE_REGEXP, '$1:$2'));
        const time = date.toLocaleString(locale, { hour12: false, timeZone });
        return {
          address,
          dueTime: new Date(time),
          orderType: type,
          isASAP: false,
        };
      })
    );
  }

  private getPickupAddress(): Observable<AddressInfo> {
    return this.order$.pipe(
      take(1),
      switchMap(({ merchantId, pickupAddressId }) => {
        return this.merchantService.menuMerchants$.pipe(
          map(merchants => ({ merchant: merchants.find(({ id }) => id === merchantId), pickupAddressId }))
        );
      }),
      switchMap(({ merchant: { storeAddress, settings }, pickupAddressId }) => {
        return this.merchantService
          .retrievePickupLocations(storeAddress, settings.map[MerchantSettings.pickupLocationsEnabled])
          .pipe(
            take(1),
            map(pickupLocations => {
              const address = pickupLocations.find(
                ({ addressInfo }) => addressInfo && addressInfo.id == pickupAddressId
              );
              return (address && address.addressInfo) || storeAddress;
            })
          );
      })
    );
  }

  private getDeliveryAddress(deliveryId: string): Observable<AddressInfo> {
    return this.merchantService.retrieveUserAddressList().pipe(
      map(addresses => addresses.find(({ id }) => id === deliveryId)),
      map(address => address)
    );
  }

  private cancelOrder(): Observable<boolean> {
    return this.order$.pipe(
      switchMap(({ id }) => this.merchantService.cancelOrderById(id)),
      handleServerError(ORDER_VALIDATION_ERRORS)
    );
  }

  private async initCancelOrderModal(n: number): Promise<void> {
    const modal = await this.popoverController.create({
      cssClass: 'sc-popover',
      component: ConfirmPopoverComponent,
      componentProps: {
        data: {
          message: `Are you sure you want to cancel order #${n}`,
          title: 'Cancel order?',
          buttons: [{ ...buttons.NO, label: 'no' }, { ...buttons.REMOVE, label: 'yes, cancel' }],
        },
      },
      animated: false,
      backdropDismiss: true,
    });
    modal.onDidDismiss().then(({ role }) => {
      role === BUTTON_TYPE.REMOVE &&
        this.cancelOrder()
          .pipe(take(1))
          .subscribe(response => response && this.back(), msg => this.onValidateErrorToast(msg, this.back.bind(this)));
    });
    await modal.present();
  }

  private async initConfirmModal(onSuccessCb): Promise<void> {
    const message = await firstValueFrom(this.contentStrings.reorderNotAvailableItemMessage);
    const modal = await this.popoverController.create({
      cssClass: 'sc-popover',
      component: StGlobalPopoverComponent,
      componentProps: {
        data: {
          title: 'Warning',
          message,
          buttons: [{ ...buttons.CLOSE, label: 'RETURN' }, { ...buttons.OKAY, label: 'CONTINUE' }],
          showClose: false
        },
      },
      animated: false,
      backdropDismiss: true,
    });

    modal.onDidDismiss().then(({ role }) => {
      role === BUTTON_TYPE.OKAY && onSuccessCb();
    });

    await modal.present();
  }

  async onClosed() {
    if (this.checkinService.navedFromCheckin) {
      await this.openChecking();
      this.checkinService.navedFromCheckin = false;
    } else {
      this.back();
    }
  }

  private async initOrderOptionsModal({
    orderTypes,
    id: merchantId,
    storeAddress,
    settings,
    timeZone,
  }: MerchantInfo): Promise<void> {
    const footerButtonName = 'continue';
    const cssClass = 'order-options-action-sheet order-options-action-sheet-p-d';
    this.merchantService.orderTypes = orderTypes;
    const { deliveryAddressId, type } = await this.order$.pipe(first()).toPromise();

    const modal = await this.modalController.createActionSheet({
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
        timeZone,
      },
    });

    modal.onDidDismiss().then(({ data, role }) => {
      role === BUTTON_TYPE.CONTINUE && this.initOrder(data);
    });

    await modal.present();
  }

  private async initContentStrings() {
    this.contentStrings.buttonClose = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.buttonClose);
    this.contentStrings.buttonReorder = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.buttonReorder
    );
    this.contentStrings.labelBtnCheckin = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelBtnCheckin
    );

    this.contentStrings.lblBtnAdd2Cart = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.lblBtnAdd2Cart
    );

    this.contentStrings.labelOrder = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelOrder);
    this.contentStrings.buttonCancelOrder = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.buttonCancelOrder
    );
    this.contentStrings.reorderNotAvailableItemMessage = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.reorderNotAvailableItemMessage
    );
  }

  private navigateByValidatedOrder(orderInfo: ItemsOrderInfo) {
    if (orderInfo.order.orderItems.length) {
      return this.redirectToCart();
    }

    return this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.fullMenu]);
  }
  onAddItems() {
    this.orderDetailsOptions$
      .pipe(
        withLatestFrom(this.merchant$, this.order$),
        take(1)
      )
      .subscribe(
        async ([
          { dueTime, orderType, address, isASAP },
          merchant,
          {
            id,
            orderPayment: [orderPayment],
          },
        ]: [
            {
              dueTime: Date;
              orderType: ORDER_TYPE;
              address: AddressInfo;
              isASAP?: boolean;
            },
            MerchantInfo,
            OrderInfo
          ]) => {
          await this.cart.onAddItems({
            merchant,
            orderPayment,
            orderOptions: { dueTime, orderType, address, isASAP },
            orderId: id,
          });
          this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.fullMenu], {
            queryParams: { isExistingOrder: true },
          });
        }
      );
  }

  get checkAddToCart$(): Observable<OrderInfo> {
    return this.order$.pipe(tap(({ checkinStatus, status}) => OrderCheckinStatus.isNotCheckedIn(checkinStatus, status)));
  }
}
