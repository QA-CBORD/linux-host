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
        return new ChargeScheduleValue({ label: value.label, value: chargeSchedule[value.value], type: value.type });
      })
    );
  }

  getAvailableChargeScheduleValues(chargeScheduleValues: ChargeScheduleValue[]): ChargeScheduleValue[] {
    return chargeScheduleValues
      .filter((value: ChargeScheduleValue) => value.selected)
      .map((value: ChargeScheduleValue) => {
        const chargeScheduleFieldEnum = parseInt(value.value, 10);
        const chargeScheduleField: string = ChargeScheduleFields[chargeScheduleFieldEnum];
        const type = this.getChargeScheduleFieldType(chargeScheduleFieldEnum);
        const csValue = new ChargeScheduleValue({ label: value.label, value: chargeScheduleField, type: type });
        return csValue;
      });
  }

  getChargeScheduleFieldType(chargeScheduleField): string{
    switch (chargeScheduleField){
      case ChargeScheduleFields.chargeAmount:
      case ChargeScheduleFields.fullChargeEstimate:
      case ChargeScheduleFields.remainingChargeEstimate:
        return "currency";
      case ChargeScheduleFields.chargeScheduleName:
      case ChargeScheduleFields.estimateReason:
      case ChargeScheduleFields.scheduleType:
        return "string";
      case ChargeScheduleFields.linkedChargeScheduleEndDate:
      case ChargeScheduleFields.linkedChargeScheduleStartDate:
        return "date";
    }
  }
}
