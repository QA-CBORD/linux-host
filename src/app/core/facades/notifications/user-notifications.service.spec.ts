import { TestBed } from '@angular/core/testing';

import { UserNotificationsFacadeService } from './user-notifications.service';

describe('UserNotificationsService', () => {
  let service: UserNotificationsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserNotificationsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
