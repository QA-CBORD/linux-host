import { TestBed } from '@angular/core/testing';

import { SecureMessagingProvider } from './secure-messaging.provider';

describe('SecureMessagingProvider', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecureMessagingProvider = TestBed.get(SecureMessagingProvider);
    expect(service).toBeTruthy();
  });
});
