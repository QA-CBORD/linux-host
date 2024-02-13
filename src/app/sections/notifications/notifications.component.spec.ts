import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsComponent, A_DAY_AGO } from './notifications.component';
import { Notification } from '@core/service/user-notification/user-notification-api.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ChangeDetectorRef, EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserNotificationsFacadeService } from '@core/facades/notifications/user-notifications.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { IonItemSliding, ItemSlidingCustomEvent, Platform } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ToastService } from '@core/service/toast/toast.service';
import { NotificationBackgroundColorService } from './services/notification-background-color.service';

export const notifications = [
  {
    id: '7',
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
    id: '0',
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
    id: '0',
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
    id: '0',
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
    id: '0',
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
    id: '0',
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
    id: '0',
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
    id: '0',
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
    id: '0',
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
    id: '0',
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
    id: '0',
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
    id: '7',
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
    id: '0',
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
    id: '0',
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
    id: '0',
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
    id: '0',
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
    id: '0',
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
    id: '0',
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
    id: '0',
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
    id: '0',
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

const notificationStore = [{
  id: '7',
  institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
  userId: '35133e47-fe84-4980-ad40-6bd86b432a7d',
  title: 'Meal Plan',
  content: 'Your meal plan Meal Account has been succesful.',
  domain: 'meal',
  category: 3,
  viewedDate: null,
  dismissedDate: null,
  insertTime: '2023-12-12T18:24:56.666+0000',
}
];

describe('NotificationListComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  let sortingPriority: { [key: string]: number };

  const mockIonItem: IonItemSliding = {} as any;

  const mockUserNotificationsFacadeService = {
    allNotifications$: of(notifications),
    refreshNotifications: jest.fn(),
    markAllNotificationsAsViewed: jest.fn().mockReturnValue(of(true)),
    fetchNotificationsCount: jest.fn(),
    notificationsStored: notificationStore,
    dispatchNotificationsStored: jest.fn(),
    fetchNotifications: jest.fn().mockResolvedValue(true),
    deleteNotification: jest.fn(),
    markAsPinned: jest.fn(),
    markAsDismissed: jest.fn(),
  };



  const mockNotificationColoring = {
    setBackgroundColor: jest.fn(),
    resetList: jest.fn()
  };

  const mockToastService = {
    showToast: jest.fn(() => ({
      onDidDismiss: jest.fn().mockResolvedValue({ data: true }),
    })),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationsComponent],
      imports: [HttpClientTestingModule, TranslateModule],
      providers: [
        { provide: UserNotificationsFacadeService, useValue: mockUserNotificationsFacadeService },
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: NotificationBackgroundColorService, useValue: mockNotificationColoring },
        { provide: ToastService, useValue: mockToastService },
        LoadingService,
        Platform,
        ChangeDetectorRef
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    component['received'].today = 'Today';
    component['received'].yesterday = 'Yesterday';
    component['received'].previous = 'Previous';
    sortingPriority = {
      pinned: 0,
      [component['received'].today]: 1,
      [component['received'].yesterday]: 2,
      [component['received'].previous]: 3,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should group the notifications by a period', () => {
    component['groupNotificationsBySections'](<Notification[]>(<unknown>notifications), sortingPriority);
    expect(component.notificationsGroups.length).toEqual(1);
  });

  it('should group the notifications by periods', () => {
    const today = component['formatDate'](new Date());
    const yesterday = component['formatDate'](new Date(Date.now() - A_DAY_AGO));
    const pastWeek = component['formatDate'](new Date(Date.now() - A_DAY_AGO * 7));

    notifications[0].insertTime = today;
    notifications[1].insertTime = yesterday;
    notifications[2].insertTime = pastWeek;

    component['groupNotificationsBySections'](<Notification[]>(<unknown>notifications), sortingPriority);
    fixture.detectChanges();
    expect(component.notificationsGroups.length).toEqual(3);
  });

  it('should unpin a notification', async () => {
    await component.unpin({ notification: notifications[0] as any, slidingItem: mockIonItem });
    expect(mockUserNotificationsFacadeService.markAsPinned).toHaveBeenCalled();
    expect(mockUserNotificationsFacadeService.fetchNotifications).toHaveBeenCalled();
  });

  it('should pin a notification', async () => {
    await component.pin({ notification: notifications[0] as any, slidingItem: mockIonItem });
    expect(mockUserNotificationsFacadeService.markAsPinned).toHaveBeenCalled();
    expect(mockUserNotificationsFacadeService.fetchNotifications).toHaveBeenCalled();
  });

  it('should delete a notification', async () => {
    await component.delete({ notification: notifications[0] as any, slidingItem: mockIonItem });
    expect(mockUserNotificationsFacadeService.markAsDismissed).toHaveBeenCalled();
    expect(mockUserNotificationsFacadeService.fetchNotifications).toHaveBeenCalled();
  });

  it('should handle drag event', async () => {
    const mockEvent: ItemSlidingCustomEvent = {} as any;
    await component.drag(mockEvent);
    expect(mockNotificationColoring.setBackgroundColor).toHaveBeenCalled();
  });

  it('should show a toast with unpin status', async () => {
    await component.unpin({ notification: notifications[0] as any, slidingItem: mockIonItem });
    expect(mockToastService.showToast).toHaveBeenCalled();
  });

  it('should show a toast with delete status', async () => {
    await component.unpin({ notification: notifications[0] as any, slidingItem: mockIonItem });
    expect(mockToastService.showToast).toHaveBeenCalled();
  });

  it('should no show a toast with pin status', async () => {
    jest.resetAllMocks();
    await component.pin({ notification: notifications[0] as any, slidingItem: mockIonItem });
    expect(mockToastService.showToast).not.toHaveBeenCalled();
  });

  it('should refresh notifications', async () => {
    await component['refreshNotifications'](mockIonItem);
    expect(mockUserNotificationsFacadeService.fetchNotifications).toHaveBeenCalled();
  });
});

export class TranslateServiceStub {
  onLangChange = new EventEmitter();
  onTranslationChange = new EventEmitter();
  onDefaultLangChange = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }

  public instant(key: any): any {
    return key;
  }
}
