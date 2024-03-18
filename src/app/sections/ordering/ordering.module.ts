import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { OrderingRoutingModule } from './ordering.routing.module';
import { OrderingPage } from './ordering.page';
import { OrderingResolver } from './resolvers';
import { MerchantListModule } from './components/merchant-list/merchant-list.module';
import { MenuOrderingComponent } from './components';
import { OrderDetailsModule } from './shared/ui-components/order-details/order-details.module';
import { CartResolver } from '@sections/ordering/resolvers/cart.resolver';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { CheckInModule } from '@sections/check-in/check-in.module';
import { TypeMessageModule } from './shared/pipes/type-message/type-message.pipe.module';
import { ModalsService } from '@core/service/modals/modals.service';
import { SearchPipeModule } from '@shared/pipes/search-pipe/search.pipe.module';
import { StHeaderSearchBarModule } from '@shared/ui-components/st-header-search-bar/st-header-search-bar.module';
import { TranslateModule } from '@ngx-translate/core';

const imports = [
  CommonModule,
  OrderingRoutingModule,
  MerchantListModule,
  IonicModule,
  OrderDetailsModule,
  StHeaderModule,
  CheckInModule,
  TypeMessageModule,
  SearchPipeModule,
  StHeaderSearchBarModule,
  TranslateModule
];
const declarations = [OrderingPage, MenuOrderingComponent];
const providers = [OrderingResolver, CartResolver, ModalsService];

@NgModule({
  declarations,
  imports,
  providers,
})
export class OrderingPageModule {}
