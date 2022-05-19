import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantMainInfoComponent } from '@shared/ui-components/merchant-main-info/merchant-main-info.component';
import { MerchantDistanceModule } from '@shared/pipes/merchant-distance/merchant-distance.module';
import { OrderTypePipeModule } from '@shared/pipes/order-type-pipe/order-type-pipe.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [MerchantMainInfoComponent],
  imports: [
    CommonModule,
    IonicModule,
    MerchantDistanceModule,
    OrderTypePipeModule,
  ],
  exports: [MerchantMainInfoComponent],
})
export class MerchantMainInfoModule { }
