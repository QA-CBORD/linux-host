import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROLES } from './app.global';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROLES.anonymous,
  },
  {
    path: ROLES.patron,
    loadChildren: () => import('./sections/sections.module').then(m => m.SectionsModule),
  },
  {
    path: ROLES.guest,
    loadChildren: () => import('./sections/guest-sections.module').then(m => m.GuestSectionsModule),
  },
  {
    path: ROLES.anonymous,
    loadChildren: () => import('./non-authorized/non-authorized.module').then(m => m.NonAuthorizedModule),
  },

  { path: '**', redirectTo: ROLES.anonymous },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
