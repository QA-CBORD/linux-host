import { TestBed } from '@angular/core/testing';

import { ObservableSessionStorageService } from './observable-session-storage.service';

describe('ObservableSessionStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObservableSessionStorageService = TestBed.get(ObservableSessionStorageService);
    expect(service).toBeTruthy();
  });
});
