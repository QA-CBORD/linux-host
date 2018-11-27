import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RewardDetailsModalPage } from './reward-details-modal';
import { TranslateModule } from '@ngx-translate/core';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [
    RewardDetailsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(RewardDetailsModalPage),
    TranslateModule.forChild(),
    QRCodeModule
  ],
})
export class RewardDetailsModalPageModule
 {}
