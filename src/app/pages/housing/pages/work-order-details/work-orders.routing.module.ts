import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkOrdersPage } from './work-orders.page';

const routes: Routes = [{ path: '', component: WorkOrdersPage }];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class WorkOrdersRoutingModule {}