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
    loadChildren: () => import('./pages/recent-orders/recent-orders.module').then(m => m.RecentOrdersModule),
  },
  {
    path: LOCAL_ROUTING.savedAddresses,
    loadChildren: () => import('./pages/saved-addresses/saved-addresses.module').then(m => m.SavedAddressesModule),
    data: { relativeRoute: PATRON_NAVIGATION.ordering },
  },
  {
    path: LOCAL_ROUTING.favoriteMerchants,
    loadChildren: () => import('./pages/favorite-merchants/favorite-merchants.module').then(m => m.FavoriteMerchantsModule),
  },
  {
    path: LOCAL_ROUTING.fullMenu,
    loadChildren: () => import('./pages/full-menu/full-menu.module').then(m => m.FullMenuModule),
  },
  {
    path: LOCAL_ROUTING.cart,
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule),
  },
  {
    path: `${LOCAL_ROUTING.menuCategoryItems}/:id`,
    loadChildren: () => import('./pages/menu-category-items/menu-category-items.module').then(m => m.MenuCategoryItemsModule),
  },
  {
    path: `${LOCAL_ROUTING.itemDetail}`,
    loadChildren: () => import('./pages/item-detail/item-detail.module').then(m => m.ItemDetailModule),
  },
  {
    path: LOCAL_ROUTING.addressEdit,
    loadChildren: () => import('./pages/address-edit/address-edit.module').then(m => m.AddressEditPageModule),
    data: { afterSaveRoute: [PATRON_NAVIGATION.ordering, LOCAL_ROUTING.savedAddresses] },
  },
  {
    path: LOCAL_ROUTING.checkin,
    loadChildren: () => import('./../check-in/check-in.module').then(m => m.CheckInModule),
  },
  {
    path: LOCAL_ROUTING.itemManualEntry,
    loadChildren: () => import('./pages/item-manual-entry/item-manual-entry.module').then(m => m.ItemManualEntryModule),
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports, providers: [RecentOrdersResolver] })
export class OrderingRoutingModule {}
