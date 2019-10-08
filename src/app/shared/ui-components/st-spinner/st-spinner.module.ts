import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StSpinnerComponent } from './st-spinner.component';

const declarations = [StSpinnerComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations
})
export class StSpinnerModule { }
