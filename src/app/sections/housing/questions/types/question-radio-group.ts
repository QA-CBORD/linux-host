import { QuestionFormControl, QuestionFormControlOptions } from './question-form-control';

let counter = 0;

export interface QuestionRadioGroupValue {
  label: string;
  value: string;
  selected: boolean;
}

export interface QuestionRadioGroupOptions extends QuestionFormControlOptions {
  values?: QuestionRadioGroupValue[];
}

export class QuestionRadioGroup extends QuestionFormControl implements QuestionRadioGroupOptions {
  values: QuestionRadioGroupValue[];

  constructor(options: QuestionRadioGroupOptions = {}) {
    super(options);

    this.name = options.name || `radio-group-${counter++}`;
    this.values = options.values || [];
  }
}
