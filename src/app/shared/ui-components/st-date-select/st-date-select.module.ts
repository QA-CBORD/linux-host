import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StDateSelectComponent } from './st-date-select.component';
import { CommonModule } from '@angular/common';

const imports = [IonicModule, ReactiveFormsModule, CommonModule, FormsModule];
const exports = [StDateSelectComponent];
const declarations = [StDateSelectComponent];

@NgModule({
  imports,
  exports,
  declarations,
})
export class StDateSelectModule {}
