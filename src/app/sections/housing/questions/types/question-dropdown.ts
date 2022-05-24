import { QuestionFormControl, QuestionFormControlOptions } from './question-form-control';

let counter = 0;

export interface QuestionDropdownValue {
  label: string;
  value: string;
  selected?: boolean;
}

export interface QuestionDropdownOptions extends QuestionFormControlOptions {
  values?: QuestionDropdownValue[];
}

export class QuestionDropdown extends QuestionFormControl implements QuestionDropdownOptions {
  values: QuestionDropdownValue[];

  constructor(options: QuestionDropdownOptions = {}) {
    super(options);

    this.values = options.values || [];
    this.name = options.name || `select-${counter++}`;
  }
}
