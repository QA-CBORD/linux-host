import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MerchantListComponent } from '@sections/ordering';
import { MerchantItemComponent } from './merchant-item';
import { MerchantDistanceModule } from '@sections/ordering/shared/pipes/merchant-distance/merchant-distance.module';
import { OrderOptionsActionSheetModule } from '@sections/ordering/shared/ui-components/order-options.action-sheet';
import { StopPropagationModule } from '@shared/directives/stop-propogation/stop-propagation.module';

const declarations = [MerchantListComponent, MerchantItemComponent];

@NgModule({
  declarations,
  exports: [MerchantListComponent],
  imports: [CommonModule, IonicModule, MerchantDistanceModule, OrderOptionsActionSheetModule, StopPropagationModule],
})
export class MerchantListModule {}
