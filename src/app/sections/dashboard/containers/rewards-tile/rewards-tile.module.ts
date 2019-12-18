
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RewardsApiService } from '@sections/rewards/services';
import { RewardsTileComponent } from './rewards-tile.component';
import { RewardsService } from './services/rewards.service';



const imports = [IonicModule, CommonModule];
const declarations = [RewardsTileComponent];
const exports = [RewardsTileComponent];

@NgModule({
  declarations,
  imports,
  providers: [RewardsService, RewardsApiService],
  exports,
})
export class RewardsTileModule { }
