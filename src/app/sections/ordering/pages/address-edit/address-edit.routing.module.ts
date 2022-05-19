import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressEditPageModule } from './address-edit.module';

const routes: Routes = [
  {
    path: '',
    component: AddressEditPageModule,
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class AddressEditRoutingModule {}