import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RewardDetailsPage } from './reward-details';
import { TranslateModule } from '@ngx-translate/core';
import { QRCodeModule, QRCodeComponent } from 'angular2-qrcode';

@NgModule({
  declarations: [
    RewardDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RewardDetailsPage),
    TranslateModule.forChild(),
    QRCodeModule,
  ],
})
export class RewardDetailsPageModule {}
