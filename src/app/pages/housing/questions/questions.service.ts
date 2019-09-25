import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { QuestionBase } from './types/question-base';
import { QuestionHeader } from './types/question-header';
import { QuestionParagraph } from './types/question-paragraph';
import { QuestionTextbox } from './types/question-textbox';
import { QuestionTextarea } from './types/question-textarea';
import { QuestionDate } from './types/question-date';
import { QuestionCheckboxGroup } from './types/question-checkbox-group';
import { BehaviorSubject, Observable } from 'rxjs';

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
  private _questionsSource: BehaviorSubject<QuestionBase[]> = new BehaviorSubject<QuestionBase[]>([]);
  private _questions$: Observable<QuestionBase[]> = this._questionsSource.asObservable();

  setQuestions(questions: QuestionBase[]): void {
    this._questionsSource.next(questions);
  }

  getQuestions(): Observable<QuestionBase[]> {
    return this._questions$;
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
