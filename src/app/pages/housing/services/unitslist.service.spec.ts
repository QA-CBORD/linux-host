import { TestBed } from '@angular/core/testing';

import { UnitslistService } from './unitslist.service';

describe('UnitslistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnitslistService = TestBed.get(UnitslistService);
    expect(service).toBeTruthy();
  });
});
