import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { parseJsonToArray } from '../utils';

import { QuestionsStorageService } from './questions-storage.service';

import { QuestionBase } from './types/question-base';
import { QuestionFormControl } from './types/question-form-control';
import { QuestionHeader } from './types/question-header';
import { QuestionParagraph } from './types/question-paragraph';
import { QuestionTextbox } from './types/question-textbox';
import { QuestionTextarea } from './types/question-textarea';
import { QuestionDate } from './types/question-date';
import { QuestionDropdown } from './types/question-dropdown';
import { QuestionCheckboxGroup, QuestionCheckboxGroupValue } from './types/question-checkbox-group';
import { QuestionRadioGroup } from './types/question-radio-group';

import { ApplicationPage, QuestionReorder, QuestionReorderValue } from './questions.model';
import { ApplicationDetails, PatronAttribute } from '../applications/applications.model';

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
  private _pagesSource: BehaviorSubject<ApplicationPage[]> = new BehaviorSubject<ApplicationPage[]>([]);
  private _pages$: Observable<ApplicationPage[]> = this._pagesSource.asObservable();

  constructor(private _questionsStorageService: QuestionsStorageService) {}

  setPages(pages: ApplicationPage[]): void {
    this._pagesSource.next(pages);
  }

  getPages(): Observable<ApplicationPage[]> {
    return this._pages$;
  }

  parsePages(application: ApplicationDetails): void {
    const questions: QuestionBase[] = this.parseQuestions(application.applicationDefinition.applicationFormJson);
    const pages: ApplicationPage[] = this._splitByPages(questions, application.patronAttributes);

    this.setPages(pages);
  }

  async _patchFormsFromState(
    pages: ApplicationPage[],
    applicationKey: number,
    checkCallback: (namesToTouch: Set<string>) => void
  ): Promise<void> {
    const questions: any = await this._questionsStorageService.getQuestions(applicationKey);
    const namesToTouch: Set<string> = new Set<string>();

    pages.forEach((page: ApplicationPage, index: number) => {
      if (questions) {
        page.form.patchValue(questions);

        const controls = page.form.controls;

        Object.keys(controls).forEach((controlName: string) => {
          const control: AbstractControl = controls[controlName];
          const hasValue: boolean = Array.isArray(control.value)
            ? !control.value.some((value: any) => value == null || value === '')
            : !(control.value == null || control.value === '');

          if (hasValue) {
            control.markAsDirty();
            control.markAsTouched();

            namesToTouch.add(controlName);
          }
        });
      }
    });

    checkCallback(namesToTouch);
  }

  parseQuestions(json: string): QuestionBase[] {
    const questions: any[] = parseJsonToArray(json);

    return questions.map(this._toQuestionType);
  }

  private _toQuestionType(question: QuestionBase): QuestionBase {
    if (!question || !question.type) {
      return question;
    }

    if (QuestionConstructorsMap[question.type]) {
      if ((question as QuestionReorder).facilityPicker) {
        return new QuestionReorder(question);
      }

      return new QuestionConstructorsMap[question.type](question);
    }

    return new QuestionBase(question);
  }

  private _splitByPages(questions: QuestionBase[], attributes: PatronAttribute[]): ApplicationPage[] {
    const questionsByPages: QuestionBase[][] = questions.reduce(
      (accumulator: QuestionBase[][], current: QuestionBase, index: number) => {
        if (current && (current as QuestionParagraph).subtype === 'blockquote') {
          return questions[index + 1] ? [...accumulator, []] : [...accumulator];
        }

        accumulator[accumulator.length - 1].push(current);

        return accumulator;
      },
      [[]]
    );

    return questionsByPages.map((page: QuestionBase[]) => ({
      form: this._toFormGroup(page, attributes),
      questions: page,
    }));
  }

  private _toFormGroup(questions: QuestionBase[], attributes: PatronAttribute[]): FormGroup {
    let group: any = {};

    questions.forEach((question: QuestionFormControl) => {
      if (question && question.name) {
        if (question instanceof QuestionCheckboxGroup) {
          const values: FormControl[] = question.values.map(
            (value: QuestionCheckboxGroupValue) => new FormControl(value.selected)
          );

          group[question.name] = new FormArray(values);
        } else if (question instanceof QuestionReorder) {
          const values: FormControl[] = question.values
            .filter((value: QuestionReorderValue) => value.selected)
            .map((value: QuestionReorderValue) => new FormControl(value));

          group[question.name] = new FormArray(values);
        } else {
          const value: any = this._getValueFromAttribute(question, attributes);

          group[question.name] = question.required
            ? new FormControl(value, Validators.required)
            : new FormControl(value);
        }
      }
    });

    return new FormGroup(group);
  }

  private _getValueFromAttribute(question: QuestionFormControl, attributes: PatronAttribute[]): any {
    const foundAttribute: PatronAttribute = attributes.find(
      (attribute: PatronAttribute) => attribute.attributeConsumerKey === question.consumerKey
    );

    return foundAttribute ? foundAttribute.value : null;
  }
}
