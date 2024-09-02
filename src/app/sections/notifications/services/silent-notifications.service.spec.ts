import { TestBed } from '@angular/core/testing';

import { SilentNotificationService } from './silent-notification.service';

describe('SilentNotificationsHandlerService', () => {
  let service: SilentNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SilentNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
