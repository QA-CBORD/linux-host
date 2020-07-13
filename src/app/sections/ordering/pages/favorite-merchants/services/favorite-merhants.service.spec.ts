import { TestBed } from '@angular/core/testing';

import { FavoriteMerchantsService } from './favorite-merchants.service';

describe('FavoriteMerhantsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavoriteMerchantsService = TestBed.get(FavoriteMerchantsService);
    expect(service).toBeTruthy();
  });
});
