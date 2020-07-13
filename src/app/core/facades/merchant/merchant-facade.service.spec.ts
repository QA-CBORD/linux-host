import { TestBed } from '@angular/core/testing';

import { MerchantFacadeService } from './merchant-facade.service';

describe('MerchantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MerchantFacadeService = TestBed.get(MerchantFacadeService);
    expect(service).toBeTruthy();
  });
});
