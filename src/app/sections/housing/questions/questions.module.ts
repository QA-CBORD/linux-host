import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { StTextareaFloatingLabelModule } from '@shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.module';
import { StSelectFloatingLabelModule } from '@shared/ui-components/st-select-floating-label/st-select-floating-label.module';
import { StDateSelectModule } from '@shared/ui-components/st-date-select/st-date-select.module';
import { FacilityPickerModule } from './facility-picker/facility-picker.module';
import { ControlErrorsModule } from '@shared/ui-components/control-errors/control-errors.module';
import { RadioGroupModule } from '@sections/ordering/shared/ui-components/radio-group/radio-group.module';

import { QuestionComponent } from './question.component';
import { EmptyFormControlDirective } from '../empty-form-control/empty-form-control.directive';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  IonicModule,
  StInputFloatingLabelModule,
  StTextareaFloatingLabelModule,
  StSelectFloatingLabelModule,
  StDateSelectModule,
  FacilityPickerModule,
  ControlErrorsModule,
  RadioGroupModule,
];
const exports = [QuestionComponent];
const declarations = [QuestionComponent, EmptyFormControlDirective];

@NgModule({
  imports,
  exports,
  declarations,
})
export class QuestionsModule {}
