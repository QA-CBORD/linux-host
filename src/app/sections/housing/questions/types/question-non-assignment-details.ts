import { isDefined } from '@sections/housing/utils';

import { 
  QuestionFormControl,
  QuestionFormControlOptions
} from './question-form-control';
import {
  QuestionBase,
  QuestionBaseOptions
} from '@sections/housing/questions/types/question-base';
import { AssetTypeDetailValue } from '@sections/housing/non-assignments/non-assignments.model';

let counter: number = 0;

export interface QuestionAssetTypeDetailsBaseOptions extends QuestionBaseOptions {
  required: boolean;
  inline: boolean;
  name: string;
  other: boolean;
  values: AssetTypeDetailValue[];
  consumerKey: number;
  readonly: boolean;
  customName?: string;
  customMeals?: string;
  customDining?: string;
  customCost?: string;
}

export class QuestionAssetTypeDetailsBase extends QuestionBase implements QuestionAssetTypeDetailsBaseOptions {
  required: boolean;
  inline: boolean;
  name: string;
  other: boolean;
  values: AssetTypeDetailValue[];
  consumerKey: number;
  readonly: boolean;
  customName?: string;
  customMeals?: string;
  customDining?: string;
  customCost?: string;

  constructor(options: QuestionAssetTypeDetailsBaseOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as QuestionAssetTypeDetailsBaseOptions;
    }

    super(options);

    this.type = 'asset-types-group';
    this.name = String(options.name);
    this.values = Array.isArray(options.values)
      ? options.values.map((value: any) => new AssetTypeDetailValue(value))
      : [];
    this.readonly = Boolean(options.readonly);
    this.consumerKey = Number(options.consumerKey);
    this.inline = Boolean(options.inline);
    this.other = Boolean(options.other);
    this.required = Boolean(options.required);
    this.customName = String(options.customName);
    this.customMeals = String(options.customMeals);
    this.customDining = String(options.customDining);
    this.customCost = String(options.customCost);
  }
}

export interface QuestionNonAssignmentAssetTypeDetailsOptions extends QuestionFormControlOptions {
  assetTypeKey: number;
  name: string;
  numberOfUnits: number;
  cost: number;
  diningDollars: number;
  customName?: string;
  customMeals?: string;
  customDining?: string;
  customCost?: string;
}

export class QuestionNonAssignmentAssetTypeDetails extends QuestionFormControl implements QuestionNonAssignmentAssetTypeDetailsOptions {
  assetTypeKey: number;
  name: string;
  numberOfUnits: number;
  cost: number;
  diningDollars: number;
  customName?: string;
  customMeals?: string;
  customDining?: string;
  customCost?: string;

  constructor(options: QuestionNonAssignmentAssetTypeDetailsOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as QuestionNonAssignmentAssetTypeDetailsOptions;
    }

    super(options);

    this.type = options.type || 'text';
    this.assetTypeKey = Number(options.assetTypeKey);
    this.name = options.name || `text-${counter++}`;
    this.numberOfUnits = Number(options.numberOfUnits);
    this.cost = Number(options.cost);
    this.diningDollars = Number(options.diningDollars);
  }
}

export interface QuestionAssetTypeDetailsOptions extends QuestionFormControlOptions {
  assetTypes?: AssetTypeDetailValue[][];
}

export class QuestionAssetTypeDetails extends QuestionFormControl implements QuestionAssetTypeDetailsOptions {
  assetTypes: AssetTypeDetailValue[][];

  constructor(options: QuestionAssetTypeDetailsOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as QuestionAssetTypeDetailsOptions;
    }

    super(options);
    
    this.type = 'asset-types-group';
    this.name = `asset-types-group-${counter++}`;
    this.assetTypes = Array.isArray(options.assetTypes)
      ? options.assetTypes
      : [];
  }
}