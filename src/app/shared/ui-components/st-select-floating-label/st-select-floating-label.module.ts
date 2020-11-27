import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StSelectFloatingLabelComponent } from './st-select-floating-label.component';
import { IonicModule } from '@ionic/angular';
import { AccessibleSelectModule } from '@shared/accessibility/directives/accessible-select.module';

const declarations = [StSelectFloatingLabelComponent];
@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    AccessibleSelectModule
  ],
  exports: declarations
})
export class StSelectFloatingLabelModule { }
