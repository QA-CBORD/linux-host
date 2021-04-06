import { TestBed } from '@angular/core/testing';

import { USAePayService } from './usaepayservice.service';

describe('UsaepayserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: USAePayService = TestBed.get(USAePayService);
    expect(service).toBeTruthy();
  });
});
