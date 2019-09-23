import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetersToMilesPipe } from './meters-to-miles.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { TruncatePipe } from './truncate.pipe';
import { DateFormatPipe } from './date-format.pipe';

const imports = [CommonModule];
const declarations = [MetersToMilesPipe, SafeHtmlPipe, SafeUrlPipe, TruncatePipe, DateFormatPipe];
const exports = [...declarations];

@NgModule({
  imports,
  declarations,
  exports,
})
export class PipesModule {}
