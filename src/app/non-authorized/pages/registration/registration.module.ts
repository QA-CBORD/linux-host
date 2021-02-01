import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './components/registration/registration.component';
import { GuestRegistrationComponent } from './components/user-registration/user-registration.component';
import { RegistrationModalComponent } from './components/registration-modal/registration-modal.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { RegistrationFormWrapperComponent } from './components/registration-form-wrapper/registration-form-wrapper.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    RegistrationModalComponent,
    GuestRegistrationComponent,
    RegistrationFormWrapperComponent
  ],
  imports: [
    CommonModule,
    StHeaderModule,
    StButtonModule,
    FormsModule, 
    IonicModule,
    StInputFloatingLabelModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegistrationComponent,
      },
    ]),
  ],
})
export class RegistrationModule {}
