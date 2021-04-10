import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { GUEST_ROUTES } from '@sections/section.config';
import { GuestAddFundsResolver } from './guest/guest-deposits/components/add-funds/resolver/guest-add-funds.resolver';

// create route guards for guest users...
const routes: Route[] = [
  {
    path: '',
    redirectTo: GUEST_ROUTES.dashboard,
  },
  {
    path: GUEST_ROUTES.dashboard,
    loadChildren: './guest/guest-dashboard.module#GuestDashboardModule',
  },
  {
    path: GUEST_ROUTES.ordering,
    loadChildren: './ordering/ordering.module#OrderingPageModule',
  },
  {
    path: GUEST_ROUTES.explore,
    loadChildren: './explore/explore.module#ExploreModule',
  },
  {
    path: GUEST_ROUTES.deposit,
    loadChildren: './guest/guest-deposits/guest-deposits.module#GuestDepositsModule',
  },
  {
    path: GUEST_ROUTES.addFunds,
    loadChildren: './guest/guest-dashboard/components/guest-add-funds/guest-add-funds.module#GuestAddFundsModule',
    resolve: {
      data: GuestAddFundsResolver,
    },
  },
  {
    path: GUEST_ROUTES.settings,
    loadChildren: './settings/settings.module#SettingsModule',
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestSectionsRoutingModule {}
