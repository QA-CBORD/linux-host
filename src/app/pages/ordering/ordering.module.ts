import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderingRoutingModule } from './ordering.routing.module';
import { OrderingSharedModule } from './shared/shared.module';

import { OrderingPage } from './ordering.page';

import { OrderingApiService } from './service/ordering.api.service';
import { MerchantListService } from './service/merchant-list.service';

import { OrderingResolver } from './resolvers/ordering.resolver';

const imports = [CommonModule, OrderingSharedModule, OrderingRoutingModule];
const declarations = [OrderingPage];
const providers = [ OrderingResolver, OrderingApiService, MerchantListService];

@NgModule({
  declarations,
  imports,
  providers,
})
export class OrderingPageModule {}
