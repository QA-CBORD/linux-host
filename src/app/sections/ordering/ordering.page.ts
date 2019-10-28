import { MerchantService } from './services';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { Observable, iif } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  ) { }

  ngOnInit() {
    this.merchantList$ = this.merchantService.menuMerchants$;
    this.orders$ = this.merchantService.getRecentOrders();
  }

  merchantClickHandler({ id, orderTypes, storeAddress, settings }) {
    this.openOrderOptions(id, orderTypes, storeAddress, settings);
  }

  favouriteHandler({ isFavorite, id }) {
    this.loadingService.showSpinner();
    iif(() => isFavorite, this.merchantService.removeFavoriteMerchant(id), this.merchantService.addFavoriteMerchant(id))
      .pipe(switchMap(() => this.merchantService.getMerchantsWithFavoriteInfo()))
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
    console.log(`Location Pin Clicked - Merch Id: ${event}`);
  }

  private openOrderOptions(merchantId, orderTypes, storeAddress, settings) {
    this.actionSheet(orderTypes, merchantId, storeAddress, settings);
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
      console.log(data);
      this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.fullMenu], { skipLocationChange: true });
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
