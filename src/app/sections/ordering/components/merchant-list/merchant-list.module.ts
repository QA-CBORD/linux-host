import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MerchantListComponent } from '@sections/ordering';
import { MerchantItemComponent } from './merchant-item';
import { OrderOptionsActionSheetModule } from '@sections/ordering/shared/ui-components/order-options.action-sheet';
import { StopPropagationModule } from '@shared/directives/stop-propogation/stop-propagation.module';
import { MerchantDistanceModule } from '@shared/pipes/merchant-distance/merchant-distance.module';
import { OrderTypePipeModule } from '@sections/ordering/shared/pipes/order-type/order-type.module';
import { OrderAheadBadgeComponent } from '@shared/order-ahead-badge/order-ahead-badge.component';

const declarations = [MerchantListComponent, MerchantItemComponent];

@NgModule({
  declarations,
  exports: [MerchantListComponent],
  imports: [
    CommonModule,
    IonicModule,
    MerchantDistanceModule,
    OrderOptionsActionSheetModule,
    StopPropagationModule,
    OrderTypePipeModule,
    OrderAheadBadgeComponent,
  ],
})
export class MerchantListModule {}
