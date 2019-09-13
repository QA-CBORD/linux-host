import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderingRoutingModule } from './ordering.routing.module';

import { OrderingPage } from './ordering.page';

import { MerchantService } from './services';
import { OrderingApiService } from './services/ordering.api.service';

import { OrderingResolver } from './resolvers';
import { MenuOrderingComponent } from './components';
import { MerchantListModule } from './shared/ui-components/merchant-list/merchant-list.module';
import { IonicModule } from '@ionic/angular';

const imports = [CommonModule, OrderingRoutingModule, MerchantListModule, IonicModule];
const declarations = [OrderingPage, MenuOrderingComponent];
const providers = [OrderingResolver, MerchantService,OrderingApiService];

@NgModule({
  declarations,
  imports,
  providers,
})
export class OrderingPageModule {}
