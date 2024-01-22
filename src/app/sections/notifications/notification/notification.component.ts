import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Notification, NotificationCategory } from '@core/service/user-notification/user-notification-api.service';
import { hourMinTime, monthDayFullYear } from '@shared/constants/dateFormats.constant';
import { DatePipe, formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { IonItemSliding, ItemSlidingCustomEvent } from '@ionic/angular';
import { UserNotificationsFacadeService } from '@core/facades/notifications/user-notifications.service';
import { NotificationGroup } from '../notifications.component';
import { ToastService } from '@core/service/toast/toast.service';

@Component({
  selector: 'st-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  
  @Input() notificationGroups: NotificationGroup[] = [];
  private notificationsSwiped: HTMLElement[] = [];

  private colors = {
    RED_COLOR: 'rgba(188, 14, 50, 0.5)',
    PURPLE_COLOR: 'rgba(157, 84, 199, 0.5)',
  };

  private constants = {
    PROPERTY: '--background',
    SIDE: {
      left: -1,
      right: 1,
    },
  };

  private config = {
    ...this.colors,
    ...this.constants,
  };

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
    private readonly toastService: ToastService
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
    const ratio = await event.target.getSlidingRatio();
    if (ratio > this.config.SIDE.right) {
      this.setElementBackground(event.target, this.config.RED_COLOR);
    } else if (ratio < this.config.SIDE.left) {
      this.setElementBackground(event.target, this.config.PURPLE_COLOR);
    } else {
      this.resetElementBackground();
    }

    if (event.target && event.target.firstChild && event.target.firstChild.nextSibling) {
      this.notificationsSwiped.push(event.target.firstChild.nextSibling as HTMLElement);
    }
  }

  async pin(notification: Notification, ionItem: IonItemSliding) {
    await this.userNotificationsFacadeService.markAsPinned(notification.id, true);
    await this.resetList(ionItem);
  }

  async unpin(notification: Notification, ionItem: IonItemSliding) {
    const { data } = await this.showToast(`unpin`);
    if (data?.undo) return;
    await this.userNotificationsFacadeService.markAsPinned(notification.id, false);
    await this.resetList(ionItem);
  }

  async delete(notification: Notification, ionItem: IonItemSliding) {
    const { data } = await this.showToast(`deleted`);
    if (data?.undo) return;
    await this.userNotificationsFacadeService.markAsDismissed(notification.id);
    await this.resetList(ionItem);
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

  private setElementBackground(target: HTMLIonItemSlidingElement, color: string) {
    if (target && target.firstChild && target.firstChild.nextSibling) {
      const element = target.firstChild.nextSibling as HTMLElement;
      element.style.setProperty(this.config.PROPERTY, color);
    }
  }

  private async resetList(ionItem: IonItemSliding) {
    await this.refreshNotifications();
    await ionItem.closeOpened();
    this.resetElementBackground();
  }

  private resetElementBackground() {
    this.notificationsSwiped.forEach(item => {
      item.style.setProperty(this.config.PROPERTY, 'white');
    });
    this.notificationsSwiped = [];
  }

  private async refreshNotifications() {
    await this.userNotificationsFacadeService.fetchNotifications();
  }

  private async showToast(status: string) {
    const message = 'Notification ' + status;
    const toast = await this.toastService.showToast({
      message,
      position: 'bottom',
      cssClass: 'toast-message-notification',
      toastButtons: [
        { text: 'Undo', handler: () => toast.dismiss({ undo: true }) },
        { icon: 'Close', role: 'cancel', handler: () => toast.dismiss(), cssClass: '' },
      ],
    });
    return toast.onDidDismiss();
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
}
