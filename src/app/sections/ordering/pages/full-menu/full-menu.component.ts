import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable, Subscription } from 'rxjs';
import { MenuInfo, MerchantInfo, MerchantOrderTypesInfo } from '@sections/ordering/shared/models';
import { Router } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { LOCAL_ROUTING, ORDER_TYPE } from '@sections/ordering/ordering.config';
import { take, tap } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { OrderOptionsActionSheetComponent } from '@sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';

@Component({
  selector: 'st-full-menu',
  templateUrl: './full-menu.component.html',
  styleUrls: ['./full-menu.component.scss'],
})
export class FullMenuComponent implements OnInit, OnDestroy {

  private readonly sourceSubscription: Subscription = new Subscription();
  menu$: Observable<MenuInfo>;
  orderInfo: { dueTime: Date, orderType: number, address };
  merchantInfo$: Observable<MerchantInfo>;
  merchantInfoState: boolean = false;
  constructor(
    private readonly cartService: CartService,
    private readonly router: Router,
    private readonly modalController: ModalController
  ) { }

  get orderType() {
    return this.orderInfo.orderType === ORDER_TYPE.PICKUP ? 'Pickup'
      : this.orderInfo.orderType === ORDER_TYPE.DELIVERY ? 'Delivery' : 'DineIn';
  }

  ngOnInit() {
    this.menu$ = this.cartService.menuInfo$
    this.merchantInfo$ = this.cartService.merchant$;
    const subscription = this.cartService.orderDetailsOptions$
      .subscribe(orderDetails => {
        this.orderInfo = orderDetails;
      });

    this.sourceSubscription.add(subscription);
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
      .subscribe()
  }

  private async actionSheet(orderTypes: MerchantOrderTypesInfo, merchantId, storeAddress, settings) {
    const footerButtonName = 'set order options';
    let cssClass = 'order-options-action-sheet';
    cssClass += orderTypes.delivery && orderTypes.pickup ? ' order-options-action-sheet-p-d' : '';

    const modal = await this.modalController.create({
      component: OrderOptionsActionSheetComponent,
      cssClass,
      componentProps: {
        orderTypes,
        footerButtonName,
        merchantId,
        storeAddress,
        settings,
        activeDeliveryAddressId: this.orderInfo.orderType === ORDER_TYPE.PICKUP ? null : this.orderInfo.address.id,
        activeOrderType: this.orderInfo.orderType === ORDER_TYPE.DELIVERY ? ORDER_TYPE.DELIVERY : null,
      },
    });
    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        this.cartService.setActiveMerchantsMenuByOrderOptions(data.dueTime, data.orderType, data.address)
      }
    });
    await modal.present();
  }

}
