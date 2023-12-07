import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PATRON_ROUTES } from '@sections/section.config';
import { SectionsPage } from './sections.page';


const routes: Route[] = [
  {
    path: '',
    component: SectionsPage,
    children: [
      {
        path: PATRON_ROUTES.dashboard,
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
      },
      {
        path: PATRON_ROUTES.mobileAccess,
        loadChildren: () => import('./mobile-access/mobile-access.module').then(m => m.MobileAccessPageModule),
      },
      {
        path: PATRON_ROUTES.rewards,
        loadChildren: () => import('./rewards/rewards.module').then(m => m.RewardsPageModule),
      },
      {
        path: PATRON_ROUTES.secureMessage,
        loadChildren: () => import('./secure-messaging/secure-message.module').then(m => m.SecureMessagePageModule),
      },
      {
        path: PATRON_ROUTES.accounts,
        loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule),
      },
      {
        path: PATRON_ROUTES.ordering,
        loadChildren: () => import('./ordering/ordering.module').then(m => m.OrderingPageModule),
      },
      {
        path: PATRON_ROUTES.housing,
        loadChildren: () => import('./housing/housing.module').then(m => m.HousingPageModule),
      },
      {
        path: PATRON_ROUTES.explore,
        loadChildren: () => import('./explore/explore.module').then(m => m.ExploreModule),
      },
      {
        path: PATRON_ROUTES.settings,
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
      },
      {
        path: PATRON_ROUTES.notifications,
        loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule),
      },
    ]
  },
  {
    path: PATRON_ROUTES.biometric,
    loadChildren: () => import('./biometric-login/biometric.module').then(m => m.BiometricModule),
  }
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
