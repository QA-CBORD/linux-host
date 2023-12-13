import { formatDate } from '@angular/common';
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

        // console.log('list: ', notifications.list);
      });
  }

  canShowPeriod(notifications: UserNotificationLog[]) {
    return notifications.length > 0;
  }

  get notificationTitle() {
    return this.translateService.instant('patron-ui.notifications.title');
  }

  private groupNotifications(notifications: UserNotificationLog[]) {
    const today = this.formatDate(new Date());
    const yesterday = this.formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000));
    const pastWeek = this.formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    const pastMonth = this.formatDate(
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate())
    );

    const groupedNotifications: { [key: string]: UserNotificationLog[] } = {};

    for (const notification of notifications) {
      let key = this.notificationPeriod.today;
      const notificationDate = this.formatDate(notification.insertTime);

      if (notificationDate === today) {
        key = this.notificationPeriod.today;
      } else if (notificationDate === yesterday) {
        key = this.notificationPeriod.yesterday;
      } else if (notificationDate >= pastWeek) {
        key = this.notificationPeriod.pastWeek;
      } else if (notificationDate >= pastMonth) {
        key = this.notificationPeriod.pastMonth;
      }

      if (!groupedNotifications[key]) {
        groupedNotifications[key] = [];
      }
      groupedNotifications[key].push(notification);
    }

    this.notificationGroups = Object.keys(groupedNotifications).map(date => ({
      date,
      notifications: groupedNotifications[date],
    }));
  }

  private formatDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
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
