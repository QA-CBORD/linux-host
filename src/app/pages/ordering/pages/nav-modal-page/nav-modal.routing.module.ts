import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavModalPage } from './nav-modal-page.component';

const routes: Routes = [
  {
    path: '',
    component: NavModalPage,
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class NavModalRoutingModule {}
