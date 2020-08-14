import { FocusNextDirective } from './focus-next.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const declarations = [FocusNextDirective];

@NgModule({
  declarations,
  imports: [CommonModule],
  exports: declarations,
})
export class FocusNextModule {}
