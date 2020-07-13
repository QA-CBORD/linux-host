import { TestBed } from '@angular/core/testing';

import { StorageStateService } from './storage-state.service';

describe('StorageStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageStateService = TestBed.get(StorageStateService);
    expect(service).toBeTruthy();
  });
});
