import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RecentOrdersRoutingModule } from './recent-orders.routing.module';
import { RecentOrdersListModule } from '@sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { RecentOrdersComponent } from '@sections/ordering/pages';
import { RecentOrderComponent } from '@sections/ordering/pages/recent-orders/components/recent-order/recent-order.component';
import { OrderDetailsModule } from '@sections/ordering/shared/ui-components/order-details/order-details.module';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { ConfirmPopoverComponent } from '@sections/ordering/pages/recent-orders/components/confirm-popover/confirm-popover.component';
import { OrderOptionsActionSheetModule } from '@sections/ordering/shared/ui-components/order-options.action-sheet';


const imports = [
    CommonModule,
    IonicModule,
    RecentOrdersRoutingModule,
    StHeaderModule,
    RecentOrdersListModule,
    OrderDetailsModule,
    StPopoverLayoutModule,
    OrderOptionsActionSheetModule,
];
const declarations = [RecentOrdersComponent, RecentOrderComponent, ConfirmPopoverComponent];

@NgModule({
    declarations,
    imports,
    entryComponents: [ConfirmPopoverComponent]
})
export class RecentOrdersModule {
}
