import { RewardsService } from './../../../rewards/services/rewards.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RewardsTileComponent } from './rewards-tile.component';
import { RewardsApiService } from '@sections/rewards/services';


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
