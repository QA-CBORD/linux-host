import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Notification } from '@core/service/user-notification/user-notification-api.service';
import { monthDayYear, hourMinTime } from '@shared/constants/dateFormats.constant';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'st-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  @Input() group: Notification[];
  dateFormat = monthDayYear;
  timeFormat = hourMinTime;

  constructor(private datePipe: DatePipe) {}

  formattedDate(insertTime: Date): string {
    return this.isToday(insertTime)
      ? this.datePipe.transform(insertTime, hourMinTime)
      : this.datePipe.transform(insertTime, monthDayYear + ', ' + hourMinTime);
  }

  hasSubtitle(notification: Notification) {
      return notification.subtitle && notification.category === 1;
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return formatDate(date, monthDayYear, 'en-US', 'UTC') === formatDate(today, monthDayYear, 'en-US', 'UTC');
  }
}
