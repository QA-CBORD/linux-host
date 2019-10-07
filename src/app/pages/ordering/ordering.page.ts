import { MerchantService } from './services';
import { Component, OnInit } from '@angular/core';

import { Observable, of, iif, zip } from 'rxjs';

import { MerchantInfo, MerchantOrderTypesInfo } from './shared/models';
import { ModalController, ToastController } from '@ionic/angular';
import { UserService } from '@core/service/user-service/user.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { switchMap, take } from 'rxjs/operators';
import { OrderType } from './ordering.config';
import { OrderOptionsActionSheetComponent } from './shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';

@Component({
  selector: 'st-ordering.page',
  templateUrl: './ordering.page.html',
  styleUrls: ['./ordering.page.scss'],
})
export class OrderingPage implements OnInit {
  merchantList$: Observable<MerchantInfo[]>;

  constructor(
    private readonly modalController: ModalController,
    private readonly merchantService: MerchantService,
    private readonly userService: UserService,
    private readonly loadingService: LoadingService,
    private readonly toastController: ToastController
  ) {}

  ngOnInit() {
    this.merchantList$ = this.merchantService.menuMerchants$;
  }

  merchantClickHandler({ id, orderTypes, storeAddress }) {
    this.openOrderOptions(id, orderTypes, storeAddress);
  }

  favouriteHandler({ isFavorite, id }) {
    this.loadingService.showSpinner();
    iif(() => isFavorite, this.merchantService.removeFavoriteMerchant(id), this.merchantService.addFavoriteMerchant(id))
      .pipe(switchMap(() => this.merchantService.getMerchantsWithFavoriteInfo()))
      .subscribe(
        () => {
          const message = isFavorite ? 'Removed from favorites' : 'Added to favorites';
          this.onToastDisplayed(message);
          this.loadingService.closeSpinner();
        },
        () => this.loadingService.closeSpinner()
      );
  }

  locationPinHandler(event: string) {
    console.log(`Location Pin Clicked - Merch Id: ${event}`);
  }

  private openOrderOptions(merchantId, orderTypes, storeAddress) {
    const orderType =
      (orderTypes.delivery && orderTypes.pickup) || orderTypes.pickup ? OrderType.PICKUP : OrderType.DELIVERY;

    this.loadingService.showSpinner();
    zip(
      this.merchantService.getMerchantOrderSchedule(merchantId, orderType),
      this.userService
        .getUserSettingsBySettingName('defaultaddress')
        .pipe(
          switchMap(({ response }) =>
            zip(of({ defaultAddress: response.value }), this.merchantService.retrieveUserAddressList(response.userId))
          )
        ),
      this.merchantService.getMerchantSettings(merchantId).pipe(
        switchMap(
          ({ list: [pickupLocationsEnabled] }): any => {
            switch (pickupLocationsEnabled.value) {
              case null:
                return of({ list: [] });
              case 'true':
                return this.userService
                  .getUser()
                  .pipe(switchMap(({ institutionId }) => this.merchantService.retrievePickupLocations(institutionId)));
              case 'false':
                return of({ list: [storeAddress] });
            }
          }
        )
      )
    )
      .pipe(take(1))
      .subscribe(
        ([schedule, [defaultAddress, listOfAddresses], pickupLocations]) => {
          console.log(pickupLocations['list']);
          this.loadingService.closeSpinner();
          this.actionSheet(schedule, orderTypes, defaultAddress.defaultAddress, listOfAddresses.addresses);
        },
        () => () => this.loadingService.closeSpinner()
      );
  }

  private async actionSheet(schedule, orderTypes: MerchantOrderTypesInfo, defaultDeliveryAddress, deliveryAddresses) {
    let cssClass = 'order-options-action-sheet';
    cssClass += orderTypes.delivery && orderTypes.pickup ? ' order-options-action-sheet-p-d' : '';

    const modal = await this.modalController.create({
      component: OrderOptionsActionSheetComponent,
      cssClass,
      componentProps: {
        schedule,
        orderTypes,
        defaultDeliveryAddress,
        deliveryAddresses,
      },
    });
    modal.onDidDismiss().then(() => {});
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
