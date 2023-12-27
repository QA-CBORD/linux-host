import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Notification, NotificationCategory } from '@core/service/user-notification/user-notification-api.service';
import { monthDayYear, hourMinTime } from '@shared/constants/dateFormats.constant';
import { DatePipe, formatDate } from '@angular/common';
import { A_DAY_AGO } from '../notifications.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'st-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  @Input() notifications: Notification[];
  dateFormat = monthDayYear;
  timeFormat = hourMinTime;

  notificationIcon: { [key: number]: string } = {
    [NotificationCategory.order]: 'order',
    [NotificationCategory.account]: 'account',
    [NotificationCategory.adminNotice]: 'admin-notice',
    [NotificationCategory.meal]: 'meal',
    [NotificationCategory.reward]: 'reward',
    [NotificationCategory.photoUpload]: 'photo-upload',
    [NotificationCategory.automaticDeposit]: 'automatic-deposit',
    [NotificationCategory.lowBalance]: 'low-balance',
    [NotificationCategory.guestDeposit]: 'guest-deposit',
    [NotificationCategory.walkOut]: 'walk-out',
  };

  constructor(private datePipe: DatePipe, private readonly translateService: TranslateService) {}

  formattedDate(insertTime: Date): string {
    return this.isToday(insertTime)
      ? this.datePipe.transform(insertTime, hourMinTime)
      : this.isYesterday(insertTime)
      ? this.translateService.instant('patron-ui.notifications.period_yesterday')
      : this.datePipe.transform(insertTime, monthDayYear + ', ' + hourMinTime);
  }

  hasSubtitle(notification: Notification) {
    return notification.subtitle && notification.category === NotificationCategory.order;
  }

  getAvatar(category: NotificationCategory) {
    return this.notificationIcon[category];
  }

  trackById(index: number, user: Notification): string {
    return user.id;
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return this.formatDate(date) === this.formatDate(today);
  }

  private isYesterday(date: Date): boolean {
    const yesterday = new Date(Date.now() - A_DAY_AGO);
    return this.formatDate(date) === this.formatDate(yesterday);
  }

  private formatDate(today: Date) {
    return formatDate(today, monthDayYear, 'en-US', 'UTC');
  }
}
