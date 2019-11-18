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
  MobileAccessService,
  RewardsService,
} from './services';
import { EditHomePageModalComponent } from './components/edit-home-page-modal';

import { AccessCardModule } from './components/access-card/access-card.module';
import { AccountsTileModule } from './components/accounts-tile/accounts-tile.module';

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
  EditHomePageModalComponent
];
const providers = [
  DashboardApiService,
  DashboardService,
  TransactionService,
  SecureMessagingService,
  MobileAccessService,
  RewardsService,
  DashboardPageResolver
];

@NgModule({
  declarations,
  imports,
  providers,
  entryComponents: [
    EditHomePageModalComponent
  ]
})
export class DashboardPageModule {}
