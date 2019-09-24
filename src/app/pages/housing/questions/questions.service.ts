import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { generateQuestions } from './questions.mock';

import { QuestionDetails } from './question-details';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  toFormGroup(questions: QuestionDetails[]) {
    // let group: any = {};
    // questions.forEach(question => {
    //   group[question.key] = question.required
    //     ? new FormControl(question.value || '', Validators.required)
    //     : new FormControl(question.value || '');
    // });
    // return new FormGroup(group);
  }
}
