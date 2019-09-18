import { TestBed } from '@angular/core/testing';

import { FacilitylistService } from './facilitylist.service';

describe('FacilitylistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacilitylistService = TestBed.get(FacilitylistService);
    expect(service).toBeTruthy();
  });
});
