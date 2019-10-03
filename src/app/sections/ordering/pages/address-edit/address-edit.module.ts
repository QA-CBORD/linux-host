import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddressEditPage } from './address-edit.page';
import { AddressEditModule } from 'src/app/sections/ordering/shared/ui-components/address-edit/address-edit.module';

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
    AddressEditModule
  ],
  declarations: [AddressEditPage]
})
export class AddressEditPageModule {}
