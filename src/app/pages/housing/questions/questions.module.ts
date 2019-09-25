import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { QuestionComponent } from './question.component';

const imports = [CommonModule, ReactiveFormsModule];
const exports = [QuestionComponent];
const declarations = [QuestionComponent];

@NgModule({
  imports,
  exports,
  declarations,
})
export class QuestionsModule {}
