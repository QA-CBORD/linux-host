import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StSelectFloatingLabelComponent } from './st-select-floating-label.component';
import { IonicModule } from '@ionic/angular';

const declarations = [StSelectFloatingLabelComponent];
@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: declarations
})
export class StSelectFloatingLabelModule { }
