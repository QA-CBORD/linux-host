import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { OrderingRoutingModule } from './ordering.routing.module';

import { OrderingPage } from './ordering.page';

import { OrderingApiService } from './service/ordering.api.service';
import { MerchantListService } from './service/merchant-list.service';

const imports = [CommonModule, SharedModule, OrderingRoutingModule];
const declarations = [OrderingPage];
const providers = [OrderingApiService, MerchantListService];

@NgModule({
  declarations,
  imports,
  providers,
})
export class OrderingPageModule {}
