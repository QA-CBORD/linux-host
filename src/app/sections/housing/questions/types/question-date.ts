import { QuestionFormControl, QuestionFormControlOptions } from './question-form-control';

let counter = 0;

export class QuestionDate extends QuestionFormControl implements QuestionFormControlOptions {
  constructor(options: QuestionFormControlOptions = {}) {
    super(options);

    this.name = options.name || `date-${counter++}`;
  }
}
