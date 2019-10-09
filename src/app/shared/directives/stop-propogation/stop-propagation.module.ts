import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickStopPropagationDirective } from './click-stop-propagation.directive';

const declarations = [ClickStopPropagationDirective];

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations
})
export class StopPropagationModule { }
