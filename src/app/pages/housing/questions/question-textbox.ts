import { QuestionBase, QuestionBaseOptions } from './question-base';

let counter = 0;

export interface QuestionTextboxOptions extends QuestionBaseOptions {
  name?: string;
  subtype?: string;
}

export class QuestionTextbox extends QuestionBase {
  name: string;
  type: string;

  constructor(options: QuestionTextboxOptions = {}) {
    super(options);

    this.type = options.type || 'text';
    this.name = options.name || `${counter++}`;
  }
}
