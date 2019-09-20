import { TestBed } from '@angular/core/testing';

import { ApplicationlistService } from './applicationlist.service';

describe('ApplicationlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationlistService = TestBed.get(ApplicationlistService);
    expect(service).toBeTruthy();
  });
});
