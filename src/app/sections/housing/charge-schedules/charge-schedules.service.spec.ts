import { TestBed } from '@angular/core/testing';

import { ChargeSchedulesService } from './charge-schedules.service';

describe('ChargeSchedulesService', () => {
  let service: ChargeSchedulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(ChargeSchedulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array if chargeSchedules are empty array', () => {
    const result = service.getChargeSchedules([], []);

    expect(result).toEqual([]);
  });
});
