import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RewardsPage } from './rewards.page';
import { HistoryComponent } from './components/history';
import { StoreComponent } from './components/store';
import { LevelsComponent } from './components/levels';
import { OptInComponent } from './components/opt-in';
import { RewardsRoutingModule } from './rewards-routing.module';
import { RewardsApiService } from './services';
import { RewardsService } from './services';
import { SharedModule } from '../../shared/shared.module';
import { RewardsResolverGuard } from './resolvers';
import { BalanceComponent } from './components/balance';
import { ListItemComponent } from './components/list-item';
import { RewardsPopoverComponent } from './components/rewards-popover';

const imports = [CommonModule, FormsModule, IonicModule, RewardsRoutingModule, RewardsRoutingModule, SharedModule];
const declarations = [
  RewardsPage,
  HistoryComponent,
  StoreComponent,
  LevelsComponent,
  OptInComponent,
  ListItemComponent,
  BalanceComponent,
  RewardsPopoverComponent,
];
const providers = [RewardsApiService, RewardsService, RewardsResolverGuard];
const entryComponents = [RewardsPopoverComponent];
@NgModule({
  imports,
  declarations,
  providers,
  entryComponents,
})
export class RewardsPageModule {}
