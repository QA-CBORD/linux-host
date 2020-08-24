import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgVarDirective } from '@shared/directives';

const declarations = [NgVarDirective];

@NgModule({
  declarations,
  imports: [CommonModule],
  exports: declarations,
})
export class NgVarModule {}
