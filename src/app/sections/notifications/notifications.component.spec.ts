import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationType, NotificationsComponent } from './notifications.component';
import { UserNotificationLogCategory } from '@core/service/user-notification/user-notification-api.service';

describe('NotificationListComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  const notifications  = [
    {
      title: 'Breakfast Express',
      content: 'Order #23424',
      date: new Date(),
      icon: NotificationType.order,
      domain: NotificationType.order,
      category: UserNotificationLogCategory.ORDERING,
      status: true,
    },
    {
      title: 'Reward Claimed',
      content: 'Contratulations you have reached level 5.',
      date: new Date(),
      icon: NotificationType.reward,
      domain: NotificationType.reward,
      category: UserNotificationLogCategory.ADMIN_NOTICE,
      status: true,
    },
    {
      title: 'Meal Plan',
      content: 'Your meal plan Meal Account has been succesful.',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      icon: NotificationType.meal,
      domain: NotificationType.meal,
      category: UserNotificationLogCategory.ADMIN_NOTICE,
    },
    {
      title: 'Breakfast Express',
      content: 'It is going great',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      icon: NotificationType.order,
      domain: NotificationType.order,
      category: UserNotificationLogCategory.ORDERING,
    },
    {
      title: 'Photo upload',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      icon: NotificationType.photoUpload,
      content: 'Your uploaded photo has been rejected.',
      domain: NotificationType.photoUpload,
      category: UserNotificationLogCategory.ADMIN_NOTICE,
    },
    {
      title: 'Automatic Deposit',
      date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
      icon: NotificationType.automaticDeposit,
      content: '$100 has been added to your Dining Dollars account.',
      domain: NotificationType.automaticDeposit,
      category: UserNotificationLogCategory.ORDERING,
    },
    {
      title: 'Guest Deposit Successful',
      date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
      icon: NotificationType.guestDeposit,
      content: 'A guest deposit of $100 was completed.',
      domain: NotificationType.guestDeposit,
      category: UserNotificationLogCategory.ORDERING,
    },
    {
      title: 'Low Balance',
      date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
      icon: NotificationType.lowBalance,
      content: 'Your Dinig Dollars account has low balance',
      domain: NotificationType.lowBalance,
      category: UserNotificationLogCategory.ORDERING,
    },
    {
      title: 'Breakfast Express',
      date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
      icon: NotificationType.walkOut,
      content: 'Order Number #334224',
      domain: NotificationType.walkOut,
      category: UserNotificationLogCategory.ORDERING,
    },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
