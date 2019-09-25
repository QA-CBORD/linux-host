import { QuestionBase, QuestionBaseOptions } from './question-base';

let counter = 0;

export class QuestionDate extends QuestionBase {
  constructor(options: QuestionBaseOptions = {}) {
    super(options);

    this.name = options.name || `date-${counter++}`;
  }
}
