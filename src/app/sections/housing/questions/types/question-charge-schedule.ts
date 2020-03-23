import { isDefined } from '../../utils';

import { QuestionFormControl } from './question-form-control';
import { ChargeScheduleValue } from '@sections/housing/charge-schedules/charge-schedules.model';

export interface QuestionChargeScheduleOptions {
  type?: string;
  chargeSchedule?: boolean;
  values?: ChargeScheduleValue[];
}

export class QuestionChargeSchedule extends QuestionFormControl implements QuestionChargeScheduleOptions {
  type: string;
  chargeSchedule: boolean;
  values: ChargeScheduleValue[];
  chargeSchedulesGroup: ChargeScheduleValue[][];

  constructor(options: QuestionChargeScheduleOptions, chargeSchedulesGroup: ChargeScheduleValue[][]) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as QuestionChargeScheduleOptions;
    }

    super(options);

    this.type = 'charge-schedules';
    this.chargeSchedule = Boolean(options.chargeSchedule);
    this.values = Array.isArray(options.values) ? options.values : [];
    this.chargeSchedulesGroup = Array.isArray(chargeSchedulesGroup) ? chargeSchedulesGroup : [];
  }
}
