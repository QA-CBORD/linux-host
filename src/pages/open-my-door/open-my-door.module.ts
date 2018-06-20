import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenMyDoorPage } from './open-my-door';

@NgModule({
  declarations: [
    OpenMyDoorPage,
  ],
  imports: [
    IonicPageModule.forChild(OpenMyDoorPage),
  ],
})
export class OpenMyDoorPageModule {}
