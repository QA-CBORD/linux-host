import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { StDateSelectComponent } from './st-date-select.component';

const imports = [IonicModule, ReactiveFormsModule];
const exports = [StDateSelectComponent];
const declarations = [StDateSelectComponent];

@NgModule({
  imports,
  exports,
  declarations,
})
export class StDateSelectModule {}
