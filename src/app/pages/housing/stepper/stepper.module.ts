import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepperComponent } from './stepper.component';
import { StepComponent } from './step/step.component';
import { StepperNext, StepperBack } from './stepper-buttons';

const imports = [CommonModule];
const declarations = [StepperComponent, StepComponent, StepperNext, StepperBack];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class StepperModule {}
