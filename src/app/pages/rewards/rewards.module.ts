import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RewardsPage } from './rewards.page';
import { RewardsRoutingModule } from './rewards-routing.module';
import { HistoryComponent } from './components/history/history.component';
import { StoreComponent } from './components/store/store.component';
import { LevelsComponent } from './components/levels/levels.component';
import { RewardsApiService } from './services/rewards-api.service';
import { RewardsService } from './services/rewards.service';
import { SharedModule } from '../../shared/shared.module';
import { ListItemComponent } from './components/list-item/list-item.component';
import { RewardsPopoverComponent } from './components/rewards-popover/rewards-popover.component';
import { BalanceComponent } from './components/balance/balance.component';

const imports = [CommonModule, FormsModule, IonicModule, RewardsRoutingModule, SharedModule];
const declarations = [
  RewardsPage,
  HistoryComponent,
  StoreComponent,
  LevelsComponent,
  ListItemComponent,
  RewardsPopoverComponent,
  BalanceComponent,
];
const providers = [RewardsApiService, RewardsService];
const entryComponents = [RewardsPopoverComponent];

@NgModule({
  imports,
  declarations,
  providers,
  entryComponents,
})
export class RewardsPageModule {}
