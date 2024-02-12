import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { Notification, NotificationCategory } from '@core/service/user-notification/user-notification-api.service';
import { hourMinTime, monthDayFullYear } from '@shared/constants/dateFormats.constant';
import { CommonModule, formatDate } from '@angular/common';
import { IonItemSliding, IonList, IonicModule, ItemSlidingCustomEvent } from '@ionic/angular';
import { NotificationsGroup } from '../notifications.component';
import { isSameDay } from '@core/utils/date-helper';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, TranslateModule],
  selector: 'st-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnChanges {
  @Input() notificationsGroups: NotificationsGroup[] = [];
  @Output() onPin = new EventEmitter<NotificationSliding>();
  @Output() onUnpin = new EventEmitter<NotificationSliding>();
  @Output() onDelete = new EventEmitter<NotificationSliding>();
  @Output() onDrag = new EventEmitter<ItemSlidingCustomEvent>();
  @ViewChild(IonList) private ionItem: IonList;

  private notificationIcon: { [key: number]: string } = {
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

  constructor(
  ) {}

  ngOnChanges() {
    this.ionItem?.closeSlidingItems();
  }

  notificationsFormatted(notifications: Notification[]) {
    return notifications.map(notification => ({
      ...notification,
      insertTime: this.formattedDate(notification.insertTime),
    }));
  }

  getAvatar(category: NotificationCategory) {
    return this.notificationIcon[category];
  }

  trackById(index: number) {
    return index;
  }

  trackByFn(index: number) {
    return index;
  }

  unpin(notification: Notification, ionItem: IonItemSliding) {
    this.onUnpin.emit({ notification, ionItem });
  }

  pin(notification: Notification, ionItem: IonItemSliding) {
    this.onPin.emit({ notification, ionItem });
  }

  delete(notification: Notification, ionItem: IonItemSliding) {
    this.onDelete.emit({ notification, ionItem });
  }

  drag(event: ItemSlidingCustomEvent) {
    this.onDrag.emit(event);
  }

  private formattedDate(insertTime: Date): string {
    const today = new Date(); 
    return isSameDay(insertTime, today)
      ? this.formatDate(insertTime, hourMinTime)
      : this.formatDate(insertTime, monthDayFullYear + ', ' + hourMinTime);
  }

  private formatDate(today: Date, format = monthDayFullYear) {
    return formatDate(today, format, 'en-US');
  }
}

export interface NotificationSliding {
  notification: Notification;
  ionItem: IonItemSliding;
}

