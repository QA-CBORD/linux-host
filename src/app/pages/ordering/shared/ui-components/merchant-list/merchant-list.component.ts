import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { MerchantInfo } from '../../models';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'st-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantListComponent {
  @Input() merchantList: MerchantInfo[];

  constructor(
    public actionSheetController: ActionSheetController
  ) { }

  trackMerchantsById(index: number, { id }: MerchantInfo): string {
    return id;
  }

  merchantClickHandler(event: string) {
    console.log(`Merchant Clicked - Merch Id: ${event}`);
    const actionSheet = await this.actionSheetController.create({
      header: 'Order Options',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  favouriteHandler(event: string) {
    console.log(`Favorite Clicked - Merch Id: ${event}`);
  }

  locationPinHandler(event: string) {
    console.log(`Location Pin Clicked - Merch Id: ${event}`);
  }

}
