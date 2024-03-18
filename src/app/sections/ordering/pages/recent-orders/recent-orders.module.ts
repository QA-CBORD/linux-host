import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RecentOrdersRoutingModule } from './recent-orders.routing.module';
import { RecentOrdersListModule } from '@sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { RecentOrdersComponent } from '@sections/ordering/pages';
import { RecentOrderComponent } from '@sections/ordering/pages/recent-orders/components/recent-order/recent-order.component';
import { OrderDetailsModule } from '@sections/ordering/shared/ui-components/order-details/order-details.module';
import { OrderOptionsActionSheetComponent } from '@sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { ConfirmPopoverModule } from '@sections/ordering/shared/ui-components/confirm-popover/confirm-popover.module';
import { StSpinnerModule } from '@shared/ui-components/st-spinner/st-spinner.module';
import { StButtonModule } from '@shared/ui-components/st-button';
import { TypeMessageModule } from '@sections/ordering/shared/pipes/type-message/type-message.pipe.module';
import { ItemsUnavailableComponent } from './components/items-unavailable/items-unavailable.component';
import { OrderItemDetailsModule } from '@sections/ordering/shared/ui-components/order-item-details/order-item-details.module';
import { OrderFiltersActionSheetModule } from '@sections/ordering/shared/ui-components/order-filters.action-sheet';
import { StAlertBannerComponent } from '@shared/ui-components/st-alert-banner/st-alert-banner.component';

const imports = [
  CommonModule,
  IonicModule,
  RecentOrdersRoutingModule,
  StHeaderModule,
  RecentOrdersListModule,
  OrderDetailsModule,
  OrderOptionsActionSheetComponent,
  ConfirmPopoverModule,
  StButtonModule,
  StSpinnerModule,
  StAlertBannerComponent,
  TypeMessageModule,
  OrderItemDetailsModule,
  OrderFiltersActionSheetModule
];
const declarations = [RecentOrdersComponent, RecentOrderComponent, ItemsUnavailableComponent];

@NgModule({
  declarations,
  imports,
})
export class RecentOrdersModule {}
