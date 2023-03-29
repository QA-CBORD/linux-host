import { isDefined } from '@sections/housing/utils';

import { QuestionFormControl } from '@sections/housing/questions/types/question-form-control';
import { QuestionContractDetailsOptions } from '@sections/housing/questions/types/question-contract-details';
import { QuestionTypes } from 'src/app/app.global';

export class QuestionDateSigned extends QuestionFormControl implements QuestionContractDetailsOptions {
  constructor(options: QuestionContractDetailsOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as QuestionContractDetailsOptions;
    }

    super(options);

    this.type = QuestionTypes.DATE_SIGNED;
  }
}
