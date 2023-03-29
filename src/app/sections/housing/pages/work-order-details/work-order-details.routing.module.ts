import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkOrderDetailsPage } from './work-order-details.page';

const routes: Routes = [{ path: '', component: WorkOrderDetailsPage }];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class WorkOrderDetailsRoutingModule {}
