import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RecentOrdersRoutingModule } from './recent-orders.routing.module';
import { RecentOrdersListModule } from '@sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { RecentOrdersComponent } from '@sections/ordering/pages';
import { RecentOrderComponent } from '@sections/ordering/pages/recent-orders/components/recent-order/recent-order.component';
import { OrderDetailsModule } from '@sections/ordering/shared/ui-components/order-details/order-details.module';
import { OrderOptionsActionSheetModule } from '@sections/ordering/shared/ui-components/order-options.action-sheet';
import { ConfirmPopoverModule } from '@sections/ordering/shared/ui-components/confirm-popover/confirm-popover.module';
import { StSpinnerModule } from '@shared/ui-components/st-spinner/st-spinner.module';


const imports = [
    CommonModule,
    IonicModule,
    RecentOrdersRoutingModule,
    StHeaderModule,
    RecentOrdersListModule,
    OrderDetailsModule,
    OrderOptionsActionSheetModule,
    ConfirmPopoverModule,
    OrderOptionsActionSheetModule,
    StSpinnerModule
];
const declarations = [RecentOrdersComponent, RecentOrderComponent];

@NgModule({
    declarations,
    imports,
})
export class RecentOrdersModule {
}
