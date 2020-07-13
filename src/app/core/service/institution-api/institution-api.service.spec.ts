import { TestBed } from '@angular/core/testing';

import { InstitutionApiService } from './institution-api.service';

describe('InstitutionApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstitutionApiService = TestBed.get(InstitutionApiService);
    expect(service).toBeTruthy();
  });
});
