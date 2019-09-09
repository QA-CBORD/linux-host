import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RecentOrdersListComponent } from './recent-orders-list.component';
import { RecentOrdersListItemComponent } from './recent-orders-list-item';

const declarations = [RecentOrdersListComponent, RecentOrdersListItemComponent];

@NgModule({
  declarations,
  exports: [RecentOrdersListComponent],
  imports: [CommonModule, IonicModule],
})
export class RecentOrdersListModule {}
