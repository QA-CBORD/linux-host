import { isDefined } from '@sections/housing/utils';

export enum ChargeScheduleFields {
  chargeScheduleName,
  linkedChargeScheduleStartDate,
  linkedChargeScheduleEndDate,
  fullChargeEstimate,
  remainingChargeEstimate,
  estimateReason,
  scheduleType,
  chargeAmount,
}

export interface ChargeScheduleValueOptions {
  label: string;
  value: string;
  selected?: boolean;
  type: string;
}

export class ChargeScheduleValue implements ChargeScheduleValueOptions {
  label: string;
  value: string;
  selected?: boolean;
  type: string;

  constructor(options: ChargeScheduleValueOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as ChargeScheduleValueOptions;
    }

    this.label = String(options.label);
    this.value = isDefined(options.value) ? String(options.value) : null;
    this.selected = Boolean(options.selected);
    this.type = options.type;
  }
}

export interface ChargeScheduleOptions {
  chargeScheduleName: string;
  linkedChargeScheduleStartDate: string;
  linkedChargeScheduleEndDate: string;
  active: boolean;
  fullChargeEstimate: number;
  remainingChargeEstimate: number;
  estimateReason: string;
  scheduleType: string;
  chargeAmount: number;
}

export class ChargeSchedule implements ChargeScheduleOptions {
  chargeScheduleName: string;
  linkedChargeScheduleStartDate: string;
  linkedChargeScheduleEndDate: string;
  active: boolean;
  fullChargeEstimate: number;
  remainingChargeEstimate: number;
  estimateReason: string;
  scheduleType: string;
  chargeAmount: number;

  constructor(options: ChargeScheduleOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as ChargeScheduleOptions;
    }

    this.chargeScheduleName = String(options.chargeScheduleName);
    this.linkedChargeScheduleStartDate = String(options.linkedChargeScheduleStartDate);
    this.linkedChargeScheduleEndDate = String(options.linkedChargeScheduleEndDate);
    this.active = Boolean(options.active);
    this.fullChargeEstimate = Number(options.fullChargeEstimate);
    this.remainingChargeEstimate = Number(options.remainingChargeEstimate);
    this.estimateReason = String(options.estimateReason);
    this.scheduleType = String(options.scheduleType);
    this.chargeAmount = Number(options.chargeAmount);
  }
}
