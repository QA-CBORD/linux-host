import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortByDatePipe } from './sort-by-date.pipe';

const declarations = [SortByDatePipe];

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations
})
export class SortByDatePipeModule { }
