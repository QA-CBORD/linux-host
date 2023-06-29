import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StButtonModule } from '../st-button';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { FocusNextModule } from '@shared/directives/focus-next/focus-next.module';
import { StHeaderModule } from '../st-header/st-header.module';
import { PasswordChangeComponent } from './password-change.component';
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
const declarations = [PasswordChangeComponent];
const exports = [PasswordChangeComponent];

@NgModule({
  declarations,
  imports,
  exports,
})
export class PasswordChangeModule {}
