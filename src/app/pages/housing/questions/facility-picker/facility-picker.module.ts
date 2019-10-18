import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FacilityPickerComponent } from './facility-picker.component';

const imports = [CommonModule, ReactiveFormsModule, IonicModule];
const declarations = [FacilityPickerComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class FacilityPickerModule {}
