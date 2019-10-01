import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RecentOrdersComponent } from './recent-orders.component';
import { RecentOrdersRoutingModule } from './recent-orders.routing.module';
import { OrderListModule } from './components/order-list/order-list.module';
import { SharedModule } from '@shared/shared.module';

const imports = [CommonModule, IonicModule, RecentOrdersRoutingModule, OrderListModule, SharedModule];
const declarations = [RecentOrdersComponent];
const providers = [];
const entryComponents = [];

@NgModule({
  declarations,
  imports,
  providers,
  entryComponents,
})
export class RecentOrdersModule { }
