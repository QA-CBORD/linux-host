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
import { NgVarModule } from '@shared/directives/ng-var/ng-var.module';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';

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
    NgVarModule,
    RouterModule.forChild(routes),
  ],
  declarations: [UserPassForm],
  providers: [AccessibilityService]
})
export class UserPassFormPageModule {}
