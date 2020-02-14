import { TestBed } from '@angular/core/testing';

import { ObservableStorageService } from './observable-storage.service';

describe('ObservableStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObservableStorageService = TestBed.get(ObservableStorageService);
    expect(service).toBeTruthy();
  });
});
