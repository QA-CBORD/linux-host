import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { WorkOrderDetailsRoutingModule } from './work-order-details.routing.module';

import { WorkOrderDetailsPage } from './work-order-details.page';

const imports = [CommonModule, IonicModule, WorkOrderDetailsRoutingModule];
const declarations = [WorkOrderDetailsPage];

@NgModule({
  imports,
  declarations,
})
export class WorkOrderDetailsPageModule {}
