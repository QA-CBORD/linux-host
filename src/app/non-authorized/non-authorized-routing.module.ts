import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ANONYMOUS_ROUTES } from './non-authorized.config';
const routes: Routes = [
  {
    path: '',
    redirectTo: ANONYMOUS_ROUTES.startup,
    pathMatch: 'full'
  },
  {
    path: ANONYMOUS_ROUTES.startup,
    loadChildren: () => import('./pages/startup/startup.module').then(m => m.StartupPageModule),
  },
  {
    path: ANONYMOUS_ROUTES.entry,
    loadChildren: () => import('./pages/entry/entry.module').then(m => m.EntryPageModule),
  },
  {
    path: ANONYMOUS_ROUTES.institutions,
    loadChildren: () => import('./pages/institutions/institutions.module').then(m => m.InstitutionsPageModule),
  },
  {
    path: ANONYMOUS_ROUTES.login,
    loadChildren: () => import('./pages/user-pass-form/user-pass-form.module').then(m => m.UserPassFormPageModule),
  },
  {
    path: ANONYMOUS_ROUTES.pre_login,
    loadChildren: () => import('./pages/pre-login/pre-login.module').then(m => m.PreLoginModule),
  },
  {
    path: ANONYMOUS_ROUTES.forgotPassword,
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule),
  },
  {
    path: ANONYMOUS_ROUTES.external,
    loadChildren: () => import('./pages/external-login/external-login.module').then(m => m.ExternalLoginPageModule),
  },
  {
    path: ANONYMOUS_ROUTES.scanCard,
    loadChildren: () => import('../sections/dashboard/containers/scan-card/scan-card.module').then(m => m.ScanCardModule),
  }
];


@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NonAuthorizedRoutingModule {}
