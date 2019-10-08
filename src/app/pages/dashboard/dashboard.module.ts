import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardPageResolver } from './resolvers/dashboard.resolver';
import { ConfigurationService } from './../../core/service/config-service/configuration.service';
import { DashboardService } from './services/dashboard.service';
import { TileListModule } from './components/tile-list/tile-list.module';


const imports = [IonicModule, CommonModule, DashboardRoutingModule, TileListModule];
const declarations = [DashboardPage];
const providers = [
  ConfigurationService,
  DashboardService,
  DashboardPageResolver
];

@NgModule({
  declarations,
  imports,
  providers,
})
export class DashboardPageModule {}
