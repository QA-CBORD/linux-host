import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { AlertController, IonicSafeString } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { CartService, MerchantService, OrderDetailOptions } from '@sections/ordering';
import { LOCAL_ROUTING, ORDERING_CONTENT_STRINGS, ORDER_TYPE } from '@sections/ordering/ordering.config';
import { OrderActionSheetService } from '@sections/ordering/services/odering-actionsheet.service';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { MenuInfo, MerchantInfo, MerchantOrderTypesInfo } from '@sections/ordering/shared/models';
import { OrderOptionsActionSheetComponent } from '@sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { APP_ROUTES } from '@sections/section.config';
import { NavigationService } from '@shared/services/navigation.service';
import { Observable, Subscription, zip } from 'rxjs';
import { first, map, take } from 'rxjs/operators';

export const DINEIN = 'DineIn';
@Component({
  selector: 'st-full-menu',
  templateUrl: './full-menu.component.html',
  styleUrls: ['./full-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullMenuComponent implements OnInit, OnDestroy {
  private readonly sourceSubscription: Subscription = new Subscription();
  private dismissSuscription: Subscription;
  menu$: Observable<MenuInfo>;
  merchantInfo$: Observable<MerchantInfo>;
  merchantInfoState = false;
  menuItems$: Observable<number>;
  orderTypes: MerchantOrderTypesInfo;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};
  canDismiss = true;

  constructor(
    private readonly cartService: CartService,
    private readonly modalController: ModalsService,
    private readonly merchantService: MerchantService,
    private readonly orderingService: OrderingService,
    private readonly alertController: AlertController,
    private readonly activatedRoute: ActivatedRoute,
    private readonly routingService: NavigationService,
    private orderActionSheetService: OrderActionSheetService,
    private readonly translateService: TranslateService,
    private readonly cdref: ChangeDetectorRef,
    private readonly loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.menu$ = this.cartService.menuInfo$;
    this.merchantInfo$ = this.cartService.merchant$;
    this.dismissSuscription = this.modalController.getCanDismiss().subscribe(canDismiss => {
      this.canDismiss = canDismiss;
    });
    this.initContentStrings();
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
    this.dismissSuscription.unsubscribe();
  }

  get orderType(): Observable<string> {
    return zip(this.orderInfo$, this.contentStrings.labelPickup, this.contentStrings.labelDelivery).pipe(
      map(([orderInfo, pickup, delivery]) => {
        switch (orderInfo?.orderType) {
          case ORDER_TYPE.PICKUP:
            return pickup;
          case ORDER_TYPE.DELIVERY:
            return delivery;
          default:
            return DINEIN;
        }
      })
    );
  }

  get orderInfo$(): Observable<OrderDetailOptions> {
    return this.cartService.orderDetailsOptions$;
  }

  get orderTypes$(): Observable<MerchantOrderTypesInfo> {
    return this.cartService.merchant$.pipe(map((merchant) => merchant?.orderTypes));
  }
  get cartOrderTypes$(): Observable<MerchantOrderTypesInfo> {
    return this.cartService.orderTypes$;
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
    const { openTimeSlot, canDismiss, isExistingOrder } = this.activatedRoute.snapshot.queryParams;
    this.modalController.emitCanDismiss(canDismiss === 'false' ? false : true);
    openTimeSlot && this.openOrderOptions();
    isExistingOrder && this.validateOrder();
    this.cdref.detectChanges();
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
      canDismiss: () => {
        return new Promise<boolean>(resolve => {
          resolve(this.canDismiss);
        });
      },
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

    await this.cartService.setActiveMerchantsMenuByOrderOptions(
      data.dueTime,
      data.orderType,
      data.address,
      data.isASAP
    );
    this.cartService.orderItems$.pipe(first()).subscribe(items => {
      if (items.length) {
        this.validateOrder();
      }
    });
  }

  redirectToCart(): void {
    this.orderingService.redirectToCart();
  }

  async modalHandler({ dueTime, orderType, address, isASAP }) {
    const alert = await this.alertController.create({
      cssClass: 'alert_full_menu',
      header: this.translateService.instant('patron-ui.ordering.new_menu_detected_title'),
      message: new IonicSafeString(this.translateService.instant('patron-ui.ordering.new_menu_detected_message')),
      mode: 'md',
      buttons: [
        {
          text: this.translateService.instant('patron-ui.ordering.new_menu_detected_cancelbutton'),
          role: 'cancel',
          cssClass: 'button__option_cancel',
          handler: () => {
            this.cartService.setActiveMerchantsMenuByOrderOptions(dueTime, orderType, address, isASAP);
          },
        },
        {
          text: this.translateService.instant('patron-ui.ordering.new_menu_detected_changemenubutton'),
          role: 'confirm',
          cssClass: 'button__option_confirm',
          handler: () => {
            this.cartService.clearActiveOrder();
          },
        },
      ],
    });

    await alert.present();
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

  onOrdersButtonClicked() {
    this.loadingService.showSpinner();
    this.routingService.navigate([APP_ROUTES.ordering]).then(() => {
      this.orderActionSheetService.openActionSheet();
      this.loadingService.closeSpinner();
    });
  }
  toggleMerchantInfo() {
    this.merchantInfoState = !this.merchantInfoState;
    this.cdref.detectChanges();
  }
  async validateOrder() {
    const cachedData = await this.cartService.orderDetailsOptions$.pipe(first()).toPromise();
    const errorCB = () => this.modalHandler(cachedData);
    this.orderingService.validateOrder(null, errorCB);
  }
}
