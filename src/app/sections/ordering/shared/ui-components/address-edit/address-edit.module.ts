import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressEditComponent } from './address-edit.component';

@NgModule({
  declarations: [AddressEditComponent],
  exports: [AddressEditComponent],
  imports: [
    CommonModule
  ]
})
export class AddressEditModule { }
