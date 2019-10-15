import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { QuestionBase } from './types/question-base';
import { QuestionHeader } from './types/question-header';
import { QuestionParagraph } from './types/question-paragraph';
import { QuestionTextbox } from './types/question-textbox';
import { QuestionTextarea } from './types/question-textarea';
import { QuestionDate } from './types/question-date';
import { QuestionDropdown } from './types/question-dropdown';
import { QuestionCheckboxGroup, QuestionCheckboxGroupValue } from './types/question-checkbox-group';
import { QuestionRadioGroup } from './types/question-readio-group';

import { QuestionPage } from './questions.model';
import { Application } from '../applications/applications.model';

export const QuestionConstructorsMap = {
  header: QuestionHeader,
  paragraph: QuestionParagraph,
  text: QuestionTextbox,
  textarea: QuestionTextarea,
  date: QuestionDate,
  select: QuestionDropdown,
  'checkbox-group': QuestionCheckboxGroup,
  'radio-group': QuestionRadioGroup,
};

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private _pagesSource: BehaviorSubject<QuestionPage[]> = new BehaviorSubject<QuestionPage[]>([]);
  private _pages$: Observable<QuestionPage[]> = this._pagesSource.asObservable();

  setPages(pages: QuestionPage[]): void {
    this._pagesSource.next(pages);
  }

  getPages(): Observable<QuestionPage[]> {
    return this._pages$;
  }

  parseQuestions(json: string): QuestionBase[] {
    let parsedQuestions: any;

    try {
      parsedQuestions = JSON.parse(json);
    } catch (error) {
      parsedQuestions = [];
    }

    const questions: any[] = Array.isArray(parsedQuestions) ? parsedQuestions : [];

    return questions.map(this.toQuestionType);
  }

  toQuestionType(question: QuestionBase): QuestionBase {
    if (QuestionConstructorsMap[question.type]) {
      return new QuestionConstructorsMap[question.type](question);
    }

    return new QuestionBase(question);
  }

  splitByPages(questions: QuestionBase[]): QuestionPage[] {
    const questionsByPages: QuestionBase[][] = questions.reduce(
      (accumulator: QuestionBase[][], current: QuestionBase, index: number) => {
        if (current.subtype === 'blockquote') {
          return questions[index + 1] ? [...accumulator, []] : [...accumulator];
        }

        accumulator[accumulator.length - 1].push(current);

        return accumulator;
      },
      [[]]
    );

    return questionsByPages.map((page: QuestionBase[]) => ({
      form: this.toFormGroup(page),
      questions: page,
    }));
  }

  parsePages(application: Application): void {
    const questions: QuestionBase[] = this.parseQuestions(application.applicationFormJson);
    const pages: QuestionPage[] = this.splitByPages(questions);

    this.setPages(pages);
  }

  toFormGroup(questions: QuestionBase[]): FormGroup {
    let group: any = {};

    questions.forEach((question: QuestionBase) => {
      if (question.name) {
        if (question instanceof QuestionCheckboxGroup) {
          const values: FormControl[] = question.values.map(
            (value: QuestionCheckboxGroupValue) => new FormControl(value.selected)
          );

          group[question.name] = new FormArray(values);
        } else {
          group[question.name] = question.required ? new FormControl('', Validators.required) : new FormControl('');
        }
      }
    });

    return new FormGroup(group);
  }
}
