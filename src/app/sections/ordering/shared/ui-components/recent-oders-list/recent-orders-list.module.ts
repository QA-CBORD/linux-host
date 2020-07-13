import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RecentOrdersListComponent } from './recent-orders-list.component';
import { RecentOrdersListItemComponent } from './recent-orders-list-item';
import { OrderItemsSummaryModule } from '../../pipes/order-items-summary/order-items-summary.module';

const declarations = [RecentOrdersListComponent, RecentOrdersListItemComponent];

@NgModule({
  declarations,
  exports: [RecentOrdersListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, IonicModule, OrderItemsSummaryModule, ],
})
export class RecentOrdersListModule {}
