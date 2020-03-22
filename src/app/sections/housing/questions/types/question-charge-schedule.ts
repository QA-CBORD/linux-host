import { isDefined } from '../../utils';

import { QuestionFormControl, QuestionFormControlOptions } from './question-form-control';
import { ChargeScheduleValue } from '@sections/housing/charge-schedules/charge-schedules.model';

export interface QuestionChargeScheduleValueOptions {
  label?: string;
  value?: string;
  selected?: boolean;
}

export class QuestionChargeScheduleValue implements ChargeScheduleValue {
  label: string;
  value: string;
  selected: boolean;

  constructor(options: QuestionChargeScheduleValueOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as QuestionChargeScheduleValueOptions;
    }

    this.label = String(options.label);
    this.value = String(options.value);
    this.selected = Boolean(options.selected);
  }
}

export interface QuestionChargeScheduleOptions extends QuestionFormControlOptions {
  inline?: boolean;
  chargeSchedule?: boolean;
  values?: ChargeScheduleValue[];
}

export class QuestionChargeSchedule extends QuestionFormControl implements QuestionChargeScheduleOptions {
  inline: boolean;
  chargeSchedule: boolean;
  values: ChargeScheduleValue[];

  constructor(options: QuestionChargeScheduleOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as QuestionChargeScheduleOptions;
    }

    super(options);

    this.inline = Boolean(options.inline);
    this.chargeSchedule = Boolean(options.chargeSchedule);
    this.values = Array.isArray(options.values)
      ? options.values.map((value: any) => new ChargeScheduleValue(value))
      : [];
  }
}
