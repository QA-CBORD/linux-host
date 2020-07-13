import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPage } from './forgot-password.page';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { FORGOT_PASSWORD_ROUTING } from './forgot-password.config';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordPage,
  },
  {
    path: FORGOT_PASSWORD_ROUTING.confirm,
    loadChildren: './pages/confirm-account/confirm-account.module#ConfirmAccountPageModule'
  },
  {
    path: FORGOT_PASSWORD_ROUTING.enterCode,
    loadChildren: './pages/enter-code/enter-code.module#EnterCodePageModule'
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    StButtonModule,
    StHeaderModule,
    ReactiveFormsModule
  ],
  declarations: [ForgotPasswordPage],
})
export class ForgotPasswordPageModule {
}
