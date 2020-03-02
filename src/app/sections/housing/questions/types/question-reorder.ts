import { define } from '../../utils';

import { QuestionFormControl, QuestionFormControlOptions } from './question-form-control';

export interface QuestionReorderOptions extends QuestionFormControlOptions {
  inline?: boolean;
  facilityPicker?: boolean;
  values?: QuestionReorderValue[];
  prefRank?: number;
  PrefKeys?: QuestionReorderPreference[];
}

export interface QuestionReorderValue {
  label: string;
  value: string;
  selected: boolean;
  facilityKey?: number;
}

export interface QuestionReorderPreference {
  defaultRank: number;
  preferenceKey: number;
  active: boolean;
  name: string;
  preferenceType: string;
}

export class QuestionReorder extends QuestionFormControl implements QuestionReorderOptions {
  inline: boolean;
  facilityPicker: boolean;
  values: QuestionReorderValue[];
  prefRank: number;
  PrefKeys: QuestionReorderPreference[];

  constructor(options: QuestionReorderOptions = {}) {
    super(options);

    this.inline = define(options.inline, Boolean(options.inline));
    this.facilityPicker = define(options.facilityPicker, Boolean(options.facilityPicker));
    this.values = options.values || [];
    this.prefRank = define(options.prefRank, Number(options.prefRank));

    this.values = options.values || [];
    this.PrefKeys = options.PrefKeys || [];
  }
}
