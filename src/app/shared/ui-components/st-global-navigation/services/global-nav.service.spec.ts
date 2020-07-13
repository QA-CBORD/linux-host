import { TestBed } from '@angular/core/testing';

import { GlobalNavService } from './global-nav.service';

describe('GlobalNavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalNavService = TestBed.get(GlobalNavService);
    expect(service).toBeTruthy();
  });
});
