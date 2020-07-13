import { TestBed } from '@angular/core/testing';
import { NativeStartupApiService } from './native-startup-api.service';

describe('NativeStartupApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NativeStartupApiService = TestBed.get(NativeStartupApiService);
    expect(service).toBeTruthy();
  });
});
