import { TestBed } from '@angular/core/testing';
import { date } from 'faker/locale/en';

import { ChargeSchedulesService } from './charge-schedules.service';
import { ChargeSchedule, ChargeScheduleValue } from '@sections/housing/charge-schedules/charge-schedules.model';

// fdescribe('ChargeSchedulesService', () => {
//   let service: ChargeSchedulesService;
//   let chargeScheduleValues: ChargeScheduleValue[];
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//
//     service = TestBed.get(ChargeSchedulesService);
//
//     chargeScheduleValues = [
//       new ChargeScheduleValue({
//         label: 'Name',
//         value: '0',
//         selected: false,
//         type: 'string',
//       }),
//       new ChargeScheduleValue({
//         label: 'Start Date',
//         value: '1',
//         selected: true,
//         type: 'date',
//       }),
//       new ChargeScheduleValue({
//         label: 'End Date',
//         value: '2',
//         selected: true,
//         type: 'date',
//       }),
//       new ChargeScheduleValue({
//         label: 'Full Estimate',
//         value: '3',
//         selected: false,
//         type: 'currency',
//       }),
//     ];
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
//
//   describe('getChargeSchedules method', () => {
//     it('should return an empty array if chargeSchedules is an empty array', () => {
//       const result = service.getChargeSchedules([], []);
//
//       expect(result).toEqual([]);
//     });
//
//     it('should return an array of arrays of ChargeScheduleValue', () => {
//       const startDate: string = date.future().toString();
//       const endDate: string = date.future().toString();
//       const chargeSchedules: ChargeSchedule[] = [
//         new ChargeSchedule({
//           chargeScheduleName: '',
//           linkedChargeScheduleStartDate: startDate,
//           linkedChargeScheduleEndDate: endDate,
//           active: false,
//           fullChargeEstimate: 0,
//           remainingChargeEstimate: 0,
//           estimateReason: '',
//           scheduleType: '',
//           chargeAmount: 0,
//         }),
//       ];
//       const expected: ChargeScheduleValue[][] = [
//         [
//           new ChargeScheduleValue({ label: 'Start Date', value: startDate, type: 'date' }),
//           new ChargeScheduleValue({ label: 'End Date', value: endDate, type: 'date' }),
//         ],
//       ];
//
//       const result: ChargeScheduleValue[][] = service.getChargeSchedules(chargeSchedules, chargeScheduleValues);
//
//       expect(result).toEqual(expected);
//     });
//   });
//
//   describe('getAvailableChargeScheduleValues method', () => {
//     it('should return available fields', () => {
//       const expected: ChargeScheduleValue[] = [
//         new ChargeScheduleValue({ label: 'Start Date', value: 'linkedChargeScheduleStartDate', type: 'date' }),
//         new ChargeScheduleValue({ label: 'End Date', value: 'linkedChargeScheduleEndDate', type: 'date' }),
//       ];
//
//       const result: ChargeScheduleValue[] = service.getAvailableChargeScheduleValues(chargeScheduleValues);
//
//       expect(result).toEqual(expected);
//     });
//   });
// });
