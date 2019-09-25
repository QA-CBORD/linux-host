import { QuestionBase, QuestionBaseOptions } from './question-base';

let counter = 0;

export interface QuestionTextboxOptions extends QuestionBaseOptions {
  subtype?: string;
}

export class QuestionTextbox extends QuestionBase {
  subtype: string;

  constructor(options: QuestionTextboxOptions = {}) {
    super(options);

    this.type = options.type || 'text';
    this.subtype = options.subtype || 'text';
    this.name = options.name || `text-${counter++}`;
  }
}
