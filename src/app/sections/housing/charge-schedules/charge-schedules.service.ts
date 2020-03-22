import { Injectable } from '@angular/core';

import {
  ChargeSchedule,
  ChargeScheduleFields,
  ChargeScheduleFieldsMap,
  ChargeScheduleOptions,
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
  ): ChargeScheduleOptions[] {
    if (!chargeSchedules.length) {
      return [];
    }

    const availableFields: any = chargeScheduleValues
      .filter((value: ChargeScheduleValue) => value.selected)
      .map((value: ChargeScheduleValue) => ChargeScheduleFields[parseInt(value.value, 10)]);
    // .reduce((accumulator: ChargeScheduleFieldsMap, current: ChargeScheduleFields) => {
    //   return { ...accumulator, [ChargeScheduleFields[current]]: current };
    // }, {});

    return [];
  }
}
