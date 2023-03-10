import { QuestionTextbox, QuestionTextboxOptions } from './question-textbox';

let counter = 0;

export class QuestionImageWorkOrder extends QuestionTextbox {
  constructor(options: QuestionTextboxOptions = {}) {
    super(options);

    this.type = options.type || 'IMAGE';
    this.subtype = options.subtype || 'IMAGE';
    this.name = options.name || `IMAGE-${counter++}`;
  }
}
