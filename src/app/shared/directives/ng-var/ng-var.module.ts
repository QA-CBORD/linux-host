import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VarDirective } from '@shared/directives';

const declarations = [VarDirective];

@NgModule({
  declarations,
  imports: [CommonModule],
  exports: declarations,
})
export class NgVarModule {}
