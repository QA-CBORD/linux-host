import { TestBed } from '@angular/core/testing';

import { CoordsService } from './coords.service';

describe('CoordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoordsService = TestBed.get(CoordsService);
    expect(service).toBeTruthy();
  });
});
