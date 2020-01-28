import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { UnitsSwitchComponent } from './units-switch.component';

export const imports = [CommonModule, IonicModule, RouterModule];
export const declarations = [UnitsSwitchComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class UnitsSwitchModule {}
