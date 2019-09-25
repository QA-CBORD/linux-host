import { QuestionBase, QuestionBaseOptions } from './question-base';

export interface QuestionHeaderOptions extends QuestionBaseOptions {
  subtype?: string;
}

export class QuestionHeader extends QuestionBase {
  subtype: string;

  constructor(options: QuestionHeaderOptions = {}) {
    super(options);

    this.subtype = options.subtype || 'h3';
  }
}
