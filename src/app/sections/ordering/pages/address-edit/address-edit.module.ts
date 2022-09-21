import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddressEditPage } from './address-edit.page';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { AddEditAddressesModule } from '@sections/ordering/shared/ui-components/add-edit-addresses/add-edit-addresses.modal.module';
import { ConfirmPopoverModule } from '@sections/ordering/shared/ui-components/confirm-popover/confirm-popover.module';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';

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
    StHeaderModule,
    AddEditAddressesModule,
    ConfirmPopoverModule,
    StButtonModule
  ],
  declarations: [AddressEditPage]
})
export class AddressEditPageModule {}
