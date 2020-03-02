import { TestBed } from '@angular/core/testing';

import { SecureMessagingService } from './secure-messaging.service';

describe('SecureMessagingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecureMessagingService = TestBed.get(SecureMessagingService);
    expect(service).toBeTruthy();
  });
});
