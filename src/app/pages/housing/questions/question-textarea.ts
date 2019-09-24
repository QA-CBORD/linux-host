import { QuestionTextbox, QuestionTextboxOptions } from './question-textbox';

export class QuestionTextarea extends QuestionTextbox {
  constructor(options: QuestionTextboxOptions = {}) {
    super(options);

    this.type = options.type || 'textarea';
  }
}
