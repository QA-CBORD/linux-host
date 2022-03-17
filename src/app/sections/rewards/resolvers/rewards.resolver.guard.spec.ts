import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { RewardsResolverGuard } from './rewards.resolver.guard';

describe('Locations.ResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RewardsResolverGuard],
    });
  });

  it('should ...', inject([RewardsResolverGuard], (guard: RewardsResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
