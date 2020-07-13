import { TestBed } from '@angular/core/testing';

import { RewardsApiService } from './rewards-api.service';

describe('RewardsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RewardsApiService = TestBed.get(RewardsApiService);
    expect(service).toBeTruthy();
  });
});
