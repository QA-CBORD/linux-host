import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputValidatorComponent } from '../non-authorized/pages/registration/components/input-validator/input-validator.component';

@NgModule({
  imports: [CommonModule],
  declarations: [InputValidatorComponent],
  exports: [InputValidatorComponent],
})
export class PasswordValidationModule {}
