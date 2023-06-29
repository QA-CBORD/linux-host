import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneEmailComponent } from './phone-email.component';
import { StButtonModule } from '../st-button';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { FocusNextModule } from '@shared/directives/focus-next/focus-next.module';
import { StHeaderModule } from '../st-header/st-header.module';

const imports = [
  CommonModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
  StButtonModule,
  StInputFloatingLabelModule,
  StHeaderModule,
  FocusNextModule,
];
const declarations = [PhoneEmailComponent];

@NgModule({
  declarations,
  imports,
  exports: [PhoneEmailComponent],
})
export class PhoneEmailModule {}
