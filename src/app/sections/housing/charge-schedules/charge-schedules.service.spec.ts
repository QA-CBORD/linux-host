import { TestBed } from '@angular/core/testing';
import { date } from 'faker/locale/en';

import { ChargeSchedulesService } from './charge-schedules.service';
import { ChargeSchedule, ChargeScheduleValue } from '@sections/housing/charge-schedules/charge-schedules.model';

fdescribe('ChargeSchedulesService', () => {
  let service: ChargeSchedulesService;
  let chargeScheduleValues: ChargeScheduleValue[];

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(ChargeSchedulesService);

    chargeScheduleValues = [
      new ChargeScheduleValue({
        label: 'Name',
        value: '0',
        selected: false,
      }),
      new ChargeScheduleValue({
        label: 'Start Date',
        value: '1',
        selected: true,
      }),
      new ChargeScheduleValue({
        label: 'End Date',
        value: '2',
        selected: true,
      }),
      new ChargeScheduleValue({
        label: 'Full Estimate',
        value: '3',
        selected: false,
      }),
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getChargeSchedules method', () => {
    it('should return an empty array if chargeSchedules is an empty array', () => {
      const result = service.getChargeSchedules([], []);

      expect(result).toEqual([]);
    });

    it('should return an array of arrays of ChargeScheduleValue', () => {
      const startDate: string = date.future();
      const endDate: string = date.future();
      const chargeSchedules: ChargeSchedule[] = [
        new ChargeSchedule({
          chargeScheduleName: '',
          linkedChargeScheduleStartDate: startDate,
          linkedChargeScheduleEndDate: endDate,
          active: false,
          fullChargeEstimate: 0,
          remainingChargeEstimate: 0,
          estimateReason: '',
          scheduleType: '',
          chargeAmount: 0,
        }),
      ];
      const expected: ChargeScheduleValue[][] = [
        [
          new ChargeScheduleValue({ label: 'Start Date', value: startDate }),
          new ChargeScheduleValue({ label: 'End Date', value: endDate }),
        ],
      ];

      const result: ChargeScheduleValue[][] = service.getChargeSchedules(chargeSchedules, chargeScheduleValues);

      expect(result).toEqual(expected);
    });
  });

  describe('getAvailableChargeScheduleValues method', () => {
    it('should return available fields', () => {
      const expected: ChargeScheduleValue[] = [
        new ChargeScheduleValue({ label: 'Start Date', value: 'linkedChargeScheduleStartDate' }),
        new ChargeScheduleValue({ label: 'End Date', value: 'linkedChargeScheduleEndDate' }),
      ];

      const result: ChargeScheduleValue[] = service.getAvailableChargeScheduleValues(chargeScheduleValues);

      expect(result).toEqual(expected);
    });
  });
});
