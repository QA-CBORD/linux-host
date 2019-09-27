import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MerchantListComponent } from './merchant-list.component';
import { MerchantItemComponent } from './merchant-item';
import { SharedModule } from '@shared/shared.module';
import { MerchantDistanceModule } from '@pages/ordering/shared/pipes/merchant-distance/merchant-distance.module';
import { OrderOptionsActionSheetModule } from '@pages/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.module';

const declarations = [MerchantListComponent, MerchantItemComponent];

@NgModule({
  declarations,
  exports: [MerchantListComponent],
  imports: [CommonModule, IonicModule, SharedModule, MerchantDistanceModule, OrderOptionsActionSheetModule],
})
export class MerchantListModule {}
