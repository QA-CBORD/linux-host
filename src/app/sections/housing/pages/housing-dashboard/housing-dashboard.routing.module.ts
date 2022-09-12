import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HousingDashboardPage } from './housing-dashboard.component';

const routes: Routes = [{ path: '', component: HousingDashboardPage }];

const imports = [RouterModule.forChild(routes)];
//const exports = [RouterModule];

@NgModule({
  imports,
  exports: [RouterModule],
})
export class HousingDashboardRoutingModule {}
