import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { generateQuestions } from './questions.mock';

import { QuestionDetails } from './question-details';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  questions: any[] = generateQuestions();

  getQuestions(applicationId: number) {
    return of(this.questions).pipe(map((questions: any[]) => questions.map(this._toModel)));
  }

  private _toModel(question: any): QuestionDetails {
    return new QuestionDetails(question);
  }
}
