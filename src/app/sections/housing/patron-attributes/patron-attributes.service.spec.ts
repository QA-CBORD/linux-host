import { TestBed } from '@angular/core/testing';

import { PatronAttributesService } from './patron-attributes.service';

describe('PatronAttributesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatronAttributesService = TestBed.get(PatronAttributesService);
    expect(service).toBeTruthy();
  });
});
