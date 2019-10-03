import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StCountdownComponent } from './st-countdown.component';

const declarations = [StCountdownComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations
})
export class StCountdownModule { }
