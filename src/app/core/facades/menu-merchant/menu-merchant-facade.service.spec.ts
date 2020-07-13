import { TestBed } from '@angular/core/testing';

import { MenuMerchantFacadeService } from './menu-merchant-facade.service';

describe('MenuMerchantFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuMerchantFacadeService = TestBed.get(MenuMerchantFacadeService);
    expect(service).toBeTruthy();
  });
});
