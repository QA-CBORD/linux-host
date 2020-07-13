import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MerchantDistanceModule } from '../../../../../shared/pipes/merchant-distance/merchant-distance.module';
import { OrderAddressListComponent } from './order-address-list.component';
import { OrderAddressItemComponent } from './order-address-item';
import { AddressHeaderFormatPipeModule } from '@shared/pipes/address-header-format-pipe/address-header-format-pipe.module';
import { AddressSubHeaderFormatPipeModule } from '@shared/pipes/address-subheader-format-pipe/address-subheader-format-pipe.module';

const declarations = [OrderAddressListComponent, OrderAddressItemComponent];

@NgModule({
  declarations,
  exports: [OrderAddressListComponent],
  imports: [CommonModule, IonicModule, MerchantDistanceModule, AddressHeaderFormatPipeModule, AddressSubHeaderFormatPipeModule],
})
export class OrderAddressListModule {}
