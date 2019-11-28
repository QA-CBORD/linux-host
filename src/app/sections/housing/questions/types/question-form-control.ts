import { QuestionBase, QuestionBaseOptions } from './question-base';

export interface QuestionFormControlOptions extends QuestionBaseOptions {
  name?: string;
  required?: boolean;
  consumerKey?: number;
  preferenceKey?: number;
  facilityKey?: number;
}

export class QuestionFormControl extends QuestionBase implements QuestionFormControlOptions {
  name: string;
  required: boolean;
  consumerKey: number;
  preferenceKey: number;
  facilityKey: number;

  constructor(options: QuestionFormControlOptions = {}) {
    super(options);

    this.name = options.name;
    this.required = !!options.required;
    this.consumerKey = options.consumerKey >= 0 ? options.consumerKey : null;
    this.preferenceKey = options.preferenceKey >= 0 ? options.preferenceKey : null;
    this.facilityKey = options.facilityKey >= 0 ? options.facilityKey : null;
  }
}
