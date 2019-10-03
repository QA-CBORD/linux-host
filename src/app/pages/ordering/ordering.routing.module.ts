import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { OrderingPage } from './ordering.page';

import { OrderingResolver } from './resolvers';
import { LOCAL_ROUTING } from './ordering.config';

const routes: Route[] = [
  {
    path: '',
    component: OrderingPage,
    resolve: {
      data: OrderingResolver,
    },
    children: [],
  },
  {
    path: LOCAL_ROUTING.recentOrders,
    loadChildren: './pages/recent-orders/recent-orders.module#RecentOrdersModule',
  },
  {
    path: LOCAL_ROUTING.savedAddresses,
    loadChildren: './pages/saved-addresses/saved-addresses.module#SavedAddressesModule',
  },
  {
    path: LOCAL_ROUTING.favoriteMerchants,
    loadChildren: './pages/favorite-merchants/favorite-merchants.module#FavoriteMerchantsModule',
  },
  {
    path: LOCAL_ROUTING.addressEdit,
    loadChildren: './pages/address-edit/address-edit.module#AddressEditPageModule',
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class OrderingRoutingModule {}
