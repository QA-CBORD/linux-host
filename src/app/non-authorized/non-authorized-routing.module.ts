import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ANONYMOUS_ROUTES } from './non-authorized.config';
const routes: Routes = [
  {
    path: '',
    redirectTo: ANONYMOUS_ROUTES.startup,
  },
  {
    path: ANONYMOUS_ROUTES.startup,
    loadChildren: './pages/startup/startup.module#StartupPageModule',
  },
  {
    path: ANONYMOUS_ROUTES.entry,
    loadChildren: './pages/entry/entry.module#EntryPageModule',
  },
  {
    path: ANONYMOUS_ROUTES.institutions,
    loadChildren: './pages/institutions/institutions.module#InstitutionsPageModule',
  },
  {
    path: ANONYMOUS_ROUTES.login,
    loadChildren: './pages/user-pass-form/user-pass-form.module#UserPassFormPageModule',
  },
  {
    path: ANONYMOUS_ROUTES.pre_login,
    loadChildren: './pages/pre-login/pre-login.module#PreLoginModule',
  },
  {
    path: ANONYMOUS_ROUTES.forgotPassword,
    loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule',
  },
  {
    path: ANONYMOUS_ROUTES.external,
    loadChildren: './pages/external-login/external-login.module#ExternalLoginPageModule',
  },
];


@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NonAuthorizedRoutingModule {}
