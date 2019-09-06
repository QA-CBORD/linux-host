import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderingRoutingModule } from './ordering.routing.module';

import { OrderingPage } from './ordering.page';

import { OrderingApiService } from './service/ordering.api.service';
import { MerchantListService } from './service/merchant-list.service';

import { OrderingResolver } from './resolvers/ordering.resolver';
import { MenuOrderingComponent } from './components/menu-ordering/menu-ordering.component';
import { MerchantListModule } from './shared/ui-components/merchant-list/merchant-list.module';
import { IonicModule } from '@ionic/angular';

const imports = [CommonModule, OrderingRoutingModule, MerchantListModule, IonicModule];
const declarations = [OrderingPage, MenuOrderingComponent];
const providers = [OrderingResolver, OrderingApiService, MerchantListService];

@NgModule({
  declarations,
  imports,
  providers,
})
export class OrderingPageModule {}
