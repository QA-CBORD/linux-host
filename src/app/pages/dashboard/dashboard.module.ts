import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { TileListComponent, TileComponent } from './components/tile-list';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardPageResolver } from './resolvers/dashboard.resolver';
import { ConfigurationService } from './../../core/service/config-service/configuration.service';
import { DashboardService } from './services/dashboard.service';


const imports = [IonicModule, CommonModule, DashboardRoutingModule];
const declarations = [DashboardPage, TileListComponent, TileComponent];
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
