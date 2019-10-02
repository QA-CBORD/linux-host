import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetersToMilesPipe } from './meters-to-miles.pipe';

const declarations = [MetersToMilesPipe];

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations
})
export class MetersToMilesPipeModule { }
