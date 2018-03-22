import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { UserRewardTrackInfoInfoList, UserRewardTrackInfo, UserTrackLevelInfo } from '../../models/rewards/rewards.interface'

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {
  userRewardTrackInfo: UserRewardTrackInfo;
}
