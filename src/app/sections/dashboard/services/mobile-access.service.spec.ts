import { TestBed } from '@angular/core/testing';

import { MobileAccessService } from './mobile-access.service';

describe('MobileAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MobileAccessService = TestBed.get(MobileAccessService);
    expect(service).toBeTruthy();
  });
});
