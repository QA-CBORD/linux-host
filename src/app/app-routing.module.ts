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
    loadChildren: './sections/sections.module#SectionsModule',
  },
  {
    path: ROLES.guest,
    loadChildren: './sections/guest-sections.module#GuestSectionsModule',
  },
  {
    path: ROLES.anonymous,
    loadChildren: './non-authorized/non-authorized.module#NonAuthorizedModule',
  },

  { path: '**', redirectTo: ROLES.anonymous },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
