import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RewardsPage } from './rewards.page';
import { HistoryComponent } from './components/history';
import { StoreComponent } from './components/store';
import { LevelsComponent } from './components/levels';
import { RewardsRoutingModule } from './rewards-routing.module';
import { RewardsApiService, RewardsService } from './services';
import { RewardsResolverGuard } from './resolvers';
import { BalanceComponent } from './components/balance';
import { ListItemComponent } from './components/list-item';
import { RewardsPopoverComponent } from './components/rewards-popover';
import { ExpandListComponent } from './components/levels/expand-list';
import { ExpandItemComponent } from './components/levels/expand-list/expand-item';
import { OptInGuard } from './guards';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { StNavTabsModule } from '@shared/ui-components/st-nav-tabs/st-nav-tabs.module';
import { StProgressBarModule } from '@shared/ui-components/st-progress-bar/st-progress-bar.module';

const imports = [
  CommonModule,
  FormsModule,
  IonicModule,
  RewardsRoutingModule,
  RewardsRoutingModule,
  StPopoverLayoutModule,
  StHeaderModule,
  StNavTabsModule,
  StProgressBarModule
];
const declarations = [
  RewardsPage,
  HistoryComponent,
  StoreComponent,
  LevelsComponent,
  ListItemComponent,
  BalanceComponent,
  RewardsPopoverComponent,
  ExpandListComponent,
  ExpandItemComponent,
];
const providers = [RewardsApiService, RewardsService, RewardsResolverGuard, OptInGuard];
const entryComponents = [RewardsPopoverComponent];
@NgModule({
  imports,
  declarations,
  providers,
  entryComponents,
})
export class RewardsPageModule {}
