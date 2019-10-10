import { TestBed } from '@angular/core/testing';

import { AutoDepositService } from './auto-deposit.service';

describe('AutoDepositService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoDepositService = TestBed.get(AutoDepositService);
    expect(service).toBeTruthy();
  });
});
