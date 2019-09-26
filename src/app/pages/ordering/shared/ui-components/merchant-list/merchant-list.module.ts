import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MerchantListComponent } from './merchant-list.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { MerchantDistanceModule } from '../../pipes/merchant-distance/merchant-distance.module';
import { MerchantItemComponent } from './merchant-item';
import { OrderOptionsActionSheetModule } from '../order-options.action-sheet/order-options.action-sheet.module';

const declarations = [MerchantListComponent, MerchantItemComponent];

@NgModule({
  declarations,
  exports: [MerchantListComponent],
  imports: [CommonModule, IonicModule, SharedModule, MerchantDistanceModule, OrderOptionsActionSheetModule],
})
export class MerchantListModule {}
