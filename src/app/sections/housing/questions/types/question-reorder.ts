import { QuestionFormControl, QuestionFormControlOptions } from './question-form-control';

export interface QuestionReorderOptions extends QuestionFormControlOptions {
  inline?: boolean;
  facilityPicker?: boolean;
  values?: QuestionReorderValue[];
  prefRank?: number;
}

export interface QuestionReorderValue {
  label: string;
  value: string;
  selected: boolean;
}

export class QuestionReorder extends QuestionFormControl implements QuestionReorderOptions {
  inline: boolean;
  facilityPicker: boolean;
  values: QuestionReorderValue[];
  prefRank: number;

  constructor(options: QuestionReorderOptions = {}) {
    super(options);

    this.inline = !!options.inline;
    this.facilityPicker = !!options.facilityPicker;
    this.values = options.values || [];
    this.prefRank = options.prefRank || 0;

    this.values = options.values || [];
  }
}
