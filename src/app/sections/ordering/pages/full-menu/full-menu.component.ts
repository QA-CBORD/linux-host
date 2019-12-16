import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CartService, OrderDetailOptions, MerchantService } from '@sections/ordering';
import { Observable, Subscription, zip } from 'rxjs';
import { MenuInfo, MerchantInfo, MerchantOrderTypesInfo } from '@sections/ordering/shared/models';
import { Router } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { LOCAL_ROUTING, ORDER_TYPE, ORDER_VALIDATION_ERRORS } from '@sections/ordering/ordering.config';
import { first, map, take, tap } from 'rxjs/operators';
import { ModalController, ToastController } from '@ionic/angular';
import { OrderOptionsActionSheetComponent } from '@sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { LoadingService } from '@core/service/loading/loading.service';
import { handleServerError } from '@core/utils/general-helpers';

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
  merchantInfoState: boolean = false;
  menuItems$: Observable<number>;
  orderTypes: MerchantOrderTypesInfo;
  orderInfo: OrderDetailOptions;

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly cdRef: ChangeDetectorRef,
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly toastController: ToastController
  ) {}

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
      })
    );
  }

  get orderInfo$(): Observable<OrderDetailOptions> {
    return this.cartService.orderDetailsOptions$;
  }

  ionViewWillEnter() {
    this.menuItems$ = this.cartService.menuItems$;
    zip(this.merchantService.orderTypes$, this.cartService.orderDetailsOptions$)
      .pipe(first())
      .subscribe(([orderTypes, orderInfo]) => {
        this.orderTypes = orderTypes;
        this.orderInfo = orderInfo;
        this.cdRef.detectChanges();
      });
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

  openOrderOptions() {
    this.merchantInfo$
      .pipe(
        tap(merchant => this.actionSheet(merchant.orderTypes, merchant.id, merchant.storeAddress, merchant.settings)),
        take(1)
      )
      .subscribe();
  }

  private async actionSheet(orderTypes: MerchantOrderTypesInfo, merchantId, storeAddress, settings) {
    const footerButtonName = 'set order options';
    const cssClass = `order-options-action-sheet ${
      orderTypes.delivery && orderTypes.pickup ? ' order-options-action-sheet-p-d' : ''
    }`;
    const orderInfo = await this.orderInfo$.pipe(first()).toPromise();
    const modal = await this.modalController.create({
      component: OrderOptionsActionSheetComponent,
      cssClass,
      componentProps: {
        orderTypes,
        footerButtonName,
        merchantId,
        storeAddress,
        settings,
        activeDeliveryAddressId: orderInfo.orderType === ORDER_TYPE.PICKUP ? null : orderInfo.address.id,
        activeOrderType: orderInfo.orderType === ORDER_TYPE.DELIVERY ? ORDER_TYPE.DELIVERY : null,
      },
    });

    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        this.cartService.setActiveMerchantsMenuByOrderOptions(data.dueTime, data.orderType, data.address, data.isASAP);
      }
    });

    await modal.present();
  }

  async redirectToCart() {
    this.loadingService.showSpinner();
    await this.cartService
      .validateOrder()
      .pipe(
        first(),
        handleServerError(ORDER_VALIDATION_ERRORS)
      )
      .toPromise()
      .then(() => this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.cart], { skipLocationChange: true }))
      .catch(error => this.failedValidateOrder(error))
      .finally(() => this.loadingService.closeSpinner());
  }

  private async failedValidateOrder(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }
}
