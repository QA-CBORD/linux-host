import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddEditAddressesComponent } from './add-edit-addresses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { StSelectFloatingLabelModule } from '@shared/ui-components/st-select-floating-label/st-select-floating-label.module';
import { FocusNextModule } from '@shared/directives/focus-next/focus-next.module';

const declarations = [AddEditAddressesComponent];
const customModules = [StInputFloatingLabelModule, StSelectFloatingLabelModule, FocusNextModule];

@NgModule({
  declarations,
  exports: [declarations],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, ...customModules],
})
export class AddEditAddressesModule {}
