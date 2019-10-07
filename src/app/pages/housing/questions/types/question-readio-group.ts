import { QuestionBase, QuestionBaseOptions } from './question-base';

let counter = 0;

export interface QuestionRadioGroupValue {
  label: string;
  value: string;
  selected: boolean;
}

export interface QuestionRadioGroupOptions extends QuestionBaseOptions {
  values?: QuestionRadioGroupValue[];
}

export class QuestionRadioGroup extends QuestionBase {
  values: QuestionRadioGroupValue[];

  constructor(options: QuestionRadioGroupOptions = {}) {
    super(options);

    this.name = options.name || `radio-group-${counter++}`;
    this.values = options.values || [];
  }
}
