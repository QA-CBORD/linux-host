import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

import { parseJsonToArray, integerValidator, numericValidator } from '../utils';

import { QuestionsStorageService, QuestionsEntries } from './questions-storage.service';
import { ApplicationsService } from '../applications/applications.service';

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

import { QuestionsPage, QuestionReorder, QuestionReorderValue } from './questions.model';
import { ApplicationDetails, PatronAttribute, PatronPreference } from '../applications/applications.model';

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
  private _dataTypesValidators: { [key: string]: ValidatorFn } = {
    integer: integerValidator(),
    numeric: numericValidator(),
  };

  constructor(
    private _questionsStorageService: QuestionsStorageService,
    private _applicationsService: ApplicationsService
  ) {}

  getPages(applicationKey: number): Observable<QuestionsPage[]> {
    return this._applicationsService.getApplicationDetails(applicationKey).pipe(
      map((applicationDetails: ApplicationDetails) => {
        const questions: QuestionBase[] = this._parseQuestions(
          applicationDetails.applicationDefinition.applicationFormJson
        );

        return this._splitByPages(questions, applicationDetails.patronAttributes, applicationDetails.patronPreferences);
      }),
      switchMap((pages: QuestionsPage[]) => this.patchFormsFromState(applicationKey, pages))
    );
  }

  patchFormsFromState(applicationKey: number, pages: QuestionsPage[]): Observable<QuestionsPage[]> {
    return this._questionsStorageService.getQuestions(applicationKey).pipe(
      filter((questions: QuestionsEntries) => Boolean(questions)),
      map((questions: QuestionsEntries) => {
        pages.forEach((page: QuestionsPage) => page.form.patchValue(questions));

        return pages;
      })
    );
  }

  private _parseQuestions(json: string): QuestionBase[] {
    const questions: any[] = parseJsonToArray(json);

    return questions.map(this._toQuestionType);
  }

  private _toQuestionType(question: QuestionBase): QuestionBase {
    if (!question || !question.type) {
      return new QuestionBase();
    }

    if (QuestionConstructorsMap[question.type]) {
      if ((question as QuestionReorder).facilityPicker) {
        return new QuestionReorder(question);
      }

      return new QuestionConstructorsMap[question.type](question);
    }

    return new QuestionBase(question);
  }

  private _splitByPages(
    questions: QuestionBase[],
    attributes: PatronAttribute[],
    preferences: PatronPreference[]
  ): QuestionsPage[] {
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
      form: this._toFormGroup(page, attributes, preferences),
      questions: page,
    }));
  }

  private _toFormGroup(
    questions: QuestionBase[],
    attributes: PatronAttribute[],
    preferences: PatronPreference[]
  ): FormGroup {
    let group: any = {};

    questions
      .filter((question: QuestionBase) => question && (question as QuestionFormControl).name)
      .forEach((question: QuestionFormControl) => {
        if (question instanceof QuestionCheckboxGroup) {
          group[question.name] = this._toQuestionCheckboxControl(question);
        } else if (question instanceof QuestionReorder) {
          group[question.name] = this._toQuestionReorderControl(question, preferences);
        } else {
          group[question.name] = this._toFormControl(question, attributes);
        }
      });

    return new FormGroup(group);
  }

  private _toFormControl(question: QuestionFormControl, attributes: PatronAttribute[]): FormControl {
    const foundAttribute: PatronAttribute = attributes.find(
      (attribute: PatronAttribute) => attribute.attributeConsumerKey === question.consumerKey
    );
    const value: any = foundAttribute ? foundAttribute.value : '';
    const validators: ValidatorFn[] = [];

    if (question.required) {
      validators.push(Validators.required);
    }

    if (question instanceof QuestionTextbox) {
      this._addDataTypeValidator(question, validators);
    }

    return new FormControl(value, validators);
  }

  private _addDataTypeValidator(question: QuestionTextbox, validators: ValidatorFn[]): void {
    const dataType: string = question.dataType ? question.dataType.toLowerCase() : null;

    const dataTypeValidator: ValidatorFn = this._dataTypesValidators[dataType];

    if (dataTypeValidator) {
      validators.push(dataTypeValidator);
    }
  }

  private _toQuestionCheckboxControl(question: QuestionCheckboxGroup): FormArray {
    const values: FormControl[] = question.values.map(
      (value: QuestionCheckboxGroupValue) => new FormControl(value.selected)
    );

    return new FormArray(values);
  }

  private _toQuestionReorderControl(question: QuestionReorder, preferences: PatronPreference[]): FormArray {
    const values: FormControl[] = question.values
      .filter((value: QuestionReorderValue) => value.selected)
      .sort((current: QuestionReorderValue, next: QuestionReorderValue) =>
        this._sortQuestionReorder(preferences, current, next)
      )
      .map((value: QuestionReorderValue) => new FormControl(value));

    return new FormArray(values);
  }

  private _sortQuestionReorder(
    preferences: PatronPreference[],
    current: QuestionReorderValue,
    next: QuestionReorderValue
  ): number {
    const currentIndex: number = preferences.findIndex(
      (preference: PatronPreference) => preference.facilityKey === current.facilityKey
    );
    const nextIndex: number = preferences.findIndex(
      (preference: PatronPreference) => preference.facilityKey === next.facilityKey
    );

    return currentIndex - nextIndex;
  }
}
