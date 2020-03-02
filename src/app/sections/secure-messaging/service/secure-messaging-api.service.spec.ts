import { TestBed } from '@angular/core/testing';

import { SecureMessagingApiService } from './secure-messaging-api.service';

describe('SecureMessagingApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecureMessagingApiService = TestBed.get(SecureMessagingApiService);
    expect(service).toBeTruthy();
  });
});
