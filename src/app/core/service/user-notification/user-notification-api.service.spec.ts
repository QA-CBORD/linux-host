import { TestBed } from '@angular/core/testing';

import { UserNotificationApiService } from './user-notification-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserNotificationApiService', () => {
  let service: UserNotificationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserNotificationApiService],
    });
    service = TestBed.inject(UserNotificationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
