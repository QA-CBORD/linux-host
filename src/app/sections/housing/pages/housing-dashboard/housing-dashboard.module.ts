import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HousingDashboardRoutingModule } from './housing-dashboard.routing.module';

import { HousingDashboardPage } from './housing-dashboard.page';
import { ApplicationsComponent } from '../../applications/applications.component';
import { ApplicationsListComponent } from '../../applications/applications-list/applications-list.component';

const imports = [CommonModule, ReactiveFormsModule, IonicModule, HousingDashboardRoutingModule];
const declarations = [HousingDashboardPage, ApplicationsComponent, ApplicationsListComponent];

@NgModule({
  imports,
  declarations,
})
export class HousingDashboardPageModule {}
