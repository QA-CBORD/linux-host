export interface QuestionBaseOptions {
  type?: string;
  subtype?: string;
  label?: string;
  name?: string;
  required?: boolean;
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
    this.subtype = options.subtype || options.type;
    this.label = options.label || '';
    this.name = options.name || '';
    this.required = !!options.required;
    this.attribute = options.attribute || '';
  }
}
