import { TestBed } from '@angular/core/testing';

import { SecureMessagingMainService } from './secure-messaging-main.service';

describe('SecureMessagingProvider', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecureMessagingMainService = TestBed.get(SecureMessagingMainService);
    expect(service).toBeTruthy();
  });
});
