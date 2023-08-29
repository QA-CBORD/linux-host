import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CartService, MerchantService, OrderDetailOptions } from '@sections/ordering';
import { Observable, Subscription, zip } from 'rxjs';
import { MenuInfo, MerchantInfo, MerchantOrderTypesInfo } from '@sections/ordering/shared/models';
import { ActivatedRoute } from '@angular/router';
import {
  LOCAL_ROUTING,
  ORDER_ERROR_CODES,
  ORDER_TYPE,
  ORDER_VALIDATION_ERRORS,
  ORDERING_CONTENT_STRINGS,
} from '@sections/ordering/ordering.config';
import { first, map, take } from 'rxjs/operators';
import { AlertController, PopoverController } from '@ionic/angular';
import { OrderOptionsActionSheetComponent } from '@sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { LoadingService } from '@core/service/loading/loading.service';
import { handleServerError } from '@core/utils/general-helpers';
import { FullMenuPopoverComponent } from './full-menu-popover';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { OverlayEventDetail } from '@ionic/core';
import { ToastService } from '@core/service/toast/toast.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { NavigationService } from '@shared/services/navigation.service';
import { APP_ROUTES } from '@sections/section.config';
import { OrderActionSheetService } from '@sections/ordering/services/odering-actionsheet.service';
@Component({
  selector: 'st-full-menu',
  templateUrl: './full-menu.component.html',
  styleUrls: ['./full-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FullMenuComponent implements OnInit, OnDestroy {
  private readonly sourceSubscription: Subscription = new Subscription();
  menu$: Observable<MenuInfo>;
  merchantInfo$: Observable<MerchantInfo>;
  merchantInfoState = false;
  menuItems$: Observable<number>;
  orderTypes: MerchantOrderTypesInfo;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};
  constructor(
    private readonly cartService: CartService,
    private readonly modalController: ModalsService,
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly popoverCtrl: PopoverController,
    private readonly orderingService: OrderingService,
    private readonly alertController: AlertController,
    private readonly activatedRoute: ActivatedRoute,
    private readonly routingService: NavigationService,
    private orderActionSheetService: OrderActionSheetService,
    
  ) {}

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
      map(([orderTypes, orderInfo]) => {
        orderTypes.merchantTimeZone = this.cartService.merchantTimeZone;
        return { orderTypes, orderInfo };
      })
    );
  }

  ionViewWillEnter() {
    this.menuItems$ = this.cartService.menuItems$;
    const { openTimeSlot } = this.activatedRoute.snapshot.queryParams;
    openTimeSlot && this.openOrderOptions();
  }

  async onCategoryClicked({ id }): Promise<void> {
    await this.routingService.navigate([APP_ROUTES.ordering, LOCAL_ROUTING.menuCategoryItems, id], {
      queryParams: { isExistingOrder: this.cartService.isExistingOrder },
    });
  }

  async openOrderOptions(): Promise<void> {
    const { orderTypes, id, storeAddress, settings, timeZone } = await this.merchantInfo$.pipe(take(1)).toPromise();
    orderTypes.merchantTimeZone = timeZone;
    await this.actionSheet(orderTypes, id, storeAddress, settings, timeZone);
  }

  navigateToScannedItem(menuItemId: string) {
    this.routingService.navigate([APP_ROUTES.ordering, LOCAL_ROUTING.itemDetail], {
      queryParams: { menuItemId, isScannedItem: true },
    });
  }

  private async actionSheet(
    orderTypes: MerchantOrderTypesInfo,
    merchantId,
    storeAddress,
    settings,
    timeZone
  ): Promise<void> {
    const footerButtonName = 'set order options';
    const cssClass = `order-options-action-sheet ${
      orderTypes.delivery && orderTypes.pickup ? ' order-options-action-sheet-p-d' : ''
    }`;
    const { orderType, address } = await this.orderInfo$.pipe(first()).toPromise();
    const modal = await this.modalController.createActionSheet({
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
        timeZone,
      },
    });
    modal.onDidDismiss().then(this.onDismissOrderDetails.bind(this));
    await modal.present();
  }

  private async onDismissOrderDetails({ data }: OverlayEventDetail): Promise<void> {
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
  }

  async redirectToCart(): Promise<void> {
    if (this.cartService.cartsErrorMessage !== null) {
      return this.presentPopup(this.cartService.cartsErrorMessage);
    }
    const successCb = () =>
      this.routingService.navigate([APP_ROUTES.ordering, LOCAL_ROUTING.cart], {
        queryParams: { isExistingOrder: this.cartService.isExistingOrder },
      });
    const errorCB = (error: Array<string> | string) => {
      if (Array.isArray(error)) {
        const [code, message] = error;
        if (IGNORE_ERRORS.includes(code)) return this.presentPopup(message);
        error = message;
      }
      return this.failedValidateOrder(error);
    };
    await this.validateOrder(successCb, errorCB);
  }

  private async presentPopup(message) {
    const alert = await this.alertController.create({
      header: message,
      buttons: [{ text: 'Ok' }],
    });

    await alert.present();
  }

  private async validateOrder(successCb, errorCB, ignoreCodes?: string[]): Promise<void> {
    await this.loadingService.showSpinner();
    await this.cartService
      .validateOrder()
      .pipe(
        first(),
        handleServerError(ORDER_VALIDATION_ERRORS, ignoreCodes)
      )
      .toPromise()
      .then(() => {
        this.cartService.cartsErrorMessage = null;
        return successCb && successCb();
      })
      .catch((error: Array<string> | string) => {
        if (Array.isArray(error) && IGNORE_ERRORS.includes(error[0])) {
          this.cartService.cartsErrorMessage = error[1];
        }
        return errorCB(error);
      })
      .finally(() => this.loadingService.closeSpinner());
  }

  private async failedValidateOrder(message: string): Promise<void> {
    await this.toastService.showToast({ message });
  }

  private async modalHandler({ dueTime, orderType, address, isASAP }) {
    const popover = await this.popoverCtrl.create({
      cssClass: 'sc-popover',
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
    this.contentStrings.buttonExplore = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.buttonExplore
    );
    this.contentStrings.labelFor = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelFor);
    this.contentStrings.labelFullMenu = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelFullMenu
    );
    this.contentStrings.labelPickup = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelPickup);
    this.contentStrings.labelDelivery = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelDelivery
    );
  }

  onOrdersButtonClicked(){
    this.routingService.navigate([APP_ROUTES.ordering]).then(() => {
        this.orderActionSheetService.openActionSheet();
      });

  }
}

export const IGNORE_ERRORS = [
  ORDER_ERROR_CODES.ORDER_DELIVERY_ITEM_MIN,
  ORDER_ERROR_CODES.ORDER_ITEM_MIN,
  ORDER_ERROR_CODES.ORDER_ITEM_MAX,
];
