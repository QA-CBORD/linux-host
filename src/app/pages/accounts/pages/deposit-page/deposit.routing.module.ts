import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositPageComponent } from './deposit-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DepositPageComponent,
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class DepositRoutingModule {}
