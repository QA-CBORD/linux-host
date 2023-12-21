import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Notification, NotificationCategory } from '@core/service/user-notification/user-notification-api.service';
import { monthDayYear, hourMinTime } from '@shared/constants/dateFormats.constant';
import { DatePipe, formatDate } from '@angular/common';

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

  constructor(private datePipe: DatePipe) {}

  formattedDate(insertTime: Date): string {
    return this.isToday(insertTime)
      ? this.datePipe.transform(insertTime, hourMinTime)
      : this.datePipe.transform(insertTime, monthDayYear + ', ' + hourMinTime);
  }

  hasSubtitle(notification: Notification) {
    return notification.subtitle && notification.category === NotificationCategory.order;
  }

  getAvatar(category: NotificationCategory) {
    return this.notificationIcon[category];
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return this.formatDate(date) === this.formatDate(today);
  }

  private formatDate(today: Date) {
    return formatDate(today, monthDayYear, 'en-US', 'UTC');
  }
}
