import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DeliveryAddressesModalComponent } from './delivery-addresses.modal.component';
import { AddEditAddressesModule } from '../add-edit-addresses';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';
import { AddressHeaderFormatPipeModule } from '@shared/pipes/address-header-format-pipe/address-header-format-pipe.module';

const declarations = [DeliveryAddressesModalComponent];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule, IonicModule, AddEditAddressesModule, StButtonModule, AddressHeaderFormatPipeModule],
})
export class DeliveryAddressesModalModule {}
