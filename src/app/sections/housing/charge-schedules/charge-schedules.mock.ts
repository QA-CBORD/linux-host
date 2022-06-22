import { date, commerce, random, lorem } from 'faker/locale/en';

import { ChargeSchedule } from '@sections/housing/charge-schedules/charge-schedules.model';

export function generateChargeSchedule(_: any, index: number): ChargeSchedule {
  const chargeScheduleName: string = commerce.productName();
  const linkedChargeScheduleStartDate: string = date.past();
  const linkedChargeScheduleEndDate: string = date.past();
  const active: boolean = index % 2 === 0;
  const fullChargeEstimate: number = random.number(100);
  const remainingChargeEstimate: number = random.number({ min: 100, max: 200 });
  const estimateReason: string = lorem.words(3);
  const scheduleType: string = lorem.words(2);
  const chargeAmount: number = random.number({ min: 200, max: 300 });

  return new ChargeSchedule({
    chargeScheduleName,
    linkedChargeScheduleStartDate,
    linkedChargeScheduleEndDate,
    active,
    fullChargeEstimate,
    remainingChargeEstimate,
    estimateReason,
    scheduleType,
    chargeAmount,
  });
}

export function generateChargeSchedules(amount = 3): ChargeSchedule[] {
  // eslint-disable-next-line prefer-spread
  return Array.apply(null, Array(amount)).map(generateChargeSchedule);
}
