import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationPageResolver } from '@sections/dashboard/resolvers/registration-page.resolver';
import { ROLES } from './app.global';
import { GUEST_ROUTES } from './non-authorized/non-authorized.config';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROLES.guest,
  },
  {
    path: ROLES.patron,
    loadChildren: './sections/sections.module#SectionsModule',
  },
  {
    path: ROLES.guest,
    loadChildren: './non-authorized/non-authorized.module#NonAuthorizedModule',
  },

  {
    path: GUEST_ROUTES.patronRegistration,
    loadChildren: './non-authorized/pages/registration/registration.module#RegistrationModule',
    data: { isGuest: false },
    resolve: {
      data: RegistrationPageResolver,
    },
  },

  {
    path: GUEST_ROUTES.guestRegistration,
    loadChildren: './non-authorized/pages/registration/registration.module#RegistrationModule',
    data: { isGuest: true },
    resolve: {
      data: RegistrationPageResolver,
    },
  },

  { path: '**', redirectTo: ROLES.guest },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
