import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CartService, OrderDetailOptions, MerchantService } from '@sections/ordering';
import { Observable, Subscription, zip } from 'rxjs';
import { MenuInfo, MerchantInfo, MerchantOrderTypesInfo } from '@sections/ordering/shared/models';
import { Router } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { LOCAL_ROUTING, ORDER_TYPE, ORDER_VALIDATION_ERRORS } from '@sections/ordering/ordering.config';
import { first, map, take, tap } from 'rxjs/operators';
import { ModalController, ToastController, PopoverController } from '@ionic/angular';
import { OrderOptionsActionSheetComponent } from '@sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { LoadingService } from '@core/service/loading/loading.service';
import { handleServerError } from '@core/utils/general-helpers';
import { FullMenuPopoverComponent } from './full-menu-popover';
import { BUTTON_TYPE } from '@core/utils/buttons.config';

@Component({
  selector: 'st-full-menu',
  templateUrl: './full-menu.component.html',
  styleUrls: ['./full-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullMenuComponent implements OnInit, OnDestroy {
  private readonly sourceSubscription: Subscription = new Subscription();
  menu$: Observable<MenuInfo>;
  merchantInfo$: Observable<MerchantInfo>;
  merchantInfoState: boolean = false;
  menuItems$: Observable<number>;
  orderTypes: MerchantOrderTypesInfo;
  orderInfo: OrderDetailOptions;

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly toastController: ToastController,
    private readonly popoverCtrl: PopoverController,
  ) {
  }

  get orderType(): Observable<string> {
    return this.orderInfo$.pipe(
      map(({ orderType }) => {
        switch (orderType) {
          case ORDER_TYPE.PICKUP:
            return 'Pickup';
          case ORDER_TYPE.DELIVERY:
            return 'Delivery';
          default:
            return 'DineIn';
        }
      }),
    );
  }

  get orderInfo$(): Observable<OrderDetailOptions> {
    return this.cartService.orderDetailsOptions$;
  }

  get orderDetails$() {
    return zip(this.merchantService.orderTypes$, this.cartService.orderDetailsOptions$).pipe(
      map(([orderTypes, orderInfo]) => ({ orderTypes, orderInfo })),
    );
  }

  ionViewWillEnter() {
    this.menuItems$ = this.cartService.menuItems$;
  }

  ngOnInit() {
    this.menu$ = this.cartService.menuInfo$;
    this.merchantInfo$ = this.cartService.merchant$;
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  onCategoryClicked({ id }) {
    this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.menuCategoryItems, id], { skipLocationChange: true });
  }

  async openOrderOptions() {
    const { orderTypes, id, storeAddress, settings } = await this.merchantInfo$.pipe(take(1)).toPromise();
    await this.actionSheet(orderTypes, id, storeAddress, settings);
  }

  private async actionSheet(orderTypes: MerchantOrderTypesInfo, merchantId, storeAddress, settings) {
    const footerButtonName = 'set order options';
    const cssClass = `order-options-action-sheet ${
      orderTypes.delivery && orderTypes.pickup ? ' order-options-action-sheet-p-d' : ''
      }`;
    const { orderType, address } = await this.orderInfo$.pipe(first()).toPromise();
    const modal = await this.modalController.create({
      component: OrderOptionsActionSheetComponent,
      cssClass,
      componentProps: {
        orderTypes,
        footerButtonName,
        merchantId,
        storeAddress,
        settings,
        activeDeliveryAddressId: orderType === ORDER_TYPE.PICKUP ? null : address.id,
        activeOrderType: orderType === ORDER_TYPE.DELIVERY ? ORDER_TYPE.DELIVERY : null,
      },
    });

    modal.onDidDismiss().then(async ({ data }) => {
      if (!data) return;

      const cachedData = await this.cartService.orderDetailsOptions$.pipe(first()).toPromise();
      await this.cartService.setActiveMerchantsMenuByOrderOptions(data.dueTime, data.orderType, data.address, data.isASAP);
      this.cartService.orderItems$.pipe(first()).subscribe(items => {
        if (items.length) {
          const errorCB = () => this.modalHandler(cachedData);
          this.validateOrder(null, errorCB);
        }
      });
    });

    await modal.present();
  }

  redirectToCart() {
    const successCb = () => this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.cart], { skipLocationChange: true });
    const errorCB = error => this.failedValidateOrder(error);
    this.validateOrder(successCb, errorCB);
  }

  private async validateOrder(successCb, errorCB) {
    this.loadingService.showSpinner();
    await this.cartService
      .validateOrder()
      .pipe(
        first(),
        handleServerError(ORDER_VALIDATION_ERRORS),
      )
      .toPromise()
      .then(successCb)
      .catch(errorCB)
      .finally(() => this.loadingService.closeSpinner());
  }

  private async failedValidateOrder(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }

  private async modalHandler({ dueTime, orderType, address, isASAP }) {
    const popover = await this.popoverCtrl.create({
      component: FullMenuPopoverComponent,
      componentProps: {},
      animated: false,
      backdropDismiss: true,
    });

    popover.onDidDismiss().then(({ role }) => {
      switch (role) {
        case BUTTON_TYPE.CLOSE:
          this.cartService.setActiveMerchantsMenuByOrderOptions(dueTime, orderType, address, isASAP);
          break;
        case BUTTON_TYPE.OKAY:
          this.cartService.removeLastOrderItem();
          break;
      }
    });

    return await popover.present();
  }
}
