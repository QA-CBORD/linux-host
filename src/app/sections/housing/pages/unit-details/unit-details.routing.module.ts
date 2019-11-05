import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitDetailsPage } from './unit-details.page';

const routes: Routes = [{ path: '', component: UnitDetailsPage }];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class UnitDetailsRoutingModule {}
