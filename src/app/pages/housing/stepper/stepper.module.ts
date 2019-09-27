import { NgModule } from '@angular/core';

import { StepComponent } from './step/step.component';

const declarations = [StepComponent];

@NgModule({
  declarations,
  exports: declarations
})
export class StepperModule { }
