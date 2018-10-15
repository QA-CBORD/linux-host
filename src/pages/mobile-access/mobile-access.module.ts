import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MobileAccessPage } from './mobile-access';

@NgModule({
  declarations: [
    MobileAccessPage,
  ],
  imports: [
    IonicPageModule.forChild(MobileAccessPage),
  ],
})
export class MobileAccessPageModule {}
