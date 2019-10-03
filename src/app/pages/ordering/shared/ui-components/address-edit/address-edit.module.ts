import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { AddressEditComponent } from './address-edit.component';

@NgModule({
  declarations: [AddressEditComponent],
  exports: [AddressEditComponent],
  imports: [
    CommonModule
  ]
})
export class AddressEditModule { }
