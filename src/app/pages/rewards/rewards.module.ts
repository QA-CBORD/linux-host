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
import { ExpandListComponent } from './components/levels/expand-list/expand-list.component';
import { ExpandItemComponent } from './components/levels/expand-list/expand-item/expand-item.component';

const imports = [CommonModule, FormsModule, IonicModule, RewardsRoutingModule, SharedModule];
const declarations = [RewardsPage, HistoryComponent, StoreComponent, LevelsComponent, ExpandListComponent,ExpandItemComponent];
const providers = [RewardsApiService, RewardsService];

@NgModule({
  imports,
  declarations,
  providers,
})
export class RewardsPageModule {}
