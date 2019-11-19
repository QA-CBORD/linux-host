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
  TransactionsTileComponent,
  RewardsTileComponent,
  MobileAccessTileComponent,
  OrderTileComponent,
  ExploreTileComponent,
  ConversationsTileComponent,
} from './components';

import {
  TransactionService,
  SecureMessagingService,
  MobileAccessService
} from './services';

import { RewardsService } from './../rewards/services/rewards.service';

import { AccessCardModule } from './components/access-card/access-card.module';
import { AccountsTileModule } from './components/accounts-tile/accounts-tile.module';
import { RewardsApiService } from '../rewards/services';

const imports = [IonicModule, CommonModule, DashboardRoutingModule, StHeaderModule, AccessCardModule, AccountsTileModule];

const declarations = [
  DashboardPage,
  TileWrapperComponent,
  TransactionsTileComponent,
  RewardsTileComponent,
  OrderTileComponent,
  MobileAccessTileComponent,
  ExploreTileComponent,
  ConversationsTileComponent,
];
const providers = [
  DashboardApiService,
  DashboardService,
  TransactionService,
  SecureMessagingService,
  MobileAccessService,
  RewardsService,
  DashboardPageResolver,
  RewardsApiService
];

@NgModule({
  imports,
  declarations,
  providers,
})
export class DashboardPageModule {}
