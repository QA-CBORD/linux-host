import { QuestionBaseOptions } from './question-base';

let counter = 0;

export interface QuestionReorderOptions extends QuestionBaseOptions {
  required?: boolean;
  inline?: boolean;
  subtype?: string;
  name?: string;
  values?: QuestionReorderValue[];
  preferenceCount?: number;
}

export class QuestionReorderValue {
  constructor(public label: string, public value: string, public selected?: boolean) {}
}

export class QuestionReorder implements QuestionReorderOptions {
  required: boolean;
  inline: boolean;
  subtype: string;
  name: string;
  values: QuestionReorderValue[];
  preferenceCount: number;

  constructor(reorderOptions: QuestionReorderOptions = {}) {
    this.required = !!reorderOptions.required;
    this.inline = !!reorderOptions.inline;
    this.subtype = reorderOptions.subtype || '';
    this.name = reorderOptions.name || `reorder-${counter++}`;
    this.values = reorderOptions.values || [];
    this.preferenceCount = reorderOptions.preferenceCount;

    reorderOptions.values = reorderOptions.values.map(
      (value: QuestionReorderValue) => new QuestionReorderValue(value.label, value.value, value.selected)
    );
  }
}
