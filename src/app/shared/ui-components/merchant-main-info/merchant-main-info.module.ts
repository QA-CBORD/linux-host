import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantMainInfoComponent } from '@shared/ui-components/merchant-main-info/merchant-main-info.component';
import { MerchantDistanceModule } from '@shared/pipes/merchant-distance/merchant-distance.module';
import { OrderTypePipeModule } from '@sections/ordering/shared/pipes/order-type/order-type.module';
import { IonicModule } from '@ionic/angular';
import { OrderAheadBadgeComponent } from '@shared/order-ahead-badge/order-ahead-badge.component';
import { OrderTypeDisplayComponent } from '@shared/order-type-display/order-type-display.component';

@NgModule({
  declarations: [MerchantMainInfoComponent],
  imports: [
    CommonModule,
    IonicModule,
    MerchantDistanceModule,
    OrderTypePipeModule,
    OrderAheadBadgeComponent,
    OrderTypeDisplayComponent,
  ],
  exports: [MerchantMainInfoComponent],
})
export class MerchantMainInfoModule { }
