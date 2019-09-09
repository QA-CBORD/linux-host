import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RecentOdersListComponent } from './recent-oders-list.component';
import { RecentOrdersListItemComponent } from './recent-orders-list-item';

const declarations = [RecentOdersListComponent, RecentOrdersListItemComponent];

@NgModule({
  declarations,
  exports: [RecentOdersListComponent],
  imports: [CommonModule, IonicModule],
})
export class RecentOrdersListModule {}
