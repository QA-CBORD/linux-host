import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetersToMilesPipe } from './meters-to-miles.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SafeUrlPipe } from './safe-url.pipe';

const imports = [CommonModule];
const declarations = [MetersToMilesPipe, SafeHtmlPipe, SafeUrlPipe];
const exports = [...declarations];

@NgModule({
  imports,
  declarations,
  exports,
})
export class PipesModule {}
