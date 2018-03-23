import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RewardsPointsPage } from './rewards-points';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RewardsPointsPage,
  ],
  imports: [
    IonicPageModule.forChild(RewardsPointsPage),
    TranslateModule.forChild(),
  ],
})
export class RewardsPointsPageModule {}
