import { isDefined } from '../../utils';

import { ChargeScheduleValue } from '@sections/housing/charge-schedules/charge-schedules.model';
import { QuestionBase, QuestionBaseOptions } from '@sections/housing/questions/types/question-base';

export interface QuestionChargeScheduleBaseOptions extends QuestionBaseOptions {
  required: boolean;
  inline: boolean;
  name: string;
  other: boolean;
  values: ChargeScheduleValue[];
  consumerKey: number;
  chargeSchedule: boolean;
}

export class QuestionChargeScheduleBase extends QuestionBase implements QuestionChargeScheduleBaseOptions {
  required: boolean;
  inline: boolean;
  name: string;
  other: boolean;
  values: ChargeScheduleValue[];
  consumerKey: number;
  chargeSchedule: boolean;

  constructor(options: QuestionChargeScheduleBaseOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as QuestionChargeScheduleBaseOptions;
    }

    super(options);

    this.required = Boolean(options.required);
    this.inline = Boolean(options.inline);
    this.name = String(options.name);
    this.other = Boolean(options.other);
    this.values = Array.isArray(options.values)
      ? options.values.map((value) => new ChargeScheduleValue(value))
      : [];
    this.consumerKey = Number(options.consumerKey);
    this.chargeSchedule = Boolean(options.chargeSchedule);
  }
}

export interface QuestionChargeScheduleOptions extends QuestionBaseOptions {
  chargeSchedulesGroup?: ChargeScheduleValue[][];
}

export class QuestionChargeSchedule extends QuestionBase implements QuestionChargeScheduleOptions {
  chargeSchedulesGroup: ChargeScheduleValue[][];

  constructor(options: QuestionChargeScheduleOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as QuestionChargeScheduleBaseOptions;
    }

    super(options);

    this.type = 'charge-schedules';
    this.chargeSchedulesGroup = Array.isArray(options.chargeSchedulesGroup) ? options.chargeSchedulesGroup : [];
  }
}
