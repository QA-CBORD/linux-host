import { TestBed } from '@angular/core/testing';

import { AutoDepositApiService } from './auto-deposit-api-service.service';

describe('AutoDepositApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoDepositApiService = TestBed.get(AutoDepositApiService);
    expect(service).toBeTruthy();
  });
});
