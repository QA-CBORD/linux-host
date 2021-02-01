import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StInputFloatingLabelComponent } from './st-input-floating-label.component';
import { GetInputElement } from '../get-input-element/get-input-element.component';
import { FormsModule } from '@angular/forms';

const declarations = [StInputFloatingLabelComponent, GetInputElement];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: declarations
})
export class StInputFloatingLabelModule { }
