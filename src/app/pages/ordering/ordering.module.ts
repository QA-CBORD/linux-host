import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { OrderingRoutingModule } from './ordering.routing.module';

import { OrderingPage } from './ordering.page';

import { MerchantService } from './services';
import { OrderingApiService } from './services/ordering.api.service';

import { OrderingResolver } from './resolvers';
import { MerchantListModule } from './components/merchant-list/merchant-list.module';
import { MenuOrderingComponent } from '.';
import { ItemDetailModule } from './components/item-detail/item-detail.module';

const imports = [CommonModule, OrderingRoutingModule, MerchantListModule, IonicModule, ItemDetailModule];
const declarations = [OrderingPage, MenuOrderingComponent];
const providers = [OrderingResolver, MerchantService, OrderingApiService];

@NgModule({
  declarations,
  imports,
  providers,
})
export class OrderingPageModule {}
