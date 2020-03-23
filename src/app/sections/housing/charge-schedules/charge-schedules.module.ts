import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ChargeSchedulesComponent } from './charge-schedules.component';

const imports = [CommonModule, ReactiveFormsModule, IonicModule];
const declarations = [ChargeSchedulesComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class ChargeSchedulesModule {}
