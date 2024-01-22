import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Notification, NotificationCategory } from '@core/service/user-notification/user-notification-api.service';
import { hourMinTime, monthDayFullYear } from '@shared/constants/dateFormats.constant';
import { DatePipe, formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { IonItemSliding, ItemSlidingCustomEvent } from '@ionic/angular';
import { UserNotificationsFacadeService } from '@core/facades/notifications/user-notifications.service';
import { NotificationGroup } from '../notifications.component';
import { ToastService } from '@core/service/toast/toast.service';
import { NotificationBackgroundEffect } from '../services/notification-background-effect.service';

@Component({
  selector: 'st-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  @Input() notificationGroups: NotificationGroup[] = [];

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
    private readonly notificationColoring: NotificationBackgroundEffect,
    private readonly toastService: ToastService,
  
  ) {}

  notificationsFormatted(group: Notification[]) {
    return group.map(notification => ({
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

  async onDrag(event: ItemSlidingCustomEvent) {
    this.notificationColoring.setBackgroundColor(event);
  }

  async notificationAction(notification: Notification, ionItem: IonItemSliding, type: string) {
    switch (type) {
      case 'pin':
        await this.pin(notification);
        break;
      case 'unpin':
        await this.unpin(notification);
        break;
      case 'delete':
        await this.delete(notification);
        break;
    }

    await this.refreshNotifications(ionItem);
  }

  get notificationDelete() {
    return this.translateService.instant('patron-ui.notifications.delete');
  }

  get notificationPin() {
    return this.translateService.instant('patron-ui.notifications.pin');
  }

  get notificationUnpin() {
    return this.translateService.instant('patron-ui.notifications.unpin');
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

  private async showToast(status: string) {
    const message = 'Notification ' + status;
    const toast = await this.toastService.showToast({
      message,
      position: 'bottom',
      cssClass: 'toast-message-notification',
      toastButtons: [
        { text: 'Undo', handler: () => toast.dismiss({ undo: true }) },
        { icon: 'Close', role: 'cancel', handler: () => toast.dismiss() },
      ],
    });
    return toast.onDidDismiss();
  }

  private async unpin(notification: Notification) {
    const { data } = await this.showToast(`unpinned`);
    if (data?.undo) return;
    await this.userNotificationsFacadeService.markAsPinned(notification.id, false);
  }

  private async pin(notification: Notification) {
    await this.userNotificationsFacadeService.markAsPinned(notification.id, true,notification.viewedDate);
  }

  private async delete(notification: Notification) {
    const { data } = await this.showToast(`deleted`);
    if (data?.undo) return;
    await this.userNotificationsFacadeService.markAsDismissed(notification.id);
  }
}
