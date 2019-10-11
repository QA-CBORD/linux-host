import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantInfo, MerchantService, MerchantOrderTypesInfo } from '@pages/ordering';
import { ModalController, ToastController } from '@ionic/angular';
import { UserService } from '@core/service/user-service/user.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { FavoriteMerhantsService } from './services/favorite-merhants.service';
import { switchMap, take } from 'rxjs/operators';
import { OrderType } from '@pages/ordering/ordering.config';
import { of, zip } from 'rxjs';
import { OrderOptionsActionSheetComponent } from '@pages/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { NAVIGATE } from 'src/app/app.global';

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

  merchantClickHandler({ id, orderTypes, storeAddress }) {
    this.openOrderOptions(id, orderTypes, storeAddress);
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
                return this.merchantService.retrievePickupLocations();
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
          this.actionSheet(schedule, orderTypes, defaultAddress.defaultAddress, listOfAddresses);
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
