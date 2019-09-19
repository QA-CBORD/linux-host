import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StTextareaFloatingLabelComponent } from './st-textarea-floating-label.component';
import { IonicModule } from '@ionic/angular';

const declarations = [StTextareaFloatingLabelComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: declarations
})
export class StTextareaFloatingLabelModule { }
