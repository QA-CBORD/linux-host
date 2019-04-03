import { TestBed } from '@angular/core/testing';

import { ExceptionProvider } from './exception.provider';

describe('ExceptionProvider', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExceptionProvider = TestBed.get(ExceptionProvider);
    expect(service).toBeTruthy();
  });
});
