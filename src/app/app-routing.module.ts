import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NAVIGATE } from './app.global';
import { SelectivePreloadingStrategy } from './shared/preload-strategy/SelectivePreloadingStrategy';

const routes: Routes = [
  {
    path: NAVIGATE.mobileAccess,
    loadChildren: './pages/mobile-access/mobile-access.module#MobileAccessPageModule',
  },
  { path: NAVIGATE.rewards, loadChildren: './pages/rewards/rewards.module#RewardsPageModule' },
  {
    path: NAVIGATE.secureMessage,
    loadChildren: './pages/secure-messaging/secure-message.module#SecureMessagePageModule',
  },
  {
    path: NAVIGATE.accounts,
    loadChildren: './pages/accounts/accounts.module#AccountsModule',
  },  { path: 'merchant-list', loadChildren: './pages/ordering/merchant-list/merchant-list.module#MerchantListPageModule' },
  { path: 'merchant-list', loadChildren: './pages/ordering/merchant-list/merchant-list.module#MerchantListPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: SelectivePreloadingStrategy })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
