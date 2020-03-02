import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlErrorsComponent } from './control-errors.component';

const imports = [CommonModule];
const declarations = [ControlErrorsComponent];

@NgModule({
  declarations,
  imports,
  exports: declarations,
})
export class ControlErrorsModule {}
