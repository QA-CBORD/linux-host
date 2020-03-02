import { TestBed } from '@angular/core/testing';

import { ScanCardResolverService } from './scan-card-resolver.service';

describe('ScanCardResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScanCardResolverService = TestBed.get(ScanCardResolverService);
    expect(service).toBeTruthy();
  });
});
