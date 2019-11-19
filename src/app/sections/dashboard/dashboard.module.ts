import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { StHeaderModule } from 'src/app/shared/ui-components/st-header/st-header.module';
import { DashboardRoutingModule } from './dashboard.routing.module';

import { DashboardApiService } from './services/dashboard.api.service';

import { DashboardPage } from './dashboard.page';

import { AccessCardModule } from './containers/access-card';
import { AccountsTileModule } from './containers/accounts-tile';
import { ConversationsTileModule } from './containers/conversations-tile';
import { ExploreTileModule } from './containers/explore-tile';
import { MobileAccessTileModule } from './containers/mobile-access-tile';
import { OrderTileModule } from './containers/order-tile';
import { AccountsService, DashboardService } from './services';
import { TileWrapperModule } from './containers/tile-wrapper';
import { TransactionsTileModule } from './containers/transactions-tile';
import { RewardsTileModule } from './containers/rewards-tile';
import { DashboardPageResolver } from './resolvers/dashboard-page.resolver';

const imports = [
  IonicModule, 
  CommonModule, 
  DashboardRoutingModule, 
  StHeaderModule,
  AccessCardModule, 
  AccountsTileModule,
  ConversationsTileModule,
  ExploreTileModule,
  MobileAccessTileModule,
  OrderTileModule,
  TileWrapperModule,
  TransactionsTileModule,
  RewardsTileModule
];

const declarations = [
  DashboardPage
];
const providers = [
  DashboardApiService,
  AccountsService,
  DashboardService,
  DashboardPageResolver
];

@NgModule({
  imports,
  declarations,
  providers,
})
export class DashboardPageModule { }
