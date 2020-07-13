import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GUEST_ROUTES } from './non-authorized.config';

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
    path: GUEST_ROUTES.forgotPassword,
    loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule',
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class NonAuthorizedRoutingModule {
}
