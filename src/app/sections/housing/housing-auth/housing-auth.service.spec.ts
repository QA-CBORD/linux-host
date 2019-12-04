import { TestBed } from '@angular/core/testing';

import { HousingAuthService } from './housing-auth.service';

describe('HousingAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HousingAuthService = TestBed.get(HousingAuthService);
    expect(service).toBeTruthy();
  });
});
