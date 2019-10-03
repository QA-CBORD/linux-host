import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MerchantListComponent } from './merchant-list.component';
import { MerchantDistanceModule } from '../../pipes/merchant-distance/merchant-distance.module';
import { MerchantItemComponent } from './merchant-item';

const declarations = [MerchantListComponent, MerchantItemComponent];

@NgModule({
  declarations,
  exports: [MerchantListComponent],
  imports: [CommonModule, IonicModule, MerchantDistanceModule],
})
export class MerchantListModule {}
