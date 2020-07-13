import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TermsModule } from '../../terms/terms.module';
import { HousingDashboardRoutingModule } from './housing-dashboard.routing.module';
import { ApplicationsModule } from '../../applications/applications.module';
import { ContractsModule } from '../../contracts/contracts.module';

import { HousingDashboardPage } from './housing-dashboard.page';
import { WorkOrdersComponent } from '../../work-orders/work-orders.component';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  IonicModule,
  TermsModule,
  ApplicationsModule,
  ContractsModule,
  HousingDashboardRoutingModule,
];
const declarations = [HousingDashboardPage, WorkOrdersComponent];

@NgModule({
  imports,
  declarations,
})
export class HousingDashboardPageModule {}
