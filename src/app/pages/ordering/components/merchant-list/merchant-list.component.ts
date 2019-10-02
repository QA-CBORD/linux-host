import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ActionSheetController, ModalController } from '@ionic/angular';
import { MerchantInfo, MerchantOrderTypesInfo } from '@pages/ordering/shared/models';
import { MerchantService } from '../../services/merchant.service';
import { OrderOptionsActionSheetComponent } from '@pages/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { take, switchMap, map } from 'rxjs/operators';
import { OrderType } from '@pages/ordering/ordering.config';
import { UserService } from '@core/service/user-service/user.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { zip, of } from 'rxjs';

@Component({
  selector: 'st-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantListComponent {
  @Input() merchantList: MerchantInfo[];

  constructor(
    public actionSheetController: ActionSheetController,
    private readonly modalController: ModalController,
    private readonly merchantService: MerchantService,
    private readonly userService: UserService,
    private readonly loadingService: LoadingService
  ) { }

  trackMerchantsById(index: number, { id }: MerchantInfo): string {
    return id;
  }

  merchantClickHandler({ id, orderTypes, storeAddress }) {
    // this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.orderOptions], { skipLocationChange: true });
    this.openOrderOptions(id, orderTypes, storeAddress);
  }

  favouriteHandler(event: string) {
    console.log(`Favorite Clicked - Merch Id: ${event}`);
  }

  locationPinHandler(event: string) {
    console.log(`Location Pin Clicked - Merch Id: ${event}`);
  }

  private openOrderOptions(merchantId, orderTypes, storeAddress) {
    const orderType =
      (orderTypes.delivery && orderTypes.pickup) || orderTypes.pickup ? OrderType.PICKUP : OrderType.DELIVERY;


    this.loadingService.showSpinner()
    zip(
      this.merchantService.getMerchantOrderSchedule(merchantId, orderType),
      this.userService
        .getUserSettingsBySettingName('defaultaddress')
        .pipe(
          switchMap(({ response }) =>
            zip(of({ defaultAddress: response.value }), this.merchantService.retrieveUserAddressList(response.userId))
          )
        ),
      this.merchantService.getMerchantSettings(merchantId)
        .pipe(
          switchMap(({ list: [pickupLocationsEnabled] }): any => {
            console.log(pickupLocationsEnabled)
            debugger
            switch (pickupLocationsEnabled.value) {
              case null:
                return of([]);
              case "true":
                return this.userService.getUser()
                  .pipe(
                    switchMap(({ institutionId }) => this.merchantService.retrievePickupLocations(institutionId))
                  )
              case "false":
                return of(storeAddress);
            }
          }),
        )
    )
      .pipe(take(1))
      .subscribe(([schedule, [defaultAddress, listOfAddresses], ...rest]) => {
        console.log()
        console.log(rest)
        debugger
        this.loadingService.closeSpinner();
        this.actionSheet(schedule, orderTypes, defaultAddress.defaultAddress, listOfAddresses.addresses);
      });
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
}
