import { TestBed } from '@angular/core/testing';

import { UserNotificationApiService } from './user-notification-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { simpleApiMethodAssert } from 'src/app/testing/helpers/api-helpers';

describe('UserNotificationApiService', () => {
  let service: UserNotificationApiService;
  let httpTestingController: HttpTestingController;
  const serviceURL = '/json/userNotification';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserNotificationApiService],
    });
    service = TestBed.inject(UserNotificationApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('makes createNotification calls', () => {
    let data = {
      id: 'notificationId',
      institutionId: 'institutionId',
      userId: 'userId',
      title: 'Notification Title',
      subtitle: 'Notification Subtitle',
      content: 'Notification Content',
      domain: 'Notification Domain',
      viewedDate: new Date(),
      dismissedDate: new Date(),
      insertTime: new Date(),
      isPinned: true,
    };
    simpleApiMethodAssert<UserNotificationApiService>(
      httpTestingController,
      service,
      'createNotification',
      [data],
      serviceURL
    );
  });

  it('makes retrieveAll calls', () => {
    simpleApiMethodAssert<UserNotificationApiService>(httpTestingController, service, 'retrieveAll', [], serviceURL);
  });
  it('makes retrive calls', () => {
    simpleApiMethodAssert<UserNotificationApiService>(httpTestingController, service, 'retrive', [], serviceURL);
  });
  it('makes markAsViewed calls', () => {
    simpleApiMethodAssert<UserNotificationApiService>(httpTestingController, service, 'markAsViewed', [], serviceURL);
  });
  it('makes markAsDismissed calls', () => {
    simpleApiMethodAssert<UserNotificationApiService>(httpTestingController, service, 'markAsDismissed', [], serviceURL);
  });
  it('makes getUnreadCount calls', () => {
    simpleApiMethodAssert<UserNotificationApiService>(httpTestingController, service, 'getUnreadCount', [], serviceURL);
  });
  it('makes markAllUserNotificationLogAsViewed calls', () => {
    simpleApiMethodAssert<UserNotificationApiService>(httpTestingController, service, 'markAllUserNotificationLogAsViewed', [], serviceURL);
  });
  it('makes markUserNotificationLogAsPinned calls', () => {
    simpleApiMethodAssert<UserNotificationApiService>(httpTestingController, service, 'markUserNotificationLogAsPinned', [], serviceURL);
  });
});
