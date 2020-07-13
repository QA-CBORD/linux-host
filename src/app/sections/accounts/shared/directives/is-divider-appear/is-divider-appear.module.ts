import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsDividerAppearDirective } from './is-divider-appear.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [IsDividerAppearDirective],
  exports: [IsDividerAppearDirective],
})
export class IsDividerAppearDirectiveModule {}
