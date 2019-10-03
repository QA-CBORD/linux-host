import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderItemsSummaryPipe } from './order-items-summary.pipe';

const declarations = [OrderItemsSummaryPipe];

@NgModule({
  declarations,
  imports: [CommonModule],
  exports: declarations,
})
export class OrderItemsSummaryModule {}
