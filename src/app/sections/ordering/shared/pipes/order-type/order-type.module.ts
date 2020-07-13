import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTypePipe } from './order-type.pipe';

const declarations = [OrderTypePipe];

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations
})
export class OrderTypePipeModule { }
