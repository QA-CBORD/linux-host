import { QuestionTextbox, QuestionTextboxOptions } from './question-textbox';

let counter = 0;

export class QuestionTextarea extends QuestionTextbox {
  constructor(options: QuestionTextboxOptions = {}) {
    super(options);

    this.type = options.type || 'textarea';
    this.subtype = options.subtype || 'textarea';
    this.name = options.name || `textarea-${counter++}`;
  }
}
