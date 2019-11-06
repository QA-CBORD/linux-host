import { QuestionBase, QuestionBaseOptions } from './question-base';

export interface QuestionParagraphOptions extends QuestionBaseOptions {
  subtype?: string;
}

export class QuestionParagraph extends QuestionBase {
  subtype: string;

  constructor(options: QuestionParagraphOptions = {}) {
    super(options);

    this.subtype = options.subtype || 'p';
  }
}
