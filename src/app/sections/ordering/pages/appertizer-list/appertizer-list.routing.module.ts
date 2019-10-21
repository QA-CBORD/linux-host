import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppertizerListComponent } from './appertizer-list.component';

const routes: Routes = [
  {
    path: '',
    component: AppertizerListComponent,
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class AppertizerListRoutingModule { }