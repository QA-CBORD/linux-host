import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { WorkOrdersRoutingModule } from './work-orders.routing.module';

import { WorkOrdersPage } from './work-orders.page';

const imports = [CommonModule, IonicModule, WorkOrdersRoutingModule];
const declarations = [WorkOrdersPage];

@NgModule({
  imports,
  declarations,
})
export class WorkOrdersPageModule {}
