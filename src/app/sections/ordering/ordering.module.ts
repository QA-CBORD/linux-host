import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { OrderingRoutingModule } from './ordering.routing.module';

import { OrderingPage } from './ordering.page';

import { MerchantService } from './services';
import { OrderingApiService } from './services/ordering.api.service';

import { OrderingResolver } from './resolvers';
import { MerchantListModule } from './components/merchant-list/merchant-list.module';
import { MenuOrderingComponent } from './components';
import { OrderDetailsModule } from './shared/ui-components/order-details/order-details.module';
import { CartService } from '@sections/ordering/services/cart.service';
import { CartResolver } from '@sections/ordering/resolvers/cart.resolver';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';

const imports = [CommonModule, OrderingRoutingModule, MerchantListModule, IonicModule, OrderDetailsModule, StHeaderModule];
const declarations = [OrderingPage, MenuOrderingComponent];
const providers = [OrderingResolver, MerchantService, OrderingApiService, CartService, CartResolver, OrderingService];

@NgModule({
  declarations,
  imports,
  providers,
})
export class OrderingPageModule { }
