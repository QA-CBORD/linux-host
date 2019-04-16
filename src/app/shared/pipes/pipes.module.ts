import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetersToMilesPipe } from './meters-to-miles.pipe';

const imports = [CommonModule];
const declarations = [MetersToMilesPipe];
const exports = [...declarations];

@NgModule({
  imports,
  declarations,
  exports,
})
export class PipesModule {}
