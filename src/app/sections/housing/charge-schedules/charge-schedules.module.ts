import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ChargeScheduleComponent } from '../questions/charge-schedule/charge-schedule.component';

const imports = [CommonModule, ReactiveFormsModule, IonicModule];
const declarations = [ChargeScheduleComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class ChargeSchedulesModule {}
