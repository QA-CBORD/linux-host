import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { StHeaderModule } from 'src/app/shared/ui-components/st-header/st-header.module';
import { DashboardRoutingModule } from './dashboard.routing.module';

import { DashboardPage } from './dashboard.component';

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
import { MealDonationsTileModule } from './containers/meal-donations-tile/meal-donations-tile.module';
import { MobileAccessService } from '@sections/mobile-access';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';
import { HousingTileModule } from './containers/housing-tile/housing-tile.module';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { StButtonModule } from '@shared/ui-components/st-button';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { PhoneEmailComponent } from '@shared/ui-components/phone-email/phone-email.component';
import { EditHomePageModalModule } from '@shared/ui-components/edit-home-page-modal/edit-home-page-modal.module';
import { LocationPermissionModalModule } from './components/location-disclosure/location-disclosure.module';
import { ProminentDisclosureService } from './services/prominent-disclosure.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { AccessCardComponent } from './containers/access-card';

const imports = [
  CommonModule,
  IonicModule,
  DashboardRoutingModule,
  StHeaderModule,
  AccessCardComponent,
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
  PhoneEmailComponent,
  EditHomePageModalModule,
  LocationPermissionModalModule,
];

const declarations = [DashboardPage];

const providers = [
  AccountsService,
  DashboardService,
  MobileAccessService,
  DashboardPageResolver,
  TileConfigFacadeService,
  GlobalNavService,
  ProminentDisclosureService,
  ModalsService
];

@NgModule({
  imports,
  declarations,
  providers,
})
export class DashboardPageModule {}
