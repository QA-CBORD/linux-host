import { ChangeDetectionStrategy, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Notification, NotificationCategory } from '@core/service/user-notification/user-notification-api.service';
import { hourMinTime, monthDayFullYear } from '@shared/constants/dateFormats.constant';
import { DatePipe, formatDate } from '@angular/common';
import { IonItemSliding, IonList, ItemSlidingCustomEvent } from '@ionic/angular';
import { UserNotificationsFacadeService } from '@core/facades/notifications/user-notifications.service';
import { NotificationGroup } from '../notifications.component';
import { ToastService } from '@core/service/toast/toast.service';
import { NotificationBackgroundColorService } from '../services/notification-background-color.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'st-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnChanges {
  @Input() notificationGroups: NotificationGroup[] = [];
  @ViewChild(IonList) ionItem: IonList;

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
    private readonly userNotificationsFacadeService: UserNotificationsFacadeService,
    private readonly notificationColoring: NotificationBackgroundColorService,
    private readonly toastService: ToastService
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

  async unpin(notification: Notification, ionItem: IonItemSliding) {
    const { data } = await this.showToast(true);
    if (data?.undo) return;
    await this.userNotificationsFacadeService.markAsPinned(notification, false);
    await this.refreshNotifications(ionItem);
  }

  async pin(notification: Notification, ionItem: IonItemSliding) {
    await this.userNotificationsFacadeService.markAsPinned(notification, true);
    await this.refreshNotifications(ionItem);
  }

  async delete(notification: Notification, ionItem: IonItemSliding) {
    const { data } = await this.showToast(false);
    if (data?.undo) return;
    await this.userNotificationsFacadeService.markAsDismissed(notification);
    await this.refreshNotifications(ionItem);
  }

  async onDrag(event: ItemSlidingCustomEvent) {
    this.notificationColoring.setBackgroundColor(event);
  }

  private async refreshNotifications(ionItem: IonItemSliding) {
    await this.userNotificationsFacadeService.fetchNotifications();
    await this.notificationColoring.resetList(ionItem);
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

  private async showToast(status: boolean) {
    const message = status
      ? this.translateService.instant('patron-ui.notifications.toast_message_unpinned')
      : this.translateService.instant('patron-ui.notifications.toast_message_deleted');
    const toast = await this.toastService.showToast({
      message,
      position: 'bottom',
      cssClass: 'toast-message-notification',
      toastButtons: [
        {
          text: this.translateService.instant('patron-ui.notifications.toast_message_undo'),
          handler: () => toast.dismiss({ undo: true }),
        },
        { icon: '/assets/icon/close-x.svg', role: 'cancel', handler: () => toast.dismiss(), side: 'end' },
      ],
    });
    return toast.onDidDismiss();
  }
}
