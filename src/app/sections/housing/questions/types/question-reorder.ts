import { define } from '../../utils';

import { QuestionFormControl, QuestionFormControlOptions } from './question-form-control';

import { PatronPreference } from '@sections/housing/applications/applications.model';

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

  static sort(
    preferences: PatronPreference[],
    current: QuestionReorderValue,
    next: QuestionReorderValue,
    length: number
  ): number {
    let currentIndex: number = preferences.findIndex(
      (preference: PatronPreference) => preference.facilityKey === current.facilityKey
    );
    let nextIndex: number = preferences.findIndex(
      (preference: PatronPreference) => preference.facilityKey === next.facilityKey
    );

    if (currentIndex === -1) {
      currentIndex = length;
    }

    if (nextIndex === -1) {
      nextIndex = length;
    }

    return currentIndex - nextIndex;
  }
}
