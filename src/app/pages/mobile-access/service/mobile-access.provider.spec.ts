import { TestBed } from '@angular/core/testing';

import { MobileAccessProvider } from './mobile-access.provider';

describe('MobileAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MobileAccessProvider = TestBed.get(MobileAccessProvider);
    expect(service).toBeTruthy();
  });
});
