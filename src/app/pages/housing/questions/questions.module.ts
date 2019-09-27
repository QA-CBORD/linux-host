import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StInputFloatingLabelModule } from '../../../shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { StTextareaFloatingLabelModule } from '../../../shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.module';
import { StSelectFloatingLabelModule } from '../../../shared/ui-components/st-select-floating-label/st-select-floating-label.module';

import { QuestionComponent } from './question.component';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  IonicModule,
  StInputFloatingLabelModule,
  StTextareaFloatingLabelModule,
  StSelectFloatingLabelModule,
];
const exports = [QuestionComponent];
const declarations = [QuestionComponent];

@NgModule({
  imports,
  exports,
  declarations,
})
export class QuestionsModule {}
