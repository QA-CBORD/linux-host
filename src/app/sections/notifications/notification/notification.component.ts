import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Notification, NotificationCategory } from '@core/service/user-notification/user-notification-api.service';
import { hourMinTime, monthDayFullYear } from '@shared/constants/dateFormats.constant';
import { DatePipe, formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { IonItemOptions, IonItemSliding, ItemSlidingCustomEvent } from '@ionic/angular';
import { UserNotificationsFacadeService } from '@core/facades/notifications/user-notifications.service';
import { NotificationGroup } from '../notifications.component';

@Component({
  selector: 'st-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {
  @Input() notificationGroups: NotificationGroup[] = [];
  @ViewChild(IonItemSliding) slidingItem: IonItemSliding;
  @ViewChild(IonItemOptions) itemOptions: IonItemOptions;

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

  constructor(
    private datePipe: DatePipe,
    private readonly translateService: TranslateService,
    private readonly userNotificationsFacadeService: UserNotificationsFacadeService
  ) {}

  ngOnInit(): void {
    console.log("groups? ", this.notificationGroups)
  }

  notificationsFormatted(group: Notification[]) {
    console.log("groups? ", this.notificationGroups)
    return group.map(notification => {

     //console.log("group: ", notification.isPinned)
      return {
        ...notification,
        insertTime: this.formattedDate(notification.insertTime),
      };
    });
  }

  getAvatar(category: NotificationCategory) {
    return this.notificationIcon[category];
  }

  trackById(user: Notification): string {
    return user.id;
  }

  trackByFn(index: number, value: Notification[]) {
    return index;
  }

  get notificationDelete() {
    return this.translateService.instant('patron-ui.notifications.delete');
  }

  get notificationPin() {
    return this.translateService.instant('patron-ui.notifications.pin');
  }

  async onSwipe(event: ItemSlidingCustomEvent, slidingItem: IonItemSliding, notification: Notification) {
    if (event.detail.side == 'start') {
      if (!notification.isPinned) {
        await this.userNotificationsFacadeService.markAsPinned(notification.id, true);
      } else {
        await this.userNotificationsFacadeService.markAsPinned(notification.id, false);
      }
    } else {
      await this.userNotificationsFacadeService.markAsDismissed(notification.id);
      await slidingItem.close();
    }

    await this.userNotificationsFacadeService.fetchNotifications();
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return this.formatDate(date) === this.formatDate(today);
  }

  private formattedDate(insertTime: Date): string {
    return this.isToday(insertTime)
      ? this.datePipe.transform(insertTime, hourMinTime)
      : this.datePipe.transform(insertTime, monthDayFullYear + ', ' + hourMinTime);
  }

  private formatDate(today: Date) {
    return formatDate(today, monthDayFullYear, 'en-US');
  }

  openPinned(slidingItem: IonItemSliding, isPinned: boolean) {
    if (isPinned) {
      slidingItem.open('start');
    }

    return true;
  }
}
