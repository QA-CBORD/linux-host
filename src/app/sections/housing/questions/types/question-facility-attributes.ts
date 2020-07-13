import { isDefined } from '@sections/housing/utils';

import { QuestionFormControl, QuestionFormControlOptions } from './question-form-control';

let counter: number = 0;

export interface QuestionContractDetailsOptions extends QuestionFormControlOptions {
  subtype?: string;
  source?: string;
  contractId?: string;
}

export class QuestionFacilityAttributes extends QuestionFormControl implements QuestionContractDetailsOptions {
  subtype: string;
  source: string;
  contractId?: string;

  constructor(options: QuestionContractDetailsOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as QuestionContractDetailsOptions;
    }

    super(options);

    this.type = options.type || 'text';
    this.name = options.name || `text-${counter++}`;
    this.subtype = options.subtype || 'text';
    this.source = String(options.source);
    this.contractId = String(options.contractId);
  }
}
