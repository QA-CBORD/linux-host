import { QuestionFormControl, QuestionFormControlOptions } from './question-form-control';

export interface QuestionReorderOptions extends QuestionFormControlOptions {
  inline?: boolean;
  facilityPicker?: boolean;
  values?: QuestionReorderValue[];
  preferenceCount?: number;
}

export class QuestionReorderValue {
  constructor(public label: string, public value: string, public selected?: boolean) {}
}

export class QuestionReorder extends QuestionFormControl implements QuestionReorderOptions {
  inline: boolean;
  facilityPicker: boolean;
  values: QuestionReorderValue[];
  preferenceCount: number;

  constructor(options: QuestionReorderOptions = {}) {
    super(options);

    this.inline = !!options.inline;
    this.facilityPicker = !!options.facilityPicker;
    this.values = options.values || [];
    this.preferenceCount = options.preferenceCount;

    options.values = options.values.map(
      (value: QuestionReorderValue) => new QuestionReorderValue(value.label, value.value, value.selected)
    );
  }
}
