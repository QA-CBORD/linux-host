import { Injectable } from '@angular/core';

import {
  ChargeSchedule,
  ChargeScheduleFields,
  ChargeScheduleValue,
} from '@sections/housing/charge-schedules/charge-schedules.model';

@Injectable({
  providedIn: 'root',
})
export class ChargeSchedulesService {
  constructor() {}

  getChargeSchedules(
    chargeSchedules: ChargeSchedule[],
    chargeScheduleValues: ChargeScheduleValue[]
  ): ChargeScheduleValue[][] {
    if (!chargeSchedules.length) {
      return [];
    }

    const availableChargeScheduleValues: ChargeScheduleValue[] = this.getAvailableChargeScheduleValues(
      chargeScheduleValues
    );

    return chargeSchedules.map((chargeSchedule: ChargeSchedule) =>
      availableChargeScheduleValues.map((value: ChargeScheduleValue) => {
        return new ChargeScheduleValue({ label: value.label, value: chargeSchedule[value.value] });
      })
    );
  }

  getAvailableChargeScheduleValues(chargeScheduleValues: ChargeScheduleValue[]): ChargeScheduleValue[] {
    return chargeScheduleValues
      .filter((value: ChargeScheduleValue) => value.selected)
      .map((value: ChargeScheduleValue) => {
        const chargeScheduleField: string = ChargeScheduleFields[parseInt(value.value, 10)];

        return new ChargeScheduleValue({ label: value.label, value: chargeScheduleField });
      });
  }
}
