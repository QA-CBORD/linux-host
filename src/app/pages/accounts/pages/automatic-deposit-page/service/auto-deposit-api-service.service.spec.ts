import { TestBed } from '@angular/core/testing';

import { AutoDepositApiServiceService } from './auto-deposit-api-service.service';

describe('AutoDepositApiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoDepositApiServiceService = TestBed.get(AutoDepositApiServiceService);
    expect(service).toBeTruthy();
  });
});
