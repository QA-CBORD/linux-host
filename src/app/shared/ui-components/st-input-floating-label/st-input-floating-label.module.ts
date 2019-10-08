import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StInputFloatingLabelComponent } from './st-input-floating-label.component';

const declarations = [StInputFloatingLabelComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations
})
export class StInputFloatingLabelModule { }
