import { TestBed } from '@angular/core/testing';

import { UserNotificationsFacadeService } from './user-notifications.service';
import { UserNotificationApiService } from '@core/service/user-notification/user-notification-api.service';

describe('UserNotificationsService', () => {
  let service: UserNotificationsFacadeService;
  let mockUserNotificationApiService = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserNotificationApiService,
          useValue: mockUserNotificationApiService,
        },
      ],
    });
    service = TestBed.inject(UserNotificationsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
