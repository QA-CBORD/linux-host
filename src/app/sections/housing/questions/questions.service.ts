import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

import { integerValidator, numericValidator, parseJsonToArray } from '../utils';

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
  QuestionContractDetails,
  QuestionChargeScheduleBase,
} from './types';

import { QuestionReorder } from './questions.model';
import { QuestionFacilityAttributes } from '@sections/housing/questions/types/question-facility-attributes';
import { QuestionBlockquote } from '@sections/housing/questions/types/question-blockquote';
import { Attribute } from '@sections/housing/attributes/attributes.model';
import { QuestionsEntries } from '@sections/housing/questions/questions-storage.service';

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

  getQuestions(json: string): QuestionBase[] {
    return this._mapToQuestions(parseJsonToArray(json));
  }

  splitByPages(questions: QuestionBase[]): QuestionBase[][] {
    return questions.reduce(
      (accumulator: QuestionBase[][], current: QuestionBase, index: number) => {
        if (current && current instanceof QuestionBlockquote) {
          return questions[index + 1] ? [...accumulator, []] : [...accumulator];
        }

        accumulator[accumulator.length - 1].push(current);

        return accumulator;
      },
      [[]]
    );
  }

  getQuestionsPages(json: string): QuestionBase[][] {
    const questions: QuestionBase[] = this.getQuestions(json);

    return this.splitByPages(questions);
  }

  toFormGroup(
    questions: QuestionBase[],
    storedQuestions: QuestionsEntries,
    iteratee: (group: any, question: QuestionFormControl, questionName: string, storedValue: string) => void
  ): FormGroup {
    let group: any = {};

    questions
      .filter((question: QuestionBase) => question && (question as QuestionFormControl).name)
      .forEach((question: QuestionFormControl) => {
        const questionName: string = question.name;
        const storedValue: any = storedQuestions && storedQuestions[questionName];

        iteratee(group, question, questionName, storedValue);
      });

    return new FormGroup(group);
  }

  toQuestionCheckboxControl(storedValue: any, question: QuestionCheckboxGroup): FormArray {
    const values: QuestionCheckboxGroupValue[] = storedValue || question.values;
    const controls: FormControl[] = values.map((value: QuestionCheckboxGroupValue) => new FormControl(value.selected));

    return new FormArray(controls);
  }

  getAttributeValue(attributes: Attribute[], question: QuestionFormControl): string {
    const foundAttribute: Attribute = attributes.find(
      (attribute: Attribute) => attribute.attributeConsumerKey === question.consumerKey
    );

    return foundAttribute ? foundAttribute.value : '';
  }

  addDataTypeValidator(question: QuestionTextbox, validators: ValidatorFn[]): void {
    const dataType: string = question.dataType ? question.dataType.toLowerCase() : null;
    const dataTypeValidator: ValidatorFn = this._dataTypesValidators[dataType];

    if (dataTypeValidator) {
      validators.push(dataTypeValidator);
    }
  }

  private _mapToQuestions(questions: any[]): QuestionBase[] {
    return questions.map((question: any) => {
      if (!question || !question.type) {
        return new QuestionBase();
      }

      if (!QuestionConstructorsMap[question.type]) {
        return new QuestionBase(question);
      }

      if (
        (question as QuestionBlockquote).type === 'text' &&
        (question as QuestionBlockquote).subtype === 'blockquote'
      ) {
        return new QuestionBlockquote(question);
      } else if ((question as QuestionReorder).facilityPicker) {
        return new QuestionReorder(question);
      } else if ((question as QuestionChargeScheduleBase).chargeSchedule) {
        return new QuestionChargeScheduleBase(question);
      } else if (
        (question as QuestionContractDetails).source &&
        (question as QuestionContractDetails).source === 'CONTRACT_DETAILS'
      ) {
        return new QuestionContractDetails(question);
      } else if (
        (question as QuestionFacilityAttributes).source &&
        (question as QuestionFacilityAttributes).source === 'FACILITY'
      ) {
        return new QuestionFacilityAttributes(question);
      }

      return new QuestionConstructorsMap[question.type](question);
    });
  }
}
