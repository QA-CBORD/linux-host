import { TestBed } from '@angular/core/testing';

import { MerchantListService } from './merchant-list.service';

describe('MerchantListServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MerchantListService = TestBed.get(MerchantListService);
    expect(service).toBeTruthy();
  });
});
