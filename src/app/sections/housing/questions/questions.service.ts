import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { integerValidator, numericValidator, parseJsonToArray } from '../utils';

import { QuestionsEntries, QuestionsStorageService } from './questions-storage.service';
import { ApplicationsStateService } from '../applications/applications-state.service';

import {
  QuestionBase,
  QuestionCheckboxGroup,
  QuestionCheckboxGroupValue,
  QuestionDate,
  QuestionDropdown,
  QuestionFormControl,
  QuestionHeader,
  QuestionParagraph,
  QuestionRadioGroup,
  QuestionTextarea,
  QuestionTextbox,
} from './types';

import { QuestionReorder, QuestionReorderValue, QuestionsPage } from './questions.model';
import {
  ApplicationDetails,
  ApplicationStatus,
  PatronApplication,
  PatronAttribute,
  PatronPreference,
} from '../applications/applications.model';

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
    private _applicationsStateService: ApplicationsStateService
  ) {}

  getPages(applicationKey: number): Observable<QuestionsPage[]> {
    return this._questionsStorageService.getQuestions(applicationKey).pipe(
      withLatestFrom(this._applicationsStateService.applicationDetails$),
      map(([storedQuestions, applicationDetails]: [QuestionsEntries, ApplicationDetails]) => {
        const questions: QuestionBase[] = this._parseQuestions(
          applicationDetails.applicationDefinition.applicationFormJson
        );
        const patronApplication: PatronApplication = applicationDetails.patronApplication;
        const status: ApplicationStatus = patronApplication && patronApplication.status;
        const isSubmitted = status === ApplicationStatus.Submitted;

        return this._splitByPages(
          questions,
          applicationDetails.patronAttributes,
          applicationDetails.patronPreferences,
          storedQuestions,
          isSubmitted
        );
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
    preferences: PatronPreference[],
    storedQuestions: QuestionsEntries,
    isSubmitted: boolean
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

    return questionsByPages.map((pageQuestions: QuestionBase[]) => ({
      form: this._toFormGroup(pageQuestions, attributes, preferences, storedQuestions, isSubmitted),
      questions: pageQuestions,
    }));
  }

  private _toFormGroup(
    questions: QuestionBase[],
    attributes: PatronAttribute[],
    preferences: PatronPreference[],
    storedQuestions: QuestionsEntries,
    isSubmitted: boolean
  ): FormGroup {
    let group: any = {};

    questions
      .filter((question: QuestionBase) => question && (question as QuestionFormControl).name)
      .forEach((question: QuestionFormControl) => {
        const questionName: string = question.name;
        const storedValue: any = storedQuestions && storedQuestions[questionName];

        if (question instanceof QuestionCheckboxGroup) {
          group[questionName] = this._toQuestionCheckboxControl(storedValue, question);
        } else if (question instanceof QuestionReorder) {
          group[questionName] = this._toQuestionReorderControl(storedValue, question, preferences);
        } else {
          group[questionName] = this._toFormControl(storedValue, question, attributes, isSubmitted);
        }
      });

    return new FormGroup(group);
  }

  private _toFormControl(
    storedValue: any,
    question: QuestionFormControl,
    attributes: PatronAttribute[],
    isSubmitted: boolean
  ): FormControl {
    let value: any = storedValue;

    if (value == null) {
      const foundAttribute: PatronAttribute = attributes.find(
        (attribute: PatronAttribute) => attribute.attributeConsumerKey === question.consumerKey
      );

      value = foundAttribute ? foundAttribute.value : '';
    }

    const validators: ValidatorFn[] = [];

    if (question.required) {
      validators.push(Validators.required);
    }

    if (question instanceof QuestionTextbox) {
      this._addDataTypeValidator(question, validators);
    }

    return new FormControl({ value, disabled: isSubmitted }, validators);
  }

  private _addDataTypeValidator(question: QuestionTextbox, validators: ValidatorFn[]): void {
    const dataType: string = question.dataType ? question.dataType.toLowerCase() : null;
    const dataTypeValidator: ValidatorFn = this._dataTypesValidators[dataType];

    if (dataTypeValidator) {
      validators.push(dataTypeValidator);
    }
  }

  private _toQuestionCheckboxControl(storedValue: any, question: QuestionCheckboxGroup): FormArray {
    const values: QuestionCheckboxGroupValue[] = storedValue || question.values;
    const controls: FormControl[] = values.map((value: QuestionCheckboxGroupValue) => new FormControl(value.selected));

    return new FormArray(controls);
  }

  private _toQuestionReorderControl(
    storedValue: any,
    question: QuestionReorder,
    preferences: PatronPreference[]
  ): FormArray {
    const values: QuestionReorderValue[] = storedValue || question.values;
    const selectedValues: QuestionReorderValue[] = values.filter((value: QuestionReorderValue) => value.selected);
    const controls: FormControl[] = selectedValues
      .sort((current: QuestionReorderValue, next: QuestionReorderValue) =>
        this._sortQuestionReorder(preferences, current, next, selectedValues.length)
      )
      .map((value: QuestionReorderValue) => new FormControl(value));

    return new FormArray(controls);
  }

  private _sortQuestionReorder(
    preferences: PatronPreference[],
    current: QuestionReorderValue,
    next: QuestionReorderValue,
    length: number
  ): number {
    let currentIndex: number = preferences.findIndex(
      (preference: PatronPreference) => preference.facilityKey === current.facilityKey
    );
    let nextIndex: number = preferences.findIndex(
      (preference: PatronPreference) => preference.facilityKey === next.facilityKey
    );

    if (currentIndex === -1) {
      currentIndex = length;
    }

    if (nextIndex === -1) {
      nextIndex = length;
    }

    return currentIndex - nextIndex;
  }
}
