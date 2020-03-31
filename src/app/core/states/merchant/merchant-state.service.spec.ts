import { TestBed } from '@angular/core/testing';

import { MerchantStateService } from './merchant-state.service';

describe('MerchantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MerchantStateService = TestBed.get(MerchantStateService);
    expect(service).toBeTruthy();
  });
});
