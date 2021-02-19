import { isDefined } from '@sections/housing/utils';

import { QuestionFormControl, QuestionFormControlOptions } from './question-form-control';

let counter: number = 0;

export interface QuestionNonAssignmentDetailsOptions extends QuestionFormControlOptions {
  subtype?: string;
  source?: string;
  assetTypeId?: string;
}

export class QuestionNonAssignmentDetails extends QuestionFormControl implements QuestionNonAssignmentDetailsOptions {
    subtype: string;
    source: string;
    assetTypeId: string;
  
    constructor(options: QuestionNonAssignmentDetailsOptions) {
      if (!isDefined(options) || typeof options !== 'object') {
        options = {} as QuestionNonAssignmentDetailsOptions;
      }
  
      super(options);
  
      this.type = options.type || 'text';
      this.name = options.name || `text-${counter++}`;
      this.subtype = options.subtype || 'text';
      this.source = String(options.source);
      this.assetTypeId = String(options.assetTypeId);
    }
  }