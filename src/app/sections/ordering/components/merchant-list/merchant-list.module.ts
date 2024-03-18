import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MerchantListComponent } from '@sections/ordering';
import { MerchantItemComponent } from './merchant-item';
import { OrderOptionsActionSheetComponent } from '@sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';

const declarations = [MerchantListComponent];

@NgModule({
  declarations,
  exports: [MerchantListComponent],
  imports: [
    CommonModule,
    IonicModule,
    MerchantItemComponent,
    OrderOptionsActionSheetComponent,
  ],
})
export class MerchantListModule {}
