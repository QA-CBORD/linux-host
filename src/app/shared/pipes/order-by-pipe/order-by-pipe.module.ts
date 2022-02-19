import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByPipe } from './order-by.pipe';

const declarations = [OrderByPipe];

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations
})
export class OrderByPipeModule { }
