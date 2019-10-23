import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { StHeaderModule } from 'src/app/shared/ui-components/st-header/st-header.module';
import { DashboardPage } from './dashboard.page';
import { IonicModule } from '@ionic/angular';

const imports = [IonicModule, CommonModule, DashboardRoutingModule, StHeaderModule];
const declarations = [DashboardPage];
const providers = [];

@NgModule({
  declarations,
  imports,
  providers,
})
export class DashboardPageModule {}
