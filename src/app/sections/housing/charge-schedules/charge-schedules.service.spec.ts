import { TestBed } from '@angular/core/testing';
import { ChargeSchedulesService } from './charge-schedules.service';

describe('ChargeSchedulesService', () => {
  let service: ChargeSchedulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ChargeSchedulesService] });
    service = TestBed.inject(ChargeSchedulesService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
