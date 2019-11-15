import { MerchantService, CartService } from './services';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { Observable, iif } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

import { MerchantInfo, MerchantOrderTypesInfo, OrderInfo } from './shared/models';
import { LoadingService } from '@core/service/loading/loading.service';
import { OrderOptionsActionSheetComponent } from './shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { Router } from '@angular/router';
import { LOCAL_ROUTING } from './ordering.config';
import { NAVIGATE } from 'src/app/app.global';


@Component({
  selector: 'st-ordering.page',
  templateUrl: './ordering.page.html',
  styleUrls: ['./ordering.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderingPage implements OnInit {
  merchantList$: Observable<MerchantInfo[]>;
  orders$: Observable<OrderInfo[]>;

  constructor(
    private readonly modalController: ModalController,
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly toastController: ToastController,
    private readonly router: Router,
    private readonly cartService: CartService
  ) { }

  ngOnInit() {
    this.merchantList$ = this.merchantService.menuMerchants$;
    this.orders$ = this.merchantService.getRecentOrders();
  }

  merchantClickHandler(merchantInfo) {
    this.openOrderOptions(merchantInfo);
  }

  favouriteHandler({ isFavorite, id }) {
    this.loadingService.showSpinner();
    iif(() => isFavorite, this.merchantService.removeFavoriteMerchant(id), this.merchantService.addFavoriteMerchant(id))
      .pipe(
        switchMap(() => this.merchantService.getMerchantsWithFavoriteInfo()),
        first()
      )
      .subscribe(
        () => {
          this.loadingService.closeSpinner();
          const message = isFavorite ? 'Removed from favorites' : 'Added to favorites';
          this.onToastDisplayed(message);
        },
        () => this.loadingService.closeSpinner()
      );
  }

  locationPinHandler(event: string) {
    // TODO location feature
    // console.log(`Location Pin Clicked - Merch Id: ${event}`);
  }

  private openOrderOptions(merchant) {
    this.cartService.setActiveMerchant(merchant);
    this.actionSheet(merchant.orderTypes, merchant.id, merchant.storeAddress, merchant.settings);
  }

  private async actionSheet(orderTypes: MerchantOrderTypesInfo, merchantId, storeAddress, settings) {
    const footerButtonName = 'continue';
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
        settings
      },
    });
    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        this.cartService.setActiveMerchantsMenuByOrderOptions(data.dueTime, data.orderType, data.address);
        this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.fullMenu], { skipLocationChange: true });
      }
    });
    await modal.present();
  }

  private async onToastDisplayed(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position: 'bottom',
      closeButtonText: 'DISMISS',
      showCloseButton: true,
    });
    toast.present();
  }
}
