import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { integerValidator, numericValidator, parseJsonToArray, isDefined } from '../utils';

import { QuestionsEntries, QuestionsStorageService } from './questions-storage.service';
import { ApplicationsStateService } from '../applications/applications-state.service';
import { ContractsStateService } from '../contracts/contracts-state.service';

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
  QuestionChargeSchedule,
  QuestionContractDetails,
  QuestionChargeScheduleBase,
} from './types';

import { QuestionReorder, QuestionReorderValue, QuestionsPage } from './questions.model';
import {
  ApplicationDetails,
  ApplicationStatus,
  PatronApplication,
  PatronAttribute,
  PatronPreference,
} from '../applications/applications.model';
import { CONTRACT_DETAIL_KEYS, ContractDetails, ContractInfo } from '../contracts/contracts.model';
import { ChargeSchedulesService } from '@sections/housing/charge-schedules/charge-schedules.service';
import { ChargeSchedule, ChargeScheduleValue } from '@sections/housing/charge-schedules/charge-schedules.model';

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
    private _applicationsStateService: ApplicationsStateService,
    private _contractsStateService: ContractsStateService,
    private _chargeSchedulesService: ChargeSchedulesService
  ) {}

  getPages(key: number): Observable<QuestionsPage[]> {
    return this._questionsStorageService.getQuestions(key).pipe(
      withLatestFrom(this._applicationsStateService.applicationDetails$),
      map(([storedQuestions, applicationDetails]: [QuestionsEntries, ApplicationDetails]) => {
        const questions: QuestionBase[] = this._parseQuestions(
          applicationDetails.applicationDefinition.applicationFormJson
        );
        const patronApplication: PatronApplication = applicationDetails.patronApplication;
        const status: ApplicationStatus = patronApplication && patronApplication.status;
        const isSubmitted = status === ApplicationStatus.Submitted;

        return this._splitByApplicationPages(
          questions,
          applicationDetails.patronAttributes,
          applicationDetails.patronPreferences,
          storedQuestions,
          isSubmitted
        );
      })
    );
  }

  getContractPages(key: number): Observable<QuestionsPage[]> {
    return this._questionsStorageService.getQuestions(key).pipe(
      withLatestFrom(this._contractsStateService.contractDetails$),
      map(([storedQuestions, contractDetails]: [QuestionsEntries, ContractDetails]) => {
        const questions: QuestionBase[] = this._parseQuestions(
          contractDetails.formJson,
          contractDetails.chargeSchedules
        );

        return this._splitByContractPages(
          questions,
          contractDetails.patronAttributes,
          contractDetails.contractInfo,
          storedQuestions
        );
      })
    );
  }

  private _parseQuestions(json: string, chargeSchedules?: ChargeSchedule[]): QuestionBase[] {
    const questions: any[] = parseJsonToArray(json);

    return questions.map((question: any) => this._toQuestionType(question, chargeSchedules));
  }

  private _toQuestionType(question: QuestionBase, chargeSchedules: ChargeSchedule[]): QuestionBase {
    if (!question || !question.type) {
      return new QuestionBase();
    }

    if (QuestionConstructorsMap[question.type]) {
      if ((question as QuestionReorder).facilityPicker) {
        return new QuestionReorder(question);
      } else if ((question as QuestionChargeScheduleBase).chargeSchedule) {
        const chargeSchedulesGroup: ChargeScheduleValue[][] = this._chargeSchedulesService.getChargeSchedules(
          chargeSchedules,
          (question as QuestionChargeScheduleBase).values
        );

        return new QuestionChargeSchedule({ label: question.label, chargeSchedulesGroup });
      } else if (
        (question as QuestionContractDetails).source &&
        (question as QuestionContractDetails).source === 'CONTRACT_DETAILS'
      ) {
        return new QuestionContractDetails(question);
      }

      return new QuestionConstructorsMap[question.type](question);
    }

    return new QuestionBase(question);
  }

  private _splitByPages(questions: QuestionBase[]): QuestionBase[][] {
    return questions.reduce(
      (accumulator: QuestionBase[][], current: QuestionBase, index: number) => {
        if (current && (current as QuestionParagraph).subtype === 'blockquote') {
          return questions[index + 1] ? [...accumulator, []] : [...accumulator];
        }

        accumulator[accumulator.length - 1].push(current);

        return accumulator;
      },
      [[]]
    );
  }

  private _splitByApplicationPages(
    questions: QuestionBase[],
    attributes: PatronAttribute[],
    preferences: PatronPreference[],
    storedQuestions: QuestionsEntries,
    isSubmitted: boolean
  ): QuestionsPage[] {
    const questionsByPages: QuestionBase[][] = this._splitByPages(questions);

    return questionsByPages.map((pageQuestions: QuestionBase[]) => ({
      form: this._toFormGroup(pageQuestions, attributes, preferences, storedQuestions, isSubmitted),
      questions: pageQuestions,
    }));
  }

  private _splitByContractPages(
    questions: QuestionBase[],
    attributes: PatronAttribute[],
    contractInfo: ContractInfo,
    storedQuestions: QuestionsEntries
  ): QuestionsPage[] {
    const questionsByPages: QuestionBase[][] = this._splitByPages(questions);

    return questionsByPages.map((pageQuestions: QuestionBase[]) => ({
      form: this._toContractFormGroup(pageQuestions, attributes, contractInfo, storedQuestions),
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

  private _toContractFormGroup(
    questions: QuestionBase[],
    attributes: PatronAttribute[],
    contractInfo: ContractInfo,
    storedQuestions: QuestionsEntries
  ): FormGroup {
    let group: any = {};

    questions
      .filter((question: QuestionBase) => question && (question as QuestionFormControl).name)
      .forEach((question: QuestionFormControl) => {
        const questionName: string = question.name;
        const storedValue: any = storedQuestions && storedQuestions[questionName];

        if (question instanceof QuestionCheckboxGroup) {
          group[questionName] = this._toQuestionCheckboxControl(storedValue, question);
        } else {
          group[questionName] = this._toContractFormControl(storedValue, question, attributes, contractInfo);
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

    if (!isDefined(value)) {
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

  private _toContractFormControl(
    storedValue: any,
    question: QuestionFormControl,
    attributes: PatronAttribute[],
    contractInfo: ContractInfo
  ): FormControl {
    let value: any = storedValue;

    if (!isDefined(value)) {
      if (question instanceof QuestionContractDetails) {
        const contractKey: string = CONTRACT_DETAIL_KEYS[question.contractId];

        value = contractInfo[contractKey] || '';
      } else {
        const foundAttribute: PatronAttribute = attributes.find(
          (attribute: PatronAttribute) => attribute.attributeConsumerKey === question.consumerKey
        );

        value = foundAttribute ? foundAttribute.value : '';
      }
    }

    return new FormControl({ value, disabled: true });
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
        QuestionReorder.sort(preferences, current, next, selectedValues.length)
      )
      .map((value: QuestionReorderValue) => new FormControl(value));

    return new FormArray(controls);
  }
}
