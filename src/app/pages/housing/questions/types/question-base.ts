export interface QuestionBaseOptions {
  type?: string;
  label?: string;
  attribute?: string;
}

export class QuestionBase implements QuestionBaseOptions {
  type: string;
  subtype: string;
  label: string;
  name: string;
  required: boolean;
  attribute: string;

  constructor(options: QuestionBaseOptions = {}) {
    this.type = options.type;
    this.label = options.label || '';
    this.attribute = options.attribute || null;
  }
}
