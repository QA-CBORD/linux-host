import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HousingDashboardPage } from './housing-dashboard.page';

const imports = [RouterModule.forChild([{ path: '', component: HousingDashboardPage }])];
const exports = [RouterModule]

@NgModule({
  imports,
  exports
})
export class HousingDashboardRoutingModule {}
