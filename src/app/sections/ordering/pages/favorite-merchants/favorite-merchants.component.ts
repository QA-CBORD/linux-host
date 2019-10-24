import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { UserService } from '@core/service/user-service/user.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { FavoriteMerhantsService } from './services/favorite-merhants.service';
import { switchMap, take } from 'rxjs/operators';
import { of, zip } from 'rxjs';
import { NAVIGATE } from 'src/app/app.global';
import { MerchantInfo, MerchantOrderTypesInfo } from '../../shared/models';
import { MerchantService } from '../../services';
import { ORDER_TYPE } from '../../ordering.config';
import { OrderOptionsActionSheetComponent } from '../../shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';

@Component({
  selector: 'st-favorite-merchants',
  templateUrl: './favorite-merchants.component.html',
  styleUrls: ['./favorite-merchants.component.scss'],
})
export class FavoriteMerchantsComponent implements OnInit {
  merchantList: MerchantInfo[];
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly merchantService: MerchantService,
    private readonly userService: UserService,
    private readonly loadingService: LoadingService,
    private readonly toastController: ToastController,
    private readonly favoriteMerhantsService: FavoriteMerhantsService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ data }) => (this.merchantList = data));
  }

  backToOrdering() {
    this.router.navigate([NAVIGATE.ordering], { skipLocationChange: true });
  }

  merchantClickHandler({ id, orderTypes, storeAddress, settings }) {
    this.openOrderOptions(id, orderTypes, storeAddress, settings);
  }

  favouriteHandler({ id }) {
    this.loadingService.showSpinner();
    this.merchantService
      .removeFavoriteMerchant(id)
      .pipe(switchMap(() => this.favoriteMerhantsService.getFavoriteMerchants()))
      .subscribe(
        data => {
          this.merchantList = data;
          const message = 'Removed from favorites';
          this.onToastDisplayed(message);
          this.loadingService.closeSpinner();
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
    modal.onDidDismiss().then(() => { });
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
