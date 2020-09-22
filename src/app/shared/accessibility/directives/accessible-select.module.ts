import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibleSelectDirective } from './accessible-select.directive';

const declarations = [AccessibleSelectDirective];

@NgModule({
  declarations,
  imports: [CommonModule],
  exports: declarations,
})
export class AccessibleSelectModule {}
