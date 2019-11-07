import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { StHeaderModule } from 'src/app/shared/ui-components/st-header/st-header.module';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardPageResolver } from './resolvers/dashboard-page.resolver';

import { DashboardApiService } from './services/dashboard.api.service';
import { DashboardService } from './services/dashboard.service';

import { DashboardPage } from './dashboard.page';
import {
  TileWrapperComponent,
  AccountsTileComponent,
  AccessCardComponent,
  TransactionsTileComponent,
  RewardsTileComponent,
  MobileAccessTileComponent,
  OrderTileComponent,
  ExploreTileComponent,
  ConversationsTileComponent
} from './components';
import { AccessCardService, AccountsService, TransactionService, SecureMessagingService } from './services';

const imports = [IonicModule, CommonModule, DashboardRoutingModule, StHeaderModule];
const declarations = [
  DashboardPage,
  AccessCardComponent,
  TileWrapperComponent,
  AccountsTileComponent,
  TransactionsTileComponent,
  RewardsTileComponent,
  OrderTileComponent,
  MobileAccessTileComponent,
  ExploreTileComponent,
  ConversationsTileComponent
];
const providers = [
  DashboardApiService,
  DashboardService,
  AccessCardService,
  AccountsService,
  TransactionService,
  SecureMessagingService,
  DashboardPageResolver,
];

@NgModule({
  declarations,
  imports,
  providers,
})
export class DashboardPageModule {}
