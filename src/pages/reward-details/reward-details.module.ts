import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RewardDetailsPage } from './reward-details';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RewardDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RewardDetailsPage),
    TranslateModule.forChild(),
  ],
})
export class RewardDetailsPageModule {}
