import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { StHeaderModule } from 'src/app/shared/ui-components/st-header/st-header.module';
import { DashboardRoutingModule } from './dashboard.routing.module';

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
import { EditHomePageModalComponent } from './components/edit-home-page-modal';
import { MealDonationsTileModule } from './containers/meal-donations-tile/meal-donations-tile.module';
import { MobileAccessService } from '@sections/mobile-access';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';
import { HousingTileModule } from './containers/housing-tile/housing-tile.module';

const imports = [
  CommonModule,
  IonicModule,
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
  RewardsTileModule,
  MealDonationsTileModule,
  HousingTileModule
];

const declarations = [
  DashboardPage,
  EditHomePageModalComponent,
];

const providers = [
  AccountsService,
  DashboardService,
  MobileAccessService,
  DashboardPageResolver,
  TileConfigFacadeService,
];

@NgModule({
  imports,
  declarations,
  providers,
  entryComponents: [
    EditHomePageModalComponent
  ]
})
export class DashboardPageModule {
  constructor() {
  }
}
