import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StHeaderComponent } from './st-header.component';

const declarations = [StHeaderComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: declarations
})
export class StHeaderModule { }
