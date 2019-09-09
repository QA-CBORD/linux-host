import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { NavModalRoutingModule } from './nav-modal.routing.module';
import { NavModalPage } from './nav-modal-page.component';
import { MerchantListModule } from '../../shared/ui-components/merchant-list/merchant-list.module';
import { RecentOrdersListModule } from '../../shared/ui-components/recent-oders-list/recent-orders-list.module';

const declarations = [NavModalPage];
const imports = [
  CommonModule,
  SharedModule,
  NavModalRoutingModule,
  IonicModule,
  MerchantListModule,
  RecentOrdersListModule,
];

@NgModule({
  declarations,
  imports,
})
export class NavModalModule {}
