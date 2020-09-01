import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PATRON_ROUTES } from '@sections/section.config';

const routes: Route[] = [
  {
    path: '',
    redirectTo: PATRON_ROUTES.dashboard,
  },
  {
    path: PATRON_ROUTES.dashboard,
    loadChildren: './dashboard/dashboard.module#DashboardPageModule',
  },
  {
    path: PATRON_ROUTES.mobileAccess,
    loadChildren: './mobile-access/mobile-access.module#MobileAccessPageModule',
  },
  {
    path: PATRON_ROUTES.rewards,
    loadChildren: './rewards/rewards.module#RewardsPageModule',
  },
  {
    path: PATRON_ROUTES.secureMessage,
    loadChildren: './secure-messaging/secure-message.module#SecureMessagePageModule',
  },
  {
    path: PATRON_ROUTES.accounts,
    loadChildren: './accounts/accounts.module#AccountsModule',
  },
  {
    path: PATRON_ROUTES.ordering,
    loadChildren: './ordering/ordering.module#OrderingPageModule',
  },
  {
    path: PATRON_ROUTES.housing,
    loadChildren: './housing/housing.module#HousingPageModule',
  },
  {
    path: PATRON_ROUTES.explore,
    loadChildren: './explore/explore.module#ExploreModule',
  },
  {
    path: PATRON_ROUTES.biometric,
    loadChildren: './biometric-login/biometric.module#BiometricModule',
  },
  {
    path: PATRON_ROUTES.settings,
    loadChildren: './settings/settings.module#SettingsModule',
  },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class SectionsRoutingModule {
}
