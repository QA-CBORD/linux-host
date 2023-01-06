import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineBreakPipe } from './line-break.pipe';

const declarations = [LineBreakPipe];

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: [
    declarations,
    LineBreakPipe,
  ],
})
export class LineBreakPipeModule { }
