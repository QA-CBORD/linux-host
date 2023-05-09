import { isDefined } from '@sections/housing/utils';

import { QuestionFormControl, QuestionFormControlOptions } from './question-form-control';

let counter = 0;

export interface QuestionContractDetailsOptions extends QuestionFormControlOptions {
  subtype?: string;
  source?: string;
  contractId?: string;
}

export class QuestionContractDetails extends QuestionFormControl implements QuestionContractDetailsOptions {
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
    this.source = options.source;
    this.contractId = options.contractId;
  }
}
