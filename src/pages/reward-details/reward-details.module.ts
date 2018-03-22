import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RewardDetailsPage } from './reward-details';

@NgModule({
  declarations: [
    RewardDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RewardDetailsPage)
  ],
})
export class RewardDetailsPageModule {}
