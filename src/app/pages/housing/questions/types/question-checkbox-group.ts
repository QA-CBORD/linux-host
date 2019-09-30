import { QuestionBase, QuestionBaseOptions } from './question-base';

let counter = 0;

export interface QuestionCheckboxGroupValue {
  label: string;
  value: string;
  selected: boolean;
}

export interface QuestionCheckboxGroupOptions extends QuestionBaseOptions {
  values?: QuestionCheckboxGroupValue[];
}

export class QuestionCheckboxGroup extends QuestionBase {
  values: QuestionCheckboxGroupValue[];

  constructor(options: QuestionCheckboxGroupOptions = {}) {
    super(options);

    this.name = options.name || `checkbox-group-${counter++}`;
    this.values = options.values || [];
  }
}
