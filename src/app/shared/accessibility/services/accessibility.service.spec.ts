import { TestBed } from '@angular/core/testing';

import { AccessibilityService } from './accessibility.service';

describe('AccessibilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessibilityService = TestBed.get(AccessibilityService);
    expect(service).toBeTruthy();
  });
});
