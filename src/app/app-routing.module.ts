import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NAVIGATE } from './app.global';

const routes: Routes = [
  /// initial route handled in app.component.ts
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: NAVIGATE.home, loadChildren: './pages/home/home.module#HomePageModule' },
  { path: NAVIGATE.mobileAccess, loadChildren: './pages/mobile-access/mobile-access.module#MobileAccessPageModule' },
  { path: NAVIGATE.rewards, loadChildren: './pages/rewards/rewards.module#RewardsPageModule' },
  {
    path: NAVIGATE.secureMessage,
    loadChildren: './pages/secure-messaging/secure-message.module#SecureMessagePageModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
