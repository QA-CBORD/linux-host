import { Component, OnInit } from '@angular/core';
import {
  UserNotificationApiService,
  UserNotificationLog,
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

  notificationGroups: NotificationGroup[] = [];

  constructor(
    private readonly translateService: TranslateService,
    private readonly userNotificationApiService: UserNotificationApiService
  ) {}

  ngOnInit() {
    this.userNotificationApiService
      .retrieveAll()
      .pipe(first())
      .subscribe(notifications => {
        this.groupNotifications(notifications.list);
      });
  }

  canShowPeriod(notifications: UserNotificationLog[]) {
    return notifications.length > 0;
  }

  get notificationTitle() {
    return this.translateService.instant('patron-ui.notifications.title');
  }

  private groupNotifications(notification: UserNotificationLog[]) {
    const today = new Date().setHours(0, 0, 0, 0);
    const todayDate: Date = new Date();
    const yesterday = new Date(today - 24 * 60 * 60 * 1000);
    const pastWeek = new Date(today - 7 * 24 * 60 * 60 * 1000);
    const pastMonth = new Date(todayDate.getFullYear(), todayDate.getMonth() - 1, todayDate.getDate());

    this.notificationGroups = [
      {
        date: this.notificationPeriod.today,
        notifications: notification.filter(notification => notification.insertTime),
      },
      {
        date: this.notificationPeriod.yesterday,
        notifications: notification.filter(
          notification => notification.insertTime >= yesterday && +notification.insertTime < today
        ),
      },
      {
        date: this.notificationPeriod.pastWeek,
        notifications: notification.filter(
          notification => notification.insertTime >= pastWeek && notification.insertTime < yesterday
        ),
      },
      {
        date: this.notificationPeriod.pastMonth,
        notifications: notification.filter(
          notification => notification.insertTime >= pastMonth && notification.insertTime < pastWeek
        ),
      },
    ];

    console.log("groups: ", this.notificationGroups)
  }
}

export enum NotificationType {
  order = 'order',
  meal = 'meal',
  reward = 'reward',
  photoUpload = 'photo-upload',
  automaticDeposit = 'automatic-deposit',
  lowBalance = 'low-balance',
  guestDeposit = 'guest-deposit',
  walkOut = 'walk-out',
}

interface NotificationGroup {
  date: string;
  notifications: UserNotificationLog[];
}
