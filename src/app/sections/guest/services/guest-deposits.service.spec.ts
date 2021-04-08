import { TestBed } from '@angular/core/testing';

import { GuestDepositsService } from './guest-deposits.service';

describe('GuestDepositsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuestDepositsService = TestBed.get(GuestDepositsService);
    expect(service).toBeTruthy();
  });
});
