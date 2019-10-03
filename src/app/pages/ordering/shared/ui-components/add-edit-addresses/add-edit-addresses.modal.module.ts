import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddEditAddressesComponent } from './add-edit-addresses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';

const declarations = [AddEditAddressesComponent];

@NgModule({
  declarations,
  exports: [declarations],
  entryComponents: [declarations],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, StInputFloatingLabelModule],
})
export class AddEditAddressesModule {}
