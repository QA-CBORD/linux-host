import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsComponent, aDayAgo, aWeekAgo } from './notifications.component';
import {
  UserNotificationApiService,
  Notification,
} from '@core/service/user-notification/user-notification-api.service';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { UserNotificationsFacadeService } from '@core/facades/notifications/user-notifications.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';

const notifications = [
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Reward Claimed',
    content: 'You have successfully claimed your reward! You have successfully deposited $10 into Meal Account.',
    domain: 'reward',
    category: 2,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-13T20:55:32.796+0000',
  },
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Reward Claimed',
    content: 'You have successfully claimed your reward! You have successfully deposited $10 into Meal Account.',
    domain: 'reward',
    category: 2,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-13T20:55:25.194+0000',
  },
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Reward Claimed',
    content: 'You have successfully claimed your reward! You have successfully deposited $10 into Meal Account.',
    domain: 'reward',
    category: 2,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-13T20:55:20.950+0000',
  },
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Reward Claimed',
    content: 'You have successfully claimed your reward! You have successfully deposited $10 into Meal Account.',
    domain: 'reward',
    category: 2,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-13T20:50:13.421+0000',
  },
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Reward Claimed',
    content: 'You have successfully claimed your reward! You have successfully deposited $10 into Meal Account.',
    domain: 'reward',
    category: 2,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-13T20:49:56.278+0000',
  },
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Reward Claimed',
    content: 'You have successfully claimed your reward! You have successfully deposited $15 into Meal Account.',
    domain: 'reward',
    category: 2,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-13T20:36:56.192+0000',
  },
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Reward Claimed',
    content: 'You have successfully claimed your reward! You have successfully deposited $15 into Meal Account.',
    domain: 'reward',
    category: 2,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-13T20:36:49.590+0000',
  },
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Breakfast Express',
    content: 'Your meal plan Meal Account has been succesful',
    domain: 'order',
    category: 2,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-13T20:34:49.409+0000',
  },
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Breakfast Express',
    content: 'Order #23425',
    domain: 'order',
    category: 1,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-13T18:01:56.617+0000',
  },
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Breakfast Express',
    content: 'Order #23425',
    domain: 'order',
    category: 1,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-13T18:01:47.176+0000',
  },
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Breakfast Express',
    content: 'Order Number #334224',
    domain: 'walk-out',
    category: 1,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-12T18:24:57.417+0000',
  },
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Guest Deposit Successful',
    content: 'A guest deposit of $100 was completed.',
    domain: 'guest-deposit',
    category: 1,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-12T18:24:57.308+0000',
  },
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Low Balance',
    content: 'Your Dinig Dollars account has low balance',
    domain: 'low-balance',
    category: 1,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-12T18:24:57.282+0000',
  },
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Breakfast Express',
    content: 'Order #23424',
    domain: 'order',
    category: 1,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-12T18:24:57.034+0000',
  },
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Reward Claimed',
    content: 'Contratulations you have reached level 5.',
    domain: 'reward',
    category: 3,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-12T18:24:56.896+0000',
  },
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Breakfast Express',
    content: 'It is going great',
    domain: 'order',
    category: 1,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-12T18:24:56.808+0000',
  },
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Photo upload',
    content: 'Your uploaded photo has been rejected.',
    domain: 'photo-upload',
    category: 3,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-12T18:24:56.754+0000',
  },
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Automatic Deposit',
    content: '$100 has been added to your Dining Dollars account.',
    domain: 'automatic-deposit',
    category: 1,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-12T18:24:56.716+0000',
  },
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Meal Plan',
    content: 'Your meal plan Meal Account has been succesful.',
    domain: 'meal',
    category: 3,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-12T18:24:56.666+0000',
  },
  {
    id: '',
    institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
    userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
    title: 'Low Balance',
    content: 'Your Dinig Dollars account has low balance',
    domain: 'low-balance',
    category: 1,
    viewedDate: null,
    dismissedDate: null,
    insertTime: '2023-12-12T18:24:13.477+0000',
  },
];

describe('NotificationListComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  const mockTranslateService = {
    instant: jest.fn(null),
  };

  const mockUserNotificationService = {
    allNotifications$: of(notifications),
    refreshNotifications: jest.fn(),
  };

  const mockUserContentStringsFacadeService = {
    fetchContentStrings$: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NotificationsComponent],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: UserNotificationsFacadeService, useValue: mockUserNotificationService },
        { provide: ContentStringsFacadeService, useValue: mockUserContentStringsFacadeService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should group the notifications by a period', () => {
    component['groupNotificationsByPeriod'](<Notification[]>(<unknown>notifications));
    expect(component.notificationGroups.length).toEqual(1);
  });

  it('should group the notifications by periods', () => {
    component.received.today = 'Today';
    component.received.yesterday = 'Yesterday';
    component.received.pastWeek = 'Past Week';
    component.received.pastMonth = 'Past Month';

    const today = component['formatDate'](new Date());
    const yesterday = component['formatDate'](new Date(Date.now() - aDayAgo));
    const pastWeek = component['formatDate'](new Date(Date.now() - aWeekAgo));
    const pastMonth = component['formatDate'](
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate())
    );
    notifications[0].insertTime = today;
    notifications[1].insertTime = yesterday;
    notifications[2].insertTime = pastWeek;
    notifications[3].insertTime = pastMonth;
    
    component['groupNotificationsByPeriod'](<Notification[]>(<unknown>notifications));
    expect(component.notificationGroups.length).toEqual(4);
  });
});
