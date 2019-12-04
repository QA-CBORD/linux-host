import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NAVIGATE } from './app.global';
import { SelectivePreloadingStrategy } from '@core/utils/preload-strategy/selective-preloading-strategy';

const routes: Routes = [
  { path: NAVIGATE.dashboard, loadChildren: './sections/dashboard/dashboard.module#DashboardPageModule' },
  {
    path: NAVIGATE.mobileAccess,
    loadChildren: './sections/mobile-access/mobile-access.module#MobileAccessPageModule',
  },
  { path: NAVIGATE.rewards, loadChildren: './sections/rewards/rewards.module#RewardsPageModule' },
  {
    path: NAVIGATE.secureMessage,
    loadChildren: './sections/secure-messaging/secure-message.module#SecureMessagePageModule',
  },
  {
    path: NAVIGATE.accounts,
    loadChildren: './sections/accounts/accounts.module#AccountsModule',
  },
  {
    path: NAVIGATE.ordering,
    loadChildren: './sections/ordering/ordering.module#OrderingPageModule',
  },
  { path: NAVIGATE.housing, loadChildren: './sections/housing/housing.module#HousingPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: SelectivePreloadingStrategy })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
