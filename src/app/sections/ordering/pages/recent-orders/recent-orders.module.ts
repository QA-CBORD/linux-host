import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RecentOrdersRoutingModule } from './recent-orders.routing.module';
import { RecentOrdersListModule } from '@sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { RecentOrdersComponent } from '@sections/ordering/pages';
import { RecentOrderComponent } from '@sections/ordering/pages/recent-orders/components/recent-order/recent-order.component';
import { OrderDetailsModule } from '@sections/ordering/shared/ui-components/order-details/order-details.module';

const imports = [
    CommonModule,
    IonicModule,
    RecentOrdersRoutingModule,
    StHeaderModule,
    RecentOrdersListModule,
    OrderDetailsModule,
    StPopoverLayoutModule
];
const declarations = [RecentOrdersComponent, RecentOrderComponent, ConfirmPopoverComponent];

@NgModule({
    declarations,
    imports,
    entryComponents: [ConfirmPopoverComponent]
})
export class RecentOrdersModule {
}
