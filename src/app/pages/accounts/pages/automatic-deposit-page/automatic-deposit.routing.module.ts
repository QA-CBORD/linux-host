import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutomaticDepositPageComponent } from './automatic-deposit-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AutomaticDepositPageComponent,
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class AutomaticDepositRoutingModule {}
