import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsDividerAppearDirective } from './is-divider-appear.directive';
import { PrefixImgDirective } from './prefix-img.directive';

const declarations = [IsDividerAppearDirective, PrefixImgDirective];

@NgModule({
  declarations: [...declarations],
  imports: [CommonModule],
  exports: [...declarations],
})
export class DirectivesModule {}
