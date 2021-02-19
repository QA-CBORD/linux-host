import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GUEST_ROUTES } from './non-authorized.config';
import { PreLoginDataResolverService } from './pages/pre-login/service/pre-login-data-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: GUEST_ROUTES.startup,
  },
  {
    path: GUEST_ROUTES.startup,
    loadChildren: './pages/startup/startup.module#StartupPageModule',
  },
  {
    path: GUEST_ROUTES.entry,
    loadChildren: './pages/entry/entry.module#EntryPageModule',
  },
  {
    path: GUEST_ROUTES.institutions,
    loadChildren: './pages/institutions/institutions.module#InstitutionsPageModule',
  },
  {
    path: GUEST_ROUTES.login,
    loadChildren: './pages/user-pass-form/user-pass-form.module#UserPassFormPageModule',
  },
  {
    path: GUEST_ROUTES.pre_login,
    loadChildren: './pages/pre-login/pre-login.module#PreLoginModule',
    resolve: {
      data: PreLoginDataResolverService,
    },
  },
  {
    path: GUEST_ROUTES.forgotPassword,
    loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule',
  },
  {
    path: GUEST_ROUTES.external,
    loadChildren: './pages/external-login/external-login.module#ExternalLoginPageModule',
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NonAuthorizedRoutingModule {}
