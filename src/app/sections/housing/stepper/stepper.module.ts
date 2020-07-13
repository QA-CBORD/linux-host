import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepperComponent } from './stepper.component';
import { StepComponent } from './step/step.component';
import { StepperNextDirective, StepperBackDirective } from './stepper-buttons';
import { StepperFooterComponent } from './stepper-footer/stepper-footer.component';

const imports = [CommonModule];
const declarations = [
  StepperComponent,
  StepComponent,
  StepperNextDirective,
  StepperBackDirective,
  StepperFooterComponent,
];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class StepperModule {}
