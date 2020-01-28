import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { RoomsSwitchComponent } from './rooms-switch.component';

export const imports = [IonicModule, RouterModule];
export const declarations = [RoomsSwitchComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class RoomsSwitchModule {}
