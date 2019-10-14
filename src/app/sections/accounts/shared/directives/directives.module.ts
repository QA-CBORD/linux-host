import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsDividerAppearDirective } from './is-divider-appear.directive';

const declarations = [IsDividerAppearDirective];

@NgModule({
  declarations: [...declarations],
  imports: [CommonModule],
  exports: [...declarations],
})
export class DirectivesModule {}
