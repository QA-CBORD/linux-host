import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [OrderListComponent, OrderComponent],
  imports: [
    CommonModule
  ],
  exports: [OrderListComponent]
})
export class OrderListModule { }
