import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserNotificationsFacadeService } from '@core/facades/notifications/user-notifications.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { Notification } from '@core/service/user-notification/user-notification-api.service';
import { IonItemSliding, ItemSlidingCustomEvent, Platform, RefresherCustomEvent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { monthDayYear } from '@shared/constants/dateFormats.constant';
import { Subscription, finalize } from 'rxjs';
import { NotificationBackgroundColorService } from './services/notification-background-color.service';
import { ToastService } from '@core/service/toast/toast.service';
import { NotificationSliding } from './notification/notification.component';

export const A_DAY_AGO = 24 * 60 * 60 * 1000;

@Component({
  selector: 'st-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notificationsGroups: NotificationsGroup[] = [];
  private subs: Subscription = new Subscription();
  private received = {
    today: 'patron-ui.notifications.period_today',
    yesterday: 'patron-ui.notifications.period_yesterday',
    previous: 'patron-ui.notifications.period_previous',
  };

  private sortingPriority = {
    pinned: 0,
    [this.received.today]: 1,
    [this.received.yesterday]: 2,
    [this.received.previous]: 3,
  };

  constructor(
    public readonly loadingService: LoadingService,
    private readonly translateService: TranslateService,
    private readonly notificationColoring: NotificationBackgroundColorService,
    private readonly toastService: ToastService,
    private readonly userNotificationsFacadeService: UserNotificationsFacadeService,
    private readonly platform: Platform,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadingService.showSpinner();
    this.subs.add(this.refreshPage());
    this.subs.add(this.refreshPageOnResume());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ionViewWillLeave() {
    this.userNotificationsFacadeService
      .markAllNotificationsAsViewed()
      .subscribe(() => this.userNotificationsFacadeService.fetchNotificationsCount());
  }

  markNotificationAsViewed(event: RefresherCustomEvent) {
    this.userNotificationsFacadeService
      .markAllNotificationsAsViewed()
      .pipe(finalize(() => event.target.complete()))
      .subscribe(() => this.userNotificationsFacadeService.fetchNotifications());
  }

  trackByFn(index: number) {
    return index;
  }

  async pin(sliding: NotificationSliding) {
    await this.userNotificationsFacadeService.markAsPinned(sliding.notification, true);
    await this.refreshNotifications(sliding.ionItem);
  }

  async unpin(sliding: NotificationSliding) {
    this.removeNotification(sliding.notification, sliding.ionItem);
    const { data } = await this.showUndoToast(
      this.translateService.instant('patron-ui.notifications.toast_message_unpinned')
    );
    if (data?.undo) {
      this.userNotificationsFacadeService.dispatchNotificationsCached();
    } else {
      await this.userNotificationsFacadeService.markAsPinned(sliding.notification, false);
      await this.refreshNotifications(sliding.ionItem);
    }
  }

  async delete(sliding: NotificationSliding) {
    this.removeNotification(sliding.notification, sliding.ionItem);
    const { data } = await this.showUndoToast(
      this.translateService.instant('patron-ui.notifications.toast_message_deleted')
    );
    if (data?.undo) {
      this.userNotificationsFacadeService.dispatchNotificationsCached();
    } else {
      await this.userNotificationsFacadeService.markAsDismissed(sliding.notification);
      await this.refreshNotifications(sliding.ionItem);
    }
  }

  drag(event: ItemSlidingCustomEvent) {
    this.notificationColoring.setBackgroundColor(event);
  }

  private groupNotifications(notifications: Notification[], priority: { [key: string]: number }) {
    const today = this.formatDate(new Date());
    const yesterday = this.formatDate(new Date(Date.now() - A_DAY_AGO));
    const groupedNotifications: { [key: string]: Notification[] } = {};

    this.groupNotificationsBySections(notifications, today, yesterday, groupedNotifications);

    this.notificationsGroups = Object.keys(groupedNotifications)
      .sort((a, b) => {
        return priority[a] - priority[b];
      })
      .map(sectionName => ({
        sectionName,
        notifications: groupedNotifications[sectionName],
      }));
    this.cdRef.detectChanges();
  }

  private groupNotificationsBySections(
    notifications: Notification[],
    today: string,
    yesterday: string,
    groupedNotifications: { [key: string]: Notification[] }
  ) {
    const sectionName: { [key: string]: string } = {
      [today]: this.received.today,
      [yesterday]: this.received.yesterday,
    };

    let section = '';
    notifications.forEach(notification => {
      const notificationDate = this.formatDate(notification.insertTime);

      if (notification.isPinned) {
        section = 'pinned';
      } else {
        section = sectionName[notificationDate] || this.received.previous;
      }

      groupedNotifications[section] = groupedNotifications[section] || [];
      groupedNotifications[section].push(notification);
    });
  }

  private formatDate(date: Date): string {
    return formatDate(date, monthDayYear, 'en-US');
  }

  private refreshPage() {
    this.fetchNotifications();
    return this.userNotificationsFacadeService.allNotifications$.subscribe(async notifications => {
      this.groupNotifications(notifications, this.sortingPriority);
      await this.loadingService.closeSpinner();
    });
  }

  private refreshPageOnResume() {
    return this.platform.resume.subscribe(() => {
      this.fetchNotifications();
    });
  }

  private async fetchNotifications() {
    await this.loadingService.showSpinner();
    this.userNotificationsFacadeService.fetchNotifications();
  }

  private async refreshNotifications(ionItem: IonItemSliding) {
    await this.userNotificationsFacadeService.fetchNotifications();
    await this.notificationColoring.resetList(ionItem);
  }

  private async removeNotification(notification: Notification, ionItem: IonItemSliding) {
    const notFound = -1;
    const index = this.notificationsGroups.findIndex(group => group.notifications.some(n => n.id === notification.id));
    if (index !== notFound) {
      this.notificationsGroups[index].notifications = this.notificationsGroups[index].notifications.filter(
        n => n.id !== notification.id
      );
      await ionItem.closeOpened();
    }
  }

  private async showUndoToast(message: string = '') {
    const toast = await this.toastService.showToast({
      message,
      position: 'bottom',
      cssClass: 'toast-message-notification',
      toastButtons: [
        {
          text: this.translateService.instant('patron-ui.notifications.toast_message_undo'),
          handler: () => toast.dismiss({ undo: true }),
        },
        { icon: '/assets/icon/close-x.svg', role: 'cancel', handler: () => toast.dismiss() },
      ],
    });
    return toast.onDidDismiss();
  }
}

export interface NotificationsGroup {
  sectionName: string;
  notifications: Notification[];
}
