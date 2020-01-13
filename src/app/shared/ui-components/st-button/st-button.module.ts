import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StButtonComponent } from './st-button.component';
import { IonicModule } from '@ionic/angular';

const declarations = [StButtonComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: declarations
})
export class StButtonModule { }
