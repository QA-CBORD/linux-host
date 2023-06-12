export interface QuestionBaseOptions {
  type?: string;
  label?: string;
  attribute?: string;
  buttonText?: string;
  action?: () => void;
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
  required?: boolean;
  action?: () => void;

  constructor(options: QuestionBaseOptions = {}) {
    this.type = options.type || '';
    this.label = options.label || '';
    this.attribute = options.attribute || null;
  }
}
