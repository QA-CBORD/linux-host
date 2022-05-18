export interface QuestionBaseOptions {
  type?: string;
  label?: string;
  attribute?: string;
  buttonText?: string;
  action?: Function;
}

export interface QuestionBaseOptionValue {
  label: string;
  value: string;
  selected?: boolean;
}

export class QuestionBase implements QuestionBaseOptions {
  type: string;
  label: string;
  attribute: string;
  buttonText?: string;
  action?: Function;

  constructor(options: QuestionBaseOptions = {}) {
    this.type = options.type || '';
    this.label = options.label || '';
    this.attribute = options.attribute || null;
  }
}
