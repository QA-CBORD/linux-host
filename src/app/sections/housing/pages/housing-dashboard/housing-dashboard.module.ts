import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TermsModule } from '../../terms/terms.module';
import { HousingDashboardRoutingModule } from './housing-dashboard.routing.module';

import { HousingDashboardPage } from './housing-dashboard.page';
import { ContractsComponent } from '../../contracts/contracts.component';
import { WorkOrdersComponent } from '../../work-orders/work-orders.component';
import { ApplicationsComponent } from '../../applications/applications.component';
import { ApplicationsListComponent } from '../../applications/applications-list/applications-list.component';

const imports = [CommonModule, ReactiveFormsModule, IonicModule, HousingDashboardRoutingModule, TermsModule];
const declarations = [
  HousingDashboardPage,
  ContractsComponent,
  WorkOrdersComponent,
  ApplicationsComponent,
  ApplicationsListComponent,
];

@NgModule({
  imports,
  declarations,
})
export class HousingDashboardPageModule {}
