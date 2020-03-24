import { isDefined } from '@sections/housing/utils';

import { QuestionBase, QuestionBaseOptions } from './question-base';

export interface QuestionParagraphOptions extends QuestionBaseOptions {
  subtype?: string;
}

export class QuestionBlockquote extends QuestionBase {
  subtype: string;

  constructor(options: QuestionParagraphOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as QuestionParagraphOptions;
    }

    super(options);

    this.subtype = options.subtype || 'blockquote';
  }
}
