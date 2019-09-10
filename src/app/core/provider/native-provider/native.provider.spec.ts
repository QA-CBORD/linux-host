import { TestBed } from '@angular/core/testing';

import { NativeProvider } from './native.provider';

describe('NativeProvider', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NativeProvider = TestBed.get(NativeProvider);
    expect(service).toBeTruthy();
  });
});
