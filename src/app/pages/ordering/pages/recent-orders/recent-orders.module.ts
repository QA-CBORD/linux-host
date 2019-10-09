import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RecentOrdersRoutingModule } from './recent-orders.routing.module';
import { RecentOrdersListModule } from '@pages/ordering/shared/ui-components/recent-oders-list/recent-orders-list.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { RecentOrdersComponent } from '@pages/ordering/pages';
import { RecentOrderComponent } from '@pages/ordering/pages/recent-orders/components/recent-order/recent-order.component';
import { OrderDetailsModule } from '@pages/ordering/shared/ui-components/order-details/order-details.module';

const imports = [
  CommonModule,
  IonicModule,
  RecentOrdersRoutingModule,
  StHeaderModule,
  RecentOrdersListModule,
  OrderDetailsModule,
];
const declarations = [RecentOrdersComponent, RecentOrderComponent];

@NgModule({
  declarations,
  imports,
})
export class RecentOrdersModule { }
