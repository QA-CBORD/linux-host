import { TestBed } from '@angular/core/testing';
import { CommerceApiService } from './commerce-api.service';

describe('CommerceApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommerceApiService = TestBed.get(CommerceApiService);
    expect(service).toBeTruthy();
  });
});
