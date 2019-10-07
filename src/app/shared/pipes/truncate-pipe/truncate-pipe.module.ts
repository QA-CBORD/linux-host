import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruncatePipe } from './truncate.pipe';

const declarations = [TruncatePipe];
@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations
})
export class TruncatePipeModule { }
