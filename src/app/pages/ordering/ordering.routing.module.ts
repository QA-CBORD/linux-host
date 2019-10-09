import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { OrderingPage } from './ordering.page';

import { OrderingResolver } from './resolvers';
import { LOCAL_ROUTING } from './ordering.config';
import { RecentOrdersResolver } from '@pages/ordering/resolvers/recent-orders.resolver';

const routes: Route[] = [
  {
    path: '',
    component: OrderingPage,
    resolve: {
      data: OrderingResolver,
    },
  },
  {
    path: LOCAL_ROUTING.recentOrders,
    loadChildren: './pages/recent-orders/recent-orders.module#RecentOrdersModule',
    resolve: {recentOrders: RecentOrdersResolver}
  },
  {
    path: LOCAL_ROUTING.savedAddresses,
    loadChildren: './pages/saved-addresses/saved-addresses.module#SavedAddressesModule',
  },
  {
    path: LOCAL_ROUTING.favoriteMerchants,
    loadChildren: './pages/favorite-merchants/favorite-merchants.module#FavoriteMerchantsModule',
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports, providers: [RecentOrdersResolver] })
export class OrderingRoutingModule {}
