import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { UserPassForm } from './user-pass-form.page';
import { FocusNextModule } from '@shared/directives/focus-next/focus-next.module';

const routes: Routes = [
  {
    path: '',
    component: UserPassForm,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    StInputFloatingLabelModule,
    StButtonModule,
    StHeaderModule,
    FocusNextModule,
    RouterModule.forChild(routes),
  ],
  declarations: [UserPassForm],
})
export class UserPassFormPageModule {}
