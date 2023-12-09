import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [
    { message: 'Notification 1', date: new Date() },
    { message: 'Notification 2', date: new Date() },
    { message: 'Notification 3', date: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    { message: 'Notification 4', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    { message: 'Notification 5', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { message: 'Notification 6', date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000) },
  ];

  notificationGroups: NotificationGroup[] = [];

  ngOnInit() {
    this.groupNotifications();
  }

  groupNotifications() {
    const today = new Date().setHours(0, 0, 0, 0);
    const todayDate: Date = new Date();
    const yesterday = new Date(today - 24 * 60 * 60 * 1000);
    const pastWeek = new Date(today - 7 * 24 * 60 * 60 * 1000);
    const pastMonth = new Date(todayDate.getFullYear(), todayDate.getMonth() - 1, todayDate.getDate());

    this.notificationGroups = [
      {
        date: NotificationDate.today,
        notifications: this.notifications.filter(notification => +notification.date >= today),
      },
      {
        date: NotificationDate.yesterday,
        notifications: this.notifications.filter(
          notification => notification.date >= yesterday && +notification.date < today
        ),
      },
      {
        date: NotificationDate.pastWeek,
        notifications: this.notifications.filter(
          notification => notification.date >= pastWeek && notification.date < yesterday
        ),
      },
      {
        date: NotificationDate.pastMonth,
        notifications: this.notifications.filter(
          notification => notification.date >= pastMonth && notification.date < pastWeek
        ),
      },
    ];
  }

  onIonInfinite($event: any) {
    throw new Error('Method not implemented.');
  }
}

enum NotificationDate {
  today = 'Today',
  yesterday = 'Yesterday',
  pastWeek = 'Past Week',
  pastMonth = 'Past month',
}

interface Notification {
  message: string;
  date: Date;
}

interface NotificationGroup {
  date: string;
  notifications: Notification[];
}
