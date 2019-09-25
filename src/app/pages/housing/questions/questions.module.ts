import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UiComponentsModule } from '../../../shared/ui-components/ui-components.module';

import { QuestionComponent } from './question.component';

const imports = [CommonModule, ReactiveFormsModule, IonicModule, UiComponentsModule];
const exports = [QuestionComponent];
const declarations = [QuestionComponent];

@NgModule({
  imports,
  exports,
  declarations,
})
export class QuestionsModule {}
