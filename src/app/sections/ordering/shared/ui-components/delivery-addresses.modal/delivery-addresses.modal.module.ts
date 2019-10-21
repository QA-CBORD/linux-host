import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DeliveryAddressesModalComponent } from './delivery-addresses.modal.component';
import { AddEditAddressesModule } from '../add-edit-addresses/add-edit-addresses.modal.module';

const declarations = [DeliveryAddressesModalComponent];

@NgModule({
  declarations,
  exports: declarations,
  entryComponents: declarations,
  imports: [CommonModule, IonicModule, AddEditAddressesModule],
})
export class DeliveryAddressesModalModule {}
