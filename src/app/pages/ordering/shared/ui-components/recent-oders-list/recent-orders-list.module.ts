import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RecentOrdersListComponent } from './recent-orders-list.component';
import { RecentOrdersListItemComponent } from './recent-orders-list-item';
import { OrderItemsSummaryModule } from '../../pipes/order-items-summary/order-items-summary.module';
import { PipesModule } from '../../../../../shared/pipes/pipes.module';

const declarations = [RecentOrdersListComponent, RecentOrdersListItemComponent];

@NgModule({
  declarations,
  exports: [RecentOrdersListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, IonicModule, OrderItemsSummaryModule, PipesModule],
})
export class RecentOrdersListModule {}
