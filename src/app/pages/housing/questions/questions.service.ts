import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { QuestionBase } from './types/question-base';
import { QuestionHeader } from './types/question-header';
import { QuestionParagraph } from './types/question-paragraph';
import { QuestionTextbox } from './types/question-textbox';
import { QuestionTextarea } from './types/question-textarea';
import { QuestionDate } from './types/question-date';
import { QuestionCheckboxGroup } from './types/question-checkbox-group';

export const QuestionConstructorsMap = {
  header: QuestionHeader,
  paragraph: QuestionParagraph,
  text: QuestionTextbox,
  textarea: QuestionTextarea,
  date: QuestionDate,
  'checkbox-group': QuestionCheckboxGroup,
};

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  questions: QuestionBase[];

  setQuestions(questions: QuestionBase[]): void {
    this.questions = questions;
  }

  getQuestions(): QuestionBase[] {
    return this.questions;
  }

  parseQuestions(json: string): QuestionBase[] {
    const parsedQuestions: any[] = JSON.parse(json);

    return parsedQuestions.map(this.toQuestionType);
  }

  toQuestionType(question: QuestionBase): QuestionBase {
    if (QuestionConstructorsMap[question.type]) {
      return new QuestionConstructorsMap[question.type](question);
    }

    return new QuestionBase(question);
  }

  toFormGroup(questions: QuestionBase[]) {
    let group: any = {};

    questions.forEach((question: QuestionBase) => {
      if (question.name) {
        group[question.name] = question.required
          ? new FormControl('', Validators.required)
          : new FormControl('');
      }
    });

    return new FormGroup(group);
  }
}
