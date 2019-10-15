import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddressEditPage } from './address-edit.page';
import { AddressEditModule } from '@sections/ordering/shared/ui-components/address-edit/address-edit.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { AddEditAddressesModule } from '@sections/ordering/shared/ui-components/add-edit-addresses/add-edit-addresses.modal.module';

const routes: Routes = [
  {
    path: '',
    component: AddressEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AddressEditModule,
    StHeaderModule,
    AddEditAddressesModule
  ],
  declarations: [AddressEditPage]
})
export class AddressEditPageModule {}
