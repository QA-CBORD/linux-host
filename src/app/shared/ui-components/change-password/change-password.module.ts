import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StButtonModule } from '../st-button';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { FocusNextModule } from '@shared/directives/focus-next/focus-next.module';
import { StHeaderModule } from '../st-header/st-header.module';
import { ChangePasswordComponent } from './change-password.component';
import { PasswordValidationModule } from 'src/app/password-validation/password-validation.module';

const imports = [
  CommonModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
  StButtonModule,
  StInputFloatingLabelModule,
  StHeaderModule,
  FocusNextModule,
  PasswordValidationModule
];
const declarations = [ChangePasswordComponent];
const entryComponents = [ChangePasswordComponent];
const exports = [ChangePasswordComponent];

@NgModule({
  declarations,
  imports,
  entryComponents,
  exports,
})
export class ChangePasswordModule {}
