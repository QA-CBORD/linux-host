import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './search.pipe';

const declarations = [SearchPipe];

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations
})
export class SearchPipeModule { }