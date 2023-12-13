import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { UserNotificationsFacadeService } from '@core/facades/notifications/user-notifications.service';
import { Notification } from '@core/service/user-notification/user-notification-api.service';
import { RefresherCustomEvent, RefresherEventDetail } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { monthDayYear } from '@shared/constants/dateFormats.constant';
import { finalize, first } from 'rxjs';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';

export const aDayAgo = 24 * 60 * 60 * 1000;
export const aWeekAgo = 7 * aDayAgo;

@Component({
  selector: 'st-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  received = {
    today: this.translateService.instant('patron-ui.notifications.period.today'),
    yesterday: this.translateService.instant('patron-ui.notifications.period.yesterday'),
    pastWeek: this.translateService.instant('patron-ui.notifications.period.pastWeek'),
    pastMonth: this.translateService.instant('patron-ui.notifications.period.pastMonth'),
  };

  notificationGroups: NotificationGroup[] = [];

  constructor(
    private readonly translateService: TranslateService,
    private readonly userNotificationsFacadeService: UserNotificationsFacadeService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService
  ) {}

  ngOnInit() {
    this.fetchContentStrings();
    this.refreshNotifications();
  }

  hasPeriod(notifications: Notification[]) {
    return notifications.length > 0;
  }

  get notificationTitle() {
    return this.translateService.instant('patron-ui.notifications.title');
  }

  private groupNotificationsByPeriod(notifications: Notification[]) {
    const today = this.formatDate(new Date());
    const yesterday = this.formatDate(new Date(Date.now() - aDayAgo));
    const pastWeek = this.formatDate(new Date(Date.now() - aWeekAgo));
    const pastMonth = this.formatDate(
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate())
    );

    const groupedNotifications: { [key: string]: Notification[] } = {};

    notifications.forEach(notification => {
      let period = this.received.today;
      const notificationDate = this.formatDate(notification.insertTime);

      if (this.isWithin90Days(notificationDate)) {
        if (notificationDate === today) {
          period = this.received.today;
        } else if (notificationDate === yesterday) {
          period = this.received.yesterday;
        } else if (notificationDate >= pastWeek) {
          period = this.received.pastWeek;
        } else if (notificationDate >= pastMonth) {
          period = this.received.pastMonth;
        }

        if (!groupedNotifications[period]) {
          groupedNotifications[period] = [];
        }
        groupedNotifications[period].push(notification);
      }
    });

    this.notificationGroups = Object.keys(groupedNotifications).map(date => ({
      date,
      notifications: groupedNotifications[date],
    }));
  }

  private formatDate(date: Date): string {
    return formatDate(date, monthDayYear, 'en-US', 'UTC');
  }

  private isWithin90Days(date: string): boolean {
    const currentDate = new Date();
    const ninetyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 90));
    return date >= this.formatDate(ninetyDaysAgo);
  }

  private fetchContentStrings() {
    this.contentStringsFacadeService
      .fetchContentStrings$(CONTENT_STRINGS_DOMAINS.patronUi, CONTENT_STRINGS_CATEGORIES.notifications)
      .pipe(first())
      .subscribe();
  }

  refreshNotifications(event?: RefresherCustomEvent) {
    this.userNotificationsFacadeService.refreshNotifications();
    this.userNotificationsFacadeService.allNotifications$
      .pipe(
        first(),
        finalize(() => event.target?.complete())
      )
      .subscribe(notifications => {
        this.groupNotificationsByPeriod(notifications);
      });
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
  notifications: Notification[];
}
