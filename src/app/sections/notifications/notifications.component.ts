import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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

  notifications: Notification[] = [
    { message: 'Notification 1', date: new Date(), icon: NotificationIcon.order },
    { message: 'Notification 2', date: new Date(), icon: NotificationIcon.reward },
    { message: 'Notification 3', date: new Date(Date.now() - 24 * 60 * 60 * 1000), icon: NotificationIcon.meal },
    { message: 'Notification 4', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), icon: NotificationIcon.order },
    {
      message: 'Notification 5',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      icon: NotificationIcon.photoUpload,
    },
    {
      message: 'Notification 6',
      date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
      icon: NotificationIcon.automaticDeposit,
    },
    {
      message: 'Notification 7',
      date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
      icon: NotificationIcon.guestDeposit,
    },
    {
      message: 'Notification 8',
      date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
      icon: NotificationIcon.lowBalance,
    },
    {
      message: 'Notification 9',
      date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
      icon: NotificationIcon.order,
    },
  ];

  notificationGroups: NotificationGroup[] = [];
  notificationTitle: string;

  constructor(private readonly translateService: TranslateService) {}

  ngOnInit() {
    this.groupNotifications();
    this.notificationTitle = this.translateService.instant('patron-ui.notifications.title');
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
    throw new Error('Method not implemented.');
  }

  canShowPeriod(notifications: Notification[]) {
    return notifications.length > 0;
  }
}

enum NotificationIcon {
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
  message: string;
  date: Date;
  icon?: NotificationIcon;
}

interface NotificationGroup {
  date: string;
  notifications: Notification[];
}
