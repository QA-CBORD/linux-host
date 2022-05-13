import { QuestionFormControl, QuestionFormControlOptions } from './question-form-control';

let counter = 0;

export interface QuestionCheckboxGroupValue {
  label: string;
  value: string;
  selected: boolean;
}

export interface QuestionCheckboxGroupOptions extends QuestionFormControlOptions {
  values?: QuestionCheckboxGroupValue[];
}

export class QuestionCheckboxGroup extends QuestionFormControl implements QuestionCheckboxGroupOptions {
  values: QuestionCheckboxGroupValue[];

  constructor(options: QuestionCheckboxGroupOptions = {}) {
    super(options);

    this.name = options.name || `checkbox-group-${counter++}`;
    this.values = options.values || [];
  }
}
