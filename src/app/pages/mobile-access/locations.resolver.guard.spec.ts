import { TestBed, async, inject } from '@angular/core/testing';

import { LocationsResolverGuard } from './locations.resolver.guard';

describe('Locations.ResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationsResolverGuard],
    });
  });

  it('should ...', inject([LocationsResolverGuard], (guard: LocationsResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
