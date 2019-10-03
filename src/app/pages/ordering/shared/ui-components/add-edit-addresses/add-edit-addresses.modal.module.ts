import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../../../shared/shared.module';
import { AddEditAddressesComponent } from './add-edit-addresses.component';

const declarations = [AddEditAddressesComponent];

@NgModule({
  declarations,
  exports: [declarations],
  entryComponents: [declarations],
  imports: [CommonModule, IonicModule, SharedModule],
})
export class AddEditAddressesModule {}
