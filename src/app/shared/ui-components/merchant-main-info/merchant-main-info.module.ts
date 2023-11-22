import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantMainInfoComponent } from '@shared/ui-components/merchant-main-info/merchant-main-info.component';
import { MerchantDistanceModule } from '@shared/pipes/merchant-distance/merchant-distance.module';
import { OrderTypePipeModule } from '@shared/pipes/order-type-pipe/order-type-pipe.module';
import { IonicModule } from '@ionic/angular';
import { OrderAheadBadgeComponent } from '@shared/order-ahead-badge/order-ahead-badge.component';

@NgModule({
  declarations: [MerchantMainInfoComponent],
  imports: [
    CommonModule,
    IonicModule,
    MerchantDistanceModule,
    OrderTypePipeModule,
    OrderAheadBadgeComponent
  ],
  exports: [MerchantMainInfoComponent],
})
export class MerchantMainInfoModule { }
