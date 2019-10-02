import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe, MetersToMilesPipe, SafeHtmlPipe, SafeUrlPipe } from '.';

const imports = [CommonModule];
const declarations = [MetersToMilesPipe, SafeHtmlPipe, SafeUrlPipe, TruncatePipe];
const exports = [...declarations];

@NgModule({
  imports,
  declarations,
  exports,
})
export class PipesModule {}
