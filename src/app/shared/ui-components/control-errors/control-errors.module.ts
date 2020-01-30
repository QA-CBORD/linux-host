import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlErrorsComponent } from './control-errors.component';

const imports = [CommonModule];
const declarations = [ControlErrorsComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class ControlErrorsModule {}
