import { QuestionFormControl, QuestionFormControlOptions } from './question-form-control';

let counter = 0;

export interface QuestionTextboxOptions extends QuestionFormControlOptions {
  subtype?: string;
}

export class QuestionTextbox extends QuestionFormControl implements QuestionTextboxOptions {
  subtype: string;

  constructor(options: QuestionTextboxOptions = {}) {
    super(options);

    this.type = options.type || 'text';
    this.name = options.name || `text-${counter++}`;
    this.subtype = options.subtype || 'text';
  }
}
