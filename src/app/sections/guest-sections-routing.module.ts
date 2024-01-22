import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { GUEST_ROUTES } from '@sections/section.config';
import { GuestAddFundsResolver } from './guest/guest-deposits/components/resolver/guest-add-funds.resolver';
import { GuestDepositResolver } from './guest/guest-deposits/components/resolver/guest-deposit-resolver';
import { GuestSectionPage } from './guest-sections.page';

// create route guards for guest users...
const routes: Route[] = [
  {
    path: '',
    component: GuestSectionPage,
    children: [
      {
        path: GUEST_ROUTES.dashboard,
        loadChildren: () => import('./guest/guest-dashboard.module').then(m => m.GuestDashboardModule),
      },
      {
        path: GUEST_ROUTES.ordering,
        loadChildren: () => import('./ordering/ordering.module').then(m => m.OrderingPageModule),
      },
      {
        path: GUEST_ROUTES.explore,
        loadChildren: () => import('./explore/explore.module').then(m => m.ExploreModule),
      },
      {
        path: GUEST_ROUTES.deposit,
        loadChildren: () => import('./guest/guest-deposits/guest-deposits.module').then(m => m.GuestDepositsModule),
        resolve: {
          data: GuestDepositResolver,
        },
      },
      {
        path: GUEST_ROUTES.addFunds,
        loadChildren: () =>
          import('./guest/guest-deposits/components/add-funds/guest-add-funds.module').then(m => m.GuestAddFundsModule),
        resolve: {
          data: GuestAddFundsResolver,
        },
      },
      {
        path: GUEST_ROUTES.settings,
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
      },
      {
        path: GUEST_ROUTES.notifications,
        loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule),
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestSectionsRoutingModule {}
