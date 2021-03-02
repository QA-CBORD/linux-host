import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StInputFloatingLabelComponent } from './st-input-floating-label.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const declarations = [StInputFloatingLabelComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: declarations
})
export class StInputFloatingLabelModule { }
