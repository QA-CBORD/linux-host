import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { UnitsSwitchComponent } from './units-switch.component';

export const imports = [IonicModule, RouterModule];
export const declarations = [UnitsSwitchComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class UnitsSwitchModule {}
