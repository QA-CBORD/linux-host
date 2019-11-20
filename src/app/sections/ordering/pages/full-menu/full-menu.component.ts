import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CartService, OrderDetailOptions } from '@sections/ordering';
import { Observable, Subscription } from 'rxjs';
import { MenuInfo, MerchantInfo, MerchantOrderTypesInfo } from '@sections/ordering/shared/models';
import { Router } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { LOCAL_ROUTING, ORDER_TYPE } from '@sections/ordering/ordering.config';
import { first, map, take, tap } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { OrderOptionsActionSheetComponent } from '@sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';

@Component({
  selector: 'st-full-menu',
  templateUrl: './full-menu.component.html',
  styleUrls: ['./full-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullMenuComponent implements OnInit, OnDestroy {

  private readonly sourceSubscription: Subscription = new Subscription();
  menu$: Observable<MenuInfo>;
  orderInfo$: Observable<OrderDetailOptions>;
  merchantInfo$: Observable<MerchantInfo>;
  merchantInfoState: boolean = false;
  menuItems$: Observable<number>;

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly cdRef: ChangeDetectorRef,
  ) {
  }

  get orderType(): Observable<string> {
    return this.orderInfo$.pipe(map(({ orderType }) => {
      switch (orderType) {
        case ORDER_TYPE.PICKUP:
          return 'Pickup';
        case ORDER_TYPE.DELIVERY:
          return 'Delivery';
        default:
          return 'DineIn';
      }
    }));
  }

  ionViewWillEnter() {
    this.menuItems$ = this.cartService.menuItems$;
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.menu$ = this.cartService.menuInfo$;
    this.merchantInfo$ = this.cartService.merchant$;
    this.orderInfo$ = this.cartService.orderDetailsOptions$;
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
        take(1),
      )
      .subscribe();
  }

  private async actionSheet(orderTypes: MerchantOrderTypesInfo, merchantId, storeAddress, settings) {
    const footerButtonName = 'set order options';
    const cssClass = `order-options-action-sheet ${orderTypes.delivery || orderTypes.pickup 
      ? ' order-options-action-sheet-p-d' 
      : ''}`;
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
        this.cartService.setActiveMerchantsMenuByOrderOptions(data.dueTime, data.orderType, data.address);
      }
    });

    await modal.present();
  }

}
