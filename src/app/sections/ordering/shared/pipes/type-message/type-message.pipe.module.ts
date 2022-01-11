import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeMessagePipe } from './type-message.pipe';

const declarations = [TypeMessagePipe];

@NgModule({
  declarations,
  imports: [CommonModule],
  exports: declarations,
})
export class TypeMessageModule {}
