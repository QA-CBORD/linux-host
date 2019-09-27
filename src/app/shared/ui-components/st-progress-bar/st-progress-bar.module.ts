import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StProgressBarComponent } from './st-progress-bar.component';

const declarations = [StProgressBarComponent];
@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations
})
export class StProgressBarModule { }
