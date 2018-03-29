import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RewardsHistoryPage } from './rewards-history';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RewardsHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(RewardsHistoryPage),
    TranslateModule.forChild(),
  ],
})
export class RewardsHistoryPageModule {}
