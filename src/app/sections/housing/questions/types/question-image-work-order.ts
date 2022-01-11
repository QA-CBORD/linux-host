import { QuestionTextbox, QuestionTextboxOptions } from './question-textbox';

let counter: number = 0;

export class QuestionImageWorkOrder extends QuestionTextbox {
  constructor(options: QuestionTextboxOptions = {}) {
    super(options);

    this.type = options.type || 'image-upload';
    this.subtype = options.subtype || 'image-upload';
    this.name = options.name || `image-upload-${counter++}`;
  }
}