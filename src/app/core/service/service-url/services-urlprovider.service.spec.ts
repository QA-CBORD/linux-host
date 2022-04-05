import { TestBed } from '@angular/core/testing';

import { ServicesURLProviderService } from './services-urlprovider.service';

describe('ServiceURLProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicesURLProviderService = TestBed.get(ServicesURLProviderService);
    expect(service).toBeTruthy();
  });
});
