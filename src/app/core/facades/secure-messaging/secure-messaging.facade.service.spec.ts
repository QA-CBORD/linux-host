import { TestBed } from '@angular/core/testing';

import { SecureMessagingFacadeService } from './secure-messaging.facade.service';

describe('SecureMesagingFacadeService', () => {
  let service: SecureMessagingFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecureMessagingFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
