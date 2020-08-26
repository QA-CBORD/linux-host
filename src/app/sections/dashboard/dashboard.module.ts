import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

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
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { StButtonModule } from '@shared/ui-components/st-button';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { PhoneEmailComponent } from '@shared/ui-components/phone-email/phone-email.component';
import { PhoneEmailModule } from '@shared/ui-components/phone-email/phone-email.module';

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
  HousingTileModule,
  StInputFloatingLabelModule,
  ReactiveFormsModule,
  StButtonModule,
  PhoneEmailModule
];

const declarations = [
  DashboardPage,
  EditHomePageModalComponent
];

const providers = [
  AccountsService,
  DashboardService,
  MobileAccessService,
  DashboardPageResolver,
  TileConfigFacadeService,
  GlobalNavService
];

@NgModule({
  imports,
  declarations,
  providers,
  entryComponents: [
    EditHomePageModalComponent,
    PhoneEmailComponent
  ]
})
export class DashboardPageModule {
  constructor() {
  }
}
