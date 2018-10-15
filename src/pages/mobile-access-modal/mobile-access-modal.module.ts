import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MobileAccessModalPage } from './mobile-access-modal';

@NgModule({
  declarations: [
    MobileAccessModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MobileAccessModalPage),
  ]
})
export class MobileAccessModalPageModule {}
