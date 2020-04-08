import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CartService, OrderDetailOptions, MerchantService } from '@sections/ordering';
import { Observable, Subscription, zip } from 'rxjs';
import { MenuInfo, MerchantInfo, MerchantOrderTypesInfo } from '@sections/ordering/shared/models';
import { Router } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import {
  LOCAL_ROUTING,
  ORDER_TYPE,
  ORDER_VALIDATION_ERRORS,
  ORDERING_CONTENT_STRINGS,
  ORDER_ERROR_CODES
} from '@sections/ordering/ordering.config';
import { first, map, take } from 'rxjs/operators';
import { ModalController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { OrderOptionsActionSheetComponent } from '@sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { LoadingService } from '@core/service/loading/loading.service';
import { handleServerError } from '@core/utils/general-helpers';
import { FullMenuPopoverComponent } from './full-menu-popover';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';

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
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly toastController: ToastController,
    private readonly popoverCtrl: PopoverController,
    private readonly orderingService: OrderingService,
    private readonly alertController: AlertController
  ) {
  }

  ngOnInit() {
    this.menu$ = this.cartService.menuInfo$;
    this.merchantInfo$ = this.cartService.merchant$;
    this.initContentStrings();
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  get orderType(): Observable<string> {
    return zip(this.orderInfo$, this.contentStrings.labelPickup, this.contentStrings.labelDelivery).pipe(
      map(([{ orderType }, pickup, delivery]) => {
        switch (orderType) {
          case ORDER_TYPE.PICKUP:
            return pickup;
          case ORDER_TYPE.DELIVERY:
            return delivery;
          default:
            return 'DineIn';
        }
      })
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

    /// order details screen close
  modal.onDidDismiss().then(async ({ data }) => {
  if (!data) return;

  const cachedData = await this.cartService.orderDetailsOptions$.pipe(first()).toPromise();
  await this.cartService.setActiveMerchantsMenuByOrderOptions(
    data.dueTime,
    data.orderType,
    data.address,
    data.isASAP
  );
  this.cartService.orderItems$.pipe(first()).subscribe(items => {
    if (items.length) {
      const errorCB = () => this.modalHandler(cachedData);
      this.validateOrder(null, errorCB, IGNORE_ERRORS);
    }
  });
});

await modal.present();
}

  redirectToCart() {
    if(this.cartService.cartsErrorMessage !== null) {
      this.presentPopup(this.cartService.cartsErrorMessage);
      return;
    }
    const successCb = () => this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.cart], { skipLocationChange: true });
    const errorCB = (error: Array<string> | string) => {
      if(Array.isArray(error)) {
        const [code, message] = error;
        if(IGNORE_ERRORS.includes(code)) return this.presentPopup(message);
        error = message;
      }
      return this.failedValidateOrder(error);
    };
    this.validateOrder(successCb, errorCB);
  }

  private async presentPopup(message) {
    const alert = await this.alertController.create({
      header: message,
      buttons: [ {text: 'Ok'} ]
    });

    await alert.present();
  }

  private async validateOrder(successCb, errorCB, ignoreCodes?:string[]) {
    this.loadingService.showSpinner();
    await this.cartService
      .validateOrder()
      .pipe(
        first(),
        handleServerError(ORDER_VALIDATION_ERRORS, ignoreCodes),
      )
      .toPromise()
      .then( 
        () => {
          this.cartService.cartsErrorMessage = null;
          return successCb && successCb();
        })
      .catch((error: Array<string> | string) => {
        if(Array.isArray(error) && IGNORE_ERRORS.includes(error[0])) {
          this.cartService.cartsErrorMessage = error[1];
          return errorCB(error);
        } 
       return errorCB(error);
      })
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

  private initContentStrings() {
    this.contentStrings.buttonExplore
      = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.buttonExplore);
    this.contentStrings.labelFor
      = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelFor);
    this.contentStrings.labelFullMenu
      = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelFullMenu);
    this.contentStrings.labelPickup = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelPickup);
    this.contentStrings.labelDelivery = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelDelivery
    );
  }
}

export const IGNORE_ERRORS = [
  ORDER_ERROR_CODES.ORDER_DELIVERY_ITEM_MIN,
  ORDER_ERROR_CODES.ORDER_ITEM_MIN,
  ORDER_ERROR_CODES.ORDER_ITEM_MAX
];
