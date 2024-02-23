import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RecentOrdersListComponent } from './recent-orders-list.component';
import { RecentOrdersListItemComponent } from './recent-orders-list-item';
import { OrderItemsSummaryModule } from '../../pipes/order-items-summary/order-items-summary.module';
import { IsDividerAppearDirectiveModule } from '@sections/accounts/shared/directives/is-divider-appear/is-divider-appear.module';
import { StAlertBannerComponent } from '@shared/ui-components/st-alert-banner/st-alert-banner.component';

const declarations = [RecentOrdersListComponent, RecentOrdersListItemComponent];

@NgModule({
  declarations,
  exports: [RecentOrdersListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, IonicModule, OrderItemsSummaryModule, StAlertBannerComponent, IsDividerAppearDirectiveModule],
})
export class RecentOrdersListModule {}
