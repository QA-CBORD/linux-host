import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { StHeaderModule } from 'src/app/shared/ui-components/st-header/st-header.module';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardPageResolver } from './resolvers/dashboard-page.resolver';

import { DashboardService } from './services/dashboard.service';

import { DashboardPage } from './dashboard.page';
import { TileWrapperComponent } from './components';

const imports = [IonicModule, CommonModule, DashboardRoutingModule, StHeaderModule];
const declarations = [DashboardPage, TileWrapperComponent];
const providers = [DashboardService, DashboardPageResolver];

@NgModule({
  declarations,
  imports,
  providers,
})
export class DashboardPageModule {}
