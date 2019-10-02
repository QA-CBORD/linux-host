import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickStopPropagationDirective } from './stop-propogation';

const imports = [CommonModule];
const declarations = [ClickStopPropagationDirective];
const exports = [...declarations];

@NgModule({
  imports,
  declarations,
  exports,
})
export class DirectivesModule {}
