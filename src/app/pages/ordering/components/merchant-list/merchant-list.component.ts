import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ActionSheetController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { MerchantInfo, MerchantOrderTypesInfo } from '@pages/ordering/shared/models';
import { MerchantService } from '../../services/merchant.service';
import { OrderOptionsActionSheetComponent } from '@pages/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { take, switchMap, mergeMap } from 'rxjs/operators';
import { OrderType } from '@pages/ordering/ordering.config';
import { UserService } from '@core/service/user-service/user.service';
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
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly merchantService: MerchantService,
    private readonly userService: UserService
  ) {}

  trackMerchantsById(index: number, { id }: MerchantInfo): string {
    return id;
  }

  merchantClickHandler({ id, orderTypes }) {
    // this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.orderOptions], { skipLocationChange: true });
    this.openOrderOptions(id, orderTypes);
  }

  favouriteHandler(event: string) {
    console.log(`Favorite Clicked - Merch Id: ${event}`);
  }

  locationPinHandler(event: string) {
    console.log(`Location Pin Clicked - Merch Id: ${event}`);
  }

  private openOrderOptions(merchantId, orderTypes) {
    const orderType =
      (orderTypes.delivery && orderTypes.pickup) || orderTypes.pickup ? OrderType.PICKUP : OrderType.DELIVERY;

    zip(
      this.merchantService.getMerchantOrderSchedule(merchantId, orderType),
      this.userService
        .getUserSettingsBySettingName('defaultaddress')
        .pipe(
          switchMap(({ response }) =>
            zip(of({ defaultAddress: response.value }), this.merchantService.retrieveUserAddressList(response.userId))
          )
        )
    )
      .pipe(take(1))
      .subscribe(([schedule, [defaultAddress, listOfAddresses]]) => {
        this.actionSheet(schedule, orderTypes, defaultAddress.defaultAddress, listOfAddresses.addresses);
      });
  }

  private async actionSheet(schedule, orderTypes: MerchantOrderTypesInfo, defaultAddress, addresses) {
    let cssClass = 'order-options-action-sheet';
    cssClass += orderTypes.delivery && orderTypes.pickup ? ' order-options-action-sheet-p-d' : '';

    const modal = await this.modalController.create({
      component: OrderOptionsActionSheetComponent,
      cssClass,
      componentProps: {
        schedule,
        orderTypes,
        defaultAddress,
        addresses,
      },
    });
    modal.onDidDismiss().then(() => {});
    await modal.present();
  }
}
