import { TestBed } from '@angular/core/testing';

import { HousingProxyService } from './housing-proxy.service';

describe('HousingProxyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HousingProxyService = TestBed.get(HousingProxyService);
    expect(service).toBeTruthy();
  });
});
