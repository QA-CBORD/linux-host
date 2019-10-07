import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FacilityDetailsPage } from './facility-details.page';

const routes: Routes = [{ path: '', component: FacilityDetailsPage }];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class FacilityDetailsRoutingModule {}
