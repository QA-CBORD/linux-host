import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StTextareaFloatingLabelComponent } from './st-textarea-floating-label.component';

const declarations = [StTextareaFloatingLabelComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations
})
export class StTextareaFloatingLabelModule { }
