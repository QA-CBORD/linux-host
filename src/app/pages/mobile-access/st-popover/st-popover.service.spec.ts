import { TestBed } from '@angular/core/testing';

import { StPopoverService } from './st-popover.service';

describe('StPopoverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StPopoverService = TestBed.get(StPopoverService);
    expect(service).toBeTruthy();
  });
});
