import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTypePipe } from './order-type.pipe';

@NgModule({
  declarations: [OrderTypePipe],
  imports: [
    CommonModule
  ],
  exports: [OrderTypePipe]
})
export class OrderTypePipeModule { }
