import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'mobile-access', loadChildren: './pages/mobile-access/mobile-access/mobile-access.module#MobileAccessPageModule' },
  { path: 'rewards', loadChildren: './pages/rewards/rewards/rewards.module#RewardsPageModule' },
  { path: 'secure-message', loadChildren: './pages/secure-messaging/secure-message/secure-message.module#SecureMessagePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
