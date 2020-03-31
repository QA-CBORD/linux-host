import { TestBed } from '@angular/core/testing';

import { FavoriteMerchantsFacadeService } from './favorite-merchants-facade.service';

describe('FavoriteMerchantIdsFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavoriteMerchantsFacadeService = TestBed.get(FavoriteMerchantsFacadeService);
    expect(service).toBeTruthy();
  });
});
