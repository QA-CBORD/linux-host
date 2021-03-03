import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

import { integerValidator, numericValidator, parseJsonToArray } from '../utils';

import {
  QuestionAssetTypeDetails,
  QuestionAssetTypeDetailsBase,
  QuestionBase,
  QuestionChargeScheduleBase,
  QuestionCheckboxGroup,
  QuestionCheckboxGroupValue,
  QuestionContractDetails,
  QuestionDate,
  QuestionDateSigned,
  QuestionDropdown,
  QuestionFormControl,
  QuestionHeader,
  QuestionParagraph,
  QuestionRadioGroup,
  QuestionTextarea,
  QuestionTextbox,
} from './types';

import { QuestionReorder, QUESTIONS_SOURCES } from './questions.model';
import { QuestionFacilityAttributes } from '@sections/housing/questions/types/question-facility-attributes';
import { QuestionBlockquote } from '@sections/housing/questions/types/question-blockquote';
import { Attribute } from '@sections/housing/attributes/attributes.model';
import { QuestionsEntries } from '@sections/housing/questions/questions-storage.service';
import { CONTRACT_DETAIL_KEYS } from '@sections/housing/contracts/contracts.model';
import { AssetTypeDetailValue } from '../non-assignments/non-assignments.model';

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

  toQuestionAssetTypeDetailsGroup(storedValue: any, question: QuestionAssetTypeDetails): FormGroup {
    const assetTypeGroup: AssetTypeDetailValue[][] = storedValue || question.assetTypes;
    let groups: any = {};

    assetTypeGroup.forEach((at: AssetTypeDetailValue[], index: number) => {
      const controls: FormControl[] = at.map((detail: AssetTypeDetailValue) => new FormControl(detail.value));
      groups[`aaa-${index}`] = new FormArray(controls);
    });

    return new FormGroup(groups);
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
    return questions
      .map((question: any) => {
        if (!question || !question.type) {
          return new QuestionBase();
        }

        if (!QuestionConstructorsMap[question.type]) {
          return new QuestionBase(question);
        }

        if (
          (question as QuestionBlockquote).type === 'paragraph' &&
          (question as QuestionBlockquote).subtype === 'blockquote'
        ) {
          return new QuestionBlockquote(question);
        } else if ((question as QuestionReorder).facilityPicker) {
          return new QuestionReorder(question);
        } else if ((question as QuestionChargeScheduleBase).chargeSchedule) {
          return new QuestionChargeScheduleBase(question);
        } else if ((question as QuestionContractDetails).source) {
          if ((question as QuestionContractDetails).source === QUESTIONS_SOURCES.CONTRACT_DETAILS) {
            if ((question as QuestionContractDetails).contractId === CONTRACT_DETAIL_KEYS.DATE_SIGNED) {
              return new QuestionDateSigned(question);
            } else {
              return new QuestionContractDetails(question);
            }
          } else if (this._isSourceFacility(question as QuestionFacilityAttributes)) {
            return new QuestionFacilityAttributes(question);
          }
        } else if (
          (question as QuestionAssetTypeDetailsBase).type === 'checkbox-group' &&
          (question as QuestionAssetTypeDetailsBase).label.toLowerCase() === 'asset type details') {
            return new QuestionAssetTypeDetailsBase(question);
        }

        return new QuestionConstructorsMap[question.type](question);
      })
      .sort(this._sortByQuestionDateSigned);
  }
  private _isSourceFacility(question: QuestionFacilityAttributes): boolean {
    const facilitySources = Object.keys(QUESTIONS_SOURCES).filter(x =>  x.includes("FACILITY"));
    for (let i=0; i < facilitySources.length; i++) {
      if(question.source === facilitySources[i]) {
        return true;
      }
    }
    return false;
  }
  private _sortByQuestionDateSigned(current: QuestionBase, next: QuestionBase): number {
    if (current instanceof QuestionDateSigned) {
      return 1;
    }

    return 0;
  }
}
