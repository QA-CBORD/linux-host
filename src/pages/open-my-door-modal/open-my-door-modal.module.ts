import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenMyDoorModalPage } from './open-my-door-modal';

@NgModule({
  declarations: [
    OpenMyDoorModalPage,
  ],
  imports: [
    IonicPageModule.forChild(OpenMyDoorModalPage),
  ],
})
export class OpenMyDoorModalPageModule {}
