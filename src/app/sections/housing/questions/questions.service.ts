import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { integerValidator, isEmptyOrNullString, numericValidator, parseJsonToArray } from '../utils';

import {
  QuestionAddressTypeGroup,
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
import { AssetTypeDetailValue } from '@sections/housing/non-assignments/non-assignments.model';
import { AddressFields, PatronAddress } from '@sections/housing/addresses/address.model';
import { QuestionRoommatePreference } from './types/question-roommate-preference';
import { QuestionWaitingListRequest } from './types/question-waiting-list-request';

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
    iteratee: (group, question: QuestionFormControl, questionName: string, storedValue: string) => void
  ): FormGroup {
    const group = {};

    questions
      .filter((question: QuestionBase) => question && (question as QuestionFormControl).name)
      .forEach((question: QuestionFormControl) => {
        const questionName: string = question.name;
        const storedValue = storedQuestions && storedQuestions[questionName];

        iteratee(group, question, questionName, storedValue);
      });

    return new FormGroup(group);
  }

  toQuestionCheckboxControl(storedValue, question: QuestionCheckboxGroup): FormArray {
    const values: QuestionCheckboxGroupValue[] = storedValue || question.values;
    const controls: FormControl[] = values.map((value: QuestionCheckboxGroupValue) => new FormControl(value.selected, this.getRequiredValidator(question)));

    return new FormArray(controls);
  }

  toQuestionAssetTypeDetailsGroup(storedValue, question: QuestionAssetTypeDetails): FormGroup {
    const assetTypeGroup: AssetTypeDetailValue[][] = storedValue || question.assetTypes;
    const groups = {};

    assetTypeGroup.forEach((at: AssetTypeDetailValue[], index: number) => {
      const controls: FormControl[] = at.map((detail: AssetTypeDetailValue) => new FormControl(detail.value, this.getRequiredValidator(question)));
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

  getAddressValue(addresses: PatronAddress[], question: QuestionFormControl): string {
    const address: PatronAddress = addresses.find(
      (addr: PatronAddress) => addr.addrTypeKey === question.consumerKey
    );

    if (address) {
      switch (question.attribute) {
        case AddressFields.ADDRESS_NAME:
          return !isEmptyOrNullString(address.addrName) ? address.addrName : '';
        case AddressFields.ADDRESS_LINE_1:
          return !isEmptyOrNullString(address.addrLn1) ? address.addrLn1 : '';
        case AddressFields.ADDRESS_LINE_2:
          return !isEmptyOrNullString(address.addrLn2) ? address.addrLn2 : '';
        case AddressFields.CITY:
          return !isEmptyOrNullString(address.city) ? address.city : '';
        case AddressFields.COUNTRY:
          return !isEmptyOrNullString(address.country) ? address.country : '';
        case AddressFields.STATE:
          return !isEmptyOrNullString(address.state) ? address.state : '';
        case AddressFields.ZIP_CODE:
          return !isEmptyOrNullString(address.zip) ? address.zip : '';
        case AddressFields.PHONE_NUMBER:
          return !isEmptyOrNullString(address.addrPhone) ? address.addrPhone : '';
        case AddressFields.EMAIL:
          return !isEmptyOrNullString(address.email) ? address.email : '';
        default:
          break;
      }
    } else {
      return '';
    }
  }

  addDataTypeValidator(question: QuestionTextbox, validators: ValidatorFn[]): void {
    const dataType: string = question.dataType ? question.dataType.toLowerCase() : null;
    const dataTypeValidator: ValidatorFn = this._dataTypesValidators[dataType];

    if (dataTypeValidator) {
      validators.push(dataTypeValidator);
    }
  }

  mapToAddressTypeGroup(question: QuestionBase): QuestionBase[] {
    if (!(question instanceof QuestionAddressTypeGroup)) {
      return [].concat(question);
    }

    const questions: QuestionBase[] = [];
    questions.push(new QuestionHeader({
      type: 'header',
      label: question.label,
      subtype: 'h3',
    }));

    question.values.forEach((field, index) => {
      if (field.selected) {
        questions.push(new QuestionTextbox({
          name: `text-${question.addressTypeId}-${index}`,
          required: question.required,
          type: 'text',
          attribute: field.label,
          consumerKey: question.addressTypeId,
          facilityKey: null,
          label: field.label,
          preferenceKey: null,
          subtype: 'text',
          readonly: question.readonly,
          dataType: 'String',
          source: question.source
        }));
      }
    });

    return questions;
  }

  private _mapToQuestions(questions): QuestionBase[] {
    return questions
      .map((question) => {
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
        } else if ((question as QuestionRoommatePreference).roommateSelection) {
          return new QuestionRoommatePreference(question);
        } else if ((question as QuestionWaitingListRequest).facilitySelection
          || (question as QuestionWaitingListRequest).attributeSelection) {
            return new QuestionWaitingListRequest(question);
        } else if ((question as QuestionContractDetails).source) {
          if ((question as QuestionContractDetails).source === QUESTIONS_SOURCES.CONTRACT_DETAILS) {
            if ((question as QuestionContractDetails).contractId === CONTRACT_DETAIL_KEYS.DATE_SIGNED) {
              return new QuestionDateSigned(question);
            } else {
              return new QuestionContractDetails(question);
            }
          } else if ((question as QuestionAddressTypeGroup).source === QUESTIONS_SOURCES.ADDRESS_TYPES) {
            return new QuestionAddressTypeGroup(question);
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
      if (question.source === facilitySources[i]) {
        return true;
      }
    }
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _sortByQuestionDateSigned(current: QuestionBase, next: QuestionBase): number {
    if (current instanceof QuestionDateSigned) {
      return 1;
    }

    return 0;
  }

  getRequiredValidator(question: QuestionFormControl): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (question.required) {
      validators.push(Validators.required);
    }
    return validators;
  }
}
