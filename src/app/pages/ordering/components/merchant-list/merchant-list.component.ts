import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ActionSheetController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { MerchantInfo, MerchantOrderTypesInfo } from '@pages/ordering/shared/models';
import { MerchantService } from '../../services/merchant.service';
import { OrderOptionsActionSheetComponent } from '@pages/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { take } from 'rxjs/operators';
import { OrderType } from '@pages/ordering/ordering.config';

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
    private readonly merchantService: MerchantService
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
    this.merchantService
      .getMerchantOrderSchedule(merchantId, orderType)
      .pipe(take(1))
      .subscribe(data => {
        this.actionSheet(data, orderTypes);
      });
  }

  private async actionSheet(addresses, orderTypes: MerchantOrderTypesInfo) {
    let cssClass = 'order-options-action-sheet';
    cssClass += orderTypes.delivery && orderTypes.pickup ? ' order-options-action-sheet-p-d' : '';

    const modal = await this.modalController.create({
      component: OrderOptionsActionSheetComponent,
      cssClass,
      componentProps: {
        addresses,
        orderTypes,
      },
    });
    modal.onDidDismiss().then(() => {});
    await modal.present();
  }
}
