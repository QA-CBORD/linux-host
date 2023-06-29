import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { RegistrationSuccessComponent } from './components/registration-success/registration-success.component';
import { PasswordValidationModule } from 'src/app/password-validation/password-validation.module';

@NgModule({
  declarations: [RegistrationComponent, RegistrationSuccessComponent],
  imports: [
    CommonModule,
    StHeaderModule,
    ReactiveFormsModule,
    PasswordValidationModule,
    StButtonModule,
    FormsModule,
    IonicModule,
    StInputFloatingLabelModule
  ],
})
export class RegistrationModule {}
