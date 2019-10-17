import { MerchantService } from './services';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { Observable, of, iif, zip } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';

import { MerchantInfo, MerchantOrderTypesInfo, OrderInfo } from './shared/models';
import { UserService } from '@core/service/user-service/user.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { OrderOptionsActionSheetComponent } from './shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { ORDER_TYPE, MerchantSettings } from './ordering.config';

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
    private readonly userService: UserService,
    private readonly loadingService: LoadingService,
    private readonly toastController: ToastController
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
    const orderType =
      (orderTypes.delivery && orderTypes.pickup) || orderTypes.pickup ? ORDER_TYPE.PICKUP : ORDER_TYPE.DELIVERY;

    this.loadingService.showSpinner();
    zip(
      this.merchantService.getMerchantOrderSchedule(merchantId, orderType),
      this.retrieveDeliveryAddresses(settings.map[MerchantSettings.deliveryAddressRestriction]),
      this.retrievePickupLocations(storeAddress, settings.map[MerchantSettings.pickupLocationsEnabled]),
      this.merchantService.retrieveBuildings()
    )
      .pipe(take(1))
      .subscribe(
        ([schedule, [deliveryAddress, deliveryLocations], pickupLocations, buildingsForNewAddressForm]) => {
          const isTimeDisable = parseInt(settings.map[MerchantSettings.orderAheadEnabled].value);
          const defaultPickupAddress = JSON.parse(settings.map[MerchantSettings.pickupLocationsEnabled].value) ? '' : storeAddress;

          this.loadingService.closeSpinner();
          this.actionSheet(
            schedule,
            orderTypes,
            deliveryAddress.defaultAddress,
            deliveryLocations,
            defaultPickupAddress,
            pickupLocations,
            buildingsForNewAddressForm,
            isTimeDisable,
            merchantId
          );
        },
        () => this.loadingService.closeSpinner()
      );
  }

  private async actionSheet(
    schedule,
    orderTypes: MerchantOrderTypesInfo,
    defaultDeliveryAddress,
    deliveryAddresses,
    defaultPickupAddress,
    pickupLocations,
    buildingsForNewAddressForm,
    isTimeDisable,
    merchantId
  ) {
    const footerButtonName = 'continue';
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
        defaultPickupAddress,
        pickupLocations,
        buildingsForNewAddressForm,
        isTimeDisable,
        footerButtonName,
        merchantId
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

  private retrievePickupLocations(storeAddress, { value }) {
    switch (value) {
      case null:
        return of([]);
      case 'true':
        return this.merchantService.retrievePickupLocations();
      case 'false':
        return of([storeAddress]);
    }
  }

  private retrieveDeliveryAddresses(setting) {
    return this.merchantService.retrieveDeliveryAddresses(setting);
  }
}
