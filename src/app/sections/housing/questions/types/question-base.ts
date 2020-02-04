export interface QuestionBaseOptions {
  type?: string;
  label?: string;
  attribute?: string;
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

  constructor(options: QuestionBaseOptions = {}) {
    this.type = options.type || '';
    this.label = options.label || '';
    this.attribute = options.attribute || null;
  }
}
