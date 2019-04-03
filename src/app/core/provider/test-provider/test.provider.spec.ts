import { TestBed } from '@angular/core/testing';

import { TestProvider } from './test.provider';

describe('TestProvider', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestProvider = TestBed.get(TestProvider);
    expect(service).toBeTruthy();
  });
});
