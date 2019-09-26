import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { MerchantInfo } from '../../models';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { LOCAL_ROUTING } from '../../../ordering.config';
import { OrderOptionsActionSheetComponent } from '../order-options.action-sheet/order-options.action-sheet.component';

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
    private readonly modalController: ModalController
  ) {}

  trackMerchantsById(index: number, { id }: MerchantInfo): string {
    return id;
  }

  merchantClickHandler(event: string) {
    console.log(`Merchant Clicked - Merch Id: ${event}`);
    // this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.orderOptions], { skipLocationChange: true });
    this.openOrderOptions();
  }

  favouriteHandler(event: string) {
    console.log(`Favorite Clicked - Merch Id: ${event}`);
  }

  locationPinHandler(event: string) {
    console.log(`Location Pin Clicked - Merch Id: ${event}`);
  }

  private async openOrderOptions() {
    console.log(`Merchant Clicked - Merch Id: ${event}`);
    const modal = await this.modalController.create({
      component: OrderOptionsActionSheetComponent,
      cssClass: 'order-options-action-sheet',
      componentProps: {},
    });
    modal.onDidDismiss().then(() => {});

    await modal.present();
  }
}
