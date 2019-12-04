import { QuestionBase, QuestionBaseOptions } from './question-base';

export interface QuestionFormControlOptions extends QuestionBaseOptions {
  name?: string;
  required?: boolean;
}

export class QuestionFormControl extends QuestionBase implements QuestionFormControlOptions {
  name: string;
  required: boolean;

  constructor(options: QuestionFormControlOptions = {}) {
    super(options);

    this.name = options.name;
    this.required = !!options.required;
  }
}
