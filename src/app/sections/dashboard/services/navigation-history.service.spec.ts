import { TestBed } from '@angular/core/testing';

import { NavigationTrackerService } from './navigation-history.service';

describe('NavigationHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavigationTrackerService = TestBed.get(NavigationTrackerService);
    expect(service).toBeTruthy();
  });
});
