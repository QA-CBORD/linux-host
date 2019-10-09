import { TestBed } from '@angular/core/testing';

import { FavoriteMerhantsService } from './favorite-merhants.service';

describe('FavoriteMerhantsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavoriteMerhantsService = TestBed.get(FavoriteMerhantsService);
    expect(service).toBeTruthy();
  });
});
