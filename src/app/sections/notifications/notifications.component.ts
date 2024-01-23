import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { UserNotificationsFacadeService } from '@core/facades/notifications/user-notifications.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { Notification } from '@core/service/user-notification/user-notification-api.service';
import { Platform, RefresherCustomEvent } from '@ionic/angular';
import { monthDayYear } from '@shared/constants/dateFormats.constant';
import { Subscription, finalize } from 'rxjs';

export const A_DAY_AGO = 24 * 60 * 60 * 1000;

@Component({
  selector: 'st-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notificationGroups: NotificationGroup[] = [];
  private subs: Subscription = new Subscription();
  private received = {
    today: 'patron-ui.notifications.period_today',
    yesterday: 'patron-ui.notifications.period_yesterday',
    previous: 'patron-ui.notifications.period_previous',
  };

  constructor(
    public readonly loadingService: LoadingService,
    private readonly userNotificationsFacadeService: UserNotificationsFacadeService,
    private readonly platform: Platform,
    private cdRef: ChangeDetectorRef,
    private zone: NgZone
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

  private groupNotifications(notifications: Notification[]) {
    const priority: { [key: string]: number } = {
      pinned: 0,
      [this.received.today]: 1,
      [this.received.yesterday]: 2,
      [this.received.previous]: 3,
    };

    const today = this.formatDate(new Date());
    const yesterday = this.formatDate(new Date(Date.now() - A_DAY_AGO));
    const groupedNotifications: { [key: string]: Notification[] } = {};

    this.groupNotificationsBySections(notifications, today, yesterday, groupedNotifications);

    this.zone.run(() => {
      this.notificationGroups = Object.keys(groupedNotifications)
        .sort((a, b) => {
          return priority[a] - priority[b];
        })
        .map(sectionName => ({
          sectionName,
          notifications: groupedNotifications[sectionName],
        }));
      this.cdRef.detectChanges();
    });
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
      this.groupNotifications(notifications);
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
}

export interface NotificationGroup {
  sectionName: string;
  notifications: Notification[];
}
