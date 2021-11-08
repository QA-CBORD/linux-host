import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { OrderingPage } from './ordering.page';

import { OrderingResolver } from './resolvers';
import { LOCAL_ROUTING } from './ordering.config';
import { RecentOrdersResolver } from '@sections/ordering/resolvers/recent-orders.resolver';
import { PATRON_NAVIGATION } from 'src/app/app.global';

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
  },
  {
    path: LOCAL_ROUTING.savedAddresses,
    loadChildren: './pages/saved-addresses/saved-addresses.module#SavedAddressesModule',
    data: { relativeRoute: PATRON_NAVIGATION.ordering },
  },
  {
    path: LOCAL_ROUTING.favoriteMerchants,
    loadChildren: './pages/favorite-merchants/favorite-merchants.module#FavoriteMerchantsModule',
  },
  {
    path: LOCAL_ROUTING.fullMenu,
    loadChildren: './pages/full-menu/full-menu.module#FullMenuModule',
  },
  {
    path: LOCAL_ROUTING.cart,
    loadChildren: './pages/cart/cart.module#CartModule',
  },
  {
    path: `${LOCAL_ROUTING.menuCategoryItems}/:id`,
    loadChildren: './pages/menu-category-items/menu-category-items.module#MenuCategoryItemsModule',
  },
  {
    path: `${LOCAL_ROUTING.itemDetail}`,
    loadChildren: './pages/item-detail/item-detail.module#ItemDetailModule',
  },
  {
    path: LOCAL_ROUTING.addressEdit,
    loadChildren: './pages/address-edit/address-edit.module#AddressEditPageModule',
  },
  {
    path: LOCAL_ROUTING.checkin,
    loadChildren: './../check-in/check-in.module#CheckInModule',
  },
  {
    path: LOCAL_ROUTING.itemManualEntry,
    loadChildren: './pages/item-manual-entry/item-manual-entry.module#ItemManualEntryModule',
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports, providers: [RecentOrdersResolver] })
export class OrderingRoutingModule {}
