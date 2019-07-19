import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from './account-details.component';

const routes: Routes = [
  {
    path: '',
    component: AccountDetailsComponent,
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class AccountDetailsRoutingModule {}
