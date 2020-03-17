import { TestBed } from '@angular/core/testing';

import { FacilityAttributesService } from './facility-attributes.service';

describe('FacilityAttributesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacilityAttributesService = TestBed.get(FacilityAttributesService);
    expect(service).toBeTruthy();
  });
});
