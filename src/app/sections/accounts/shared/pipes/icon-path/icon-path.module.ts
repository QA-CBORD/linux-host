import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconPathPipe } from './icon-path.pipe';

const declarations = [IconPathPipe];

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations
})
export class IconPathModule { }
