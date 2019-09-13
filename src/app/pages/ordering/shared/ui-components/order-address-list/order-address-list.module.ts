import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../../../../shared/shared.module';
import { MerchantDistanceModule } from '../../pipes/merchant-distance/merchant-distance.module';
import { OrderAddressListComponent } from './order-address-list.component';
import { OrderAddressItemComponent } from './order-address-item';

const declarations = [OrderAddressListComponent, OrderAddressItemComponent];

@NgModule({
  declarations,
  exports: [OrderAddressListComponent],
  imports: [CommonModule, IonicModule,  SharedModule, MerchantDistanceModule],
})
export class OrderAddressListModule {}
