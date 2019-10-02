import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractDetailsPage } from './contract-details.page';

const routes: Routes = [{ path: '', component: ContractDetailsPage }];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class ContractDetailsRoutingModule {}
