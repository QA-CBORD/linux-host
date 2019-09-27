import { QuestionBase, QuestionBaseOptions } from './question-base';

export interface QuestionDropdownValue {
  label: string;
  value: string;
  selected?: boolean;
}

export interface QuestionDropdownOptions extends QuestionBaseOptions {
  values?: QuestionDropdownValue[];
}

export class QuestionDropdown extends QuestionBase {
  values: QuestionDropdownValue[];

  constructor(options: QuestionDropdownOptions = {}) {
    super(options);

    this.values = options.values || [];
  }
}
