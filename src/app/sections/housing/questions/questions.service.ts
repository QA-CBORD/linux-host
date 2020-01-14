import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { parseJsonToArray, hasValue, integerValidator, numericValidator } from '../utils';

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
  private _pagesSource: BehaviorSubject<ApplicationPage[]> = new BehaviorSubject<ApplicationPage[]>([]);

  private _dataTypesValidators: { [key: string]: ValidatorFn } = {
    integer: integerValidator(),
    numeric: numericValidator(),
  };

  pages$: Observable<ApplicationPage[]> = this._pagesSource.asObservable();

  constructor(private _questionsStorageService: QuestionsStorageService) {}

  setPages(application: ApplicationDetails): void {
    const questions: QuestionBase[] = this._parseQuestions(application.applicationDefinition.applicationFormJson);
    const pages: ApplicationPage[] = this._splitByPages(
      questions,
      application.patronAttributes,
      application.patronPreferences
    );

    this._pagesSource.next(pages);
  }

  async _patchFormsFromState(
    applicationKey: number,
    pages: ApplicationPage[],
    checkCallback: (namesToTouch: Set<string>) => void
  ): Promise<void> {
    const questions: any = await this._questionsStorageService.getQuestions(applicationKey);

    if (questions) {
      const namesToTouch: Set<string> = new Set<string>();

      pages.forEach((page: ApplicationPage) => {
        page.form.patchValue(questions);

        const controls = page.form.controls;

        Object.keys(controls).forEach((controlName: string) => {
          const control: AbstractControl = controls[controlName];

          if (hasValue(control.value)) {
            control.markAsDirty();
            control.markAsTouched();

            namesToTouch.add(controlName);
          }
        });
      });

      checkCallback(namesToTouch);
    }
  }

  _parseQuestions(json: string): QuestionBase[] {
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

  private _splitByPages(
    questions: QuestionBase[],
    attributes: PatronAttribute[],
    preferences: PatronPreference[]
  ): ApplicationPage[] {
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
    const value: any = foundAttribute ? foundAttribute.value : null;
    const validators: ValidatorFn[] = [];

    if (question.required) {
      validators.push(Validators.required);
    }

    if (question instanceof QuestionTextbox) {
      const dataType: string = question.dataType ? question.dataType.toLowerCase() : null;

      const dataTypeValidator: ValidatorFn = this._dataTypesValidators[dataType];

      if (dataTypeValidator) {
        validators.push(dataTypeValidator);
      }
    }

    return new FormControl(value, validators);
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
      .sort((current: QuestionReorderValue, next: QuestionReorderValue) => {
        const currentIndex: number = preferences.findIndex(
          (preference: PatronPreference) => preference.facilityKey === current.facilityKey
        );
        const nextIndex: number = preferences.findIndex(
          (preference: PatronPreference) => preference.facilityKey === next.facilityKey
        );

        return currentIndex - nextIndex;
      })
      .map((value: QuestionReorderValue) => new FormControl(value));

    return new FormArray(values);
  }
}
