import { Component, OnInit } from '@angular/core';
import {
  UserNotificationApiService,
  UserNotificationLogCategory,
} from '@core/service/user-notification/user-notification-api.service';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs';

@Component({
  selector: 'st-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notificationPeriod = {
    today: this.translateService.instant('patron-ui.notifications.period.today'),
    yesterday: this.translateService.instant('patron-ui.notifications.period.yesterday'),
    pastWeek: this.translateService.instant('patron-ui.notifications.period.pastWeek'),
    pastMonth: this.translateService.instant('patron-ui.notifications.period.pastMonth'),
  };

  //  with Rewards! See what is available to redeem within the Rewards tab.

  // ly changed to Dining Cash
  notifications: Notification[] = [
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

  notificationGroups: NotificationGroup[] = [];
  notificationTitle: string;

  constructor(
    private readonly translateService: TranslateService,
    private userNotificationApiService: UserNotificationApiService
  ) {}

  ngOnInit() {
    this.groupNotifications();
    this.notificationTitle = this.translateService.instant('patron-ui.notifications.title');

    for (let value of this.notifications) {
      // this.userNotificationApiService
      //   .createNotification({
      //     title: value.title,
      //     content: value.content,
      //     domain: value.domain,
      //     category: value.category,
      //   })
      //   .pipe(first())

        // .subscribe(value => {
        //   console.log('createNotification? ', value);
        // });
    }

    this.userNotificationApiService
      .retrieveAll()
      .pipe(first())
      .subscribe(value => {
        console.log('retrieveAll? ', value);
      });
  }

  groupNotifications() {
    const today = new Date().setHours(0, 0, 0, 0);
    const todayDate: Date = new Date();
    const yesterday = new Date(today - 24 * 60 * 60 * 1000);
    const pastWeek = new Date(today - 7 * 24 * 60 * 60 * 1000);
    const pastMonth = new Date(todayDate.getFullYear(), todayDate.getMonth() - 1, todayDate.getDate());

    this.notificationGroups = [
      {
        date: this.notificationPeriod.today,
        notifications: this.notifications.filter(notification => +notification.date >= today),
      },
      {
        date: this.notificationPeriod.yesterday,
        notifications: this.notifications.filter(
          notification => notification.date >= yesterday && +notification.date < today
        ),
      },
      {
        date: this.notificationPeriod.pastWeek,
        notifications: this.notifications.filter(
          notification => notification.date >= pastWeek && notification.date < yesterday
        ),
      },
      {
        date: this.notificationPeriod.pastMonth,
        notifications: this.notifications.filter(
          notification => notification.date >= pastMonth && notification.date < pastWeek
        ),
      },
    ];
  }

  onIonInfinite($event: any) {
    //throw new Error('Method not implemented.');
  }

  canShowPeriod(notifications: Notification[]) {
    return notifications.length > 0;
  }
}

enum NotificationType {
  order = 'order',
  meal = 'meal',
  reward = 'reward',
  photoUpload = 'photo-upload',
  automaticDeposit = 'automatic-deposit',
  lowBalance = 'low-balance',
  guestDeposit = 'guest-deposit',
  walkOut = 'walk-out',
}

interface Notification {
  title: string;
  content: string;
  category: UserNotificationLogCategory;
  domain: string;
  date: Date;
  icon?: NotificationType;
  status?: boolean;
}

interface NotificationGroup {
  date: string;
  notifications: Notification[];
}
