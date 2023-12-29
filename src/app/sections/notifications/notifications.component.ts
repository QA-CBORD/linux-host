import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { UserNotificationsFacadeService } from '@core/facades/notifications/user-notifications.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { Notification } from '@core/service/user-notification/user-notification-api.service';
import { Platform, RefresherCustomEvent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { monthDayYear } from '@shared/constants/dateFormats.constant';
import { Subscription, finalize, first } from 'rxjs';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';

export const A_DAY_AGO = 24 * 60 * 60 * 1000;

@Component({
  selector: 'st-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  received = {
    today: this.translateService.instant('patron-ui.notifications.period_today'),
    yesterday: this.translateService.instant('patron-ui.notifications.period_yesterday'),
    previous: this.translateService.instant('patron-ui.notifications.period_previous'),
  };

  notificationGroups: NotificationGroup[] = [];
  private subs: Subscription = new Subscription();

  constructor(
    private readonly translateService: TranslateService,
    private readonly userNotificationsFacadeService: UserNotificationsFacadeService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
    public readonly loadingService: LoadingService,
    private readonly platform: Platform,
    private cdRef: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.fetchContentStrings();
    this.subs.add(this.refreshPage());
    this.subs.add(this.refreshPageOnResume());
  }

  ngOnDestroy() {
   this.subs.unsubscribe();
  }

  ionViewWillLeave() {
    this.userNotificationsFacadeService.markAllNotificationsAsViewed().subscribe();
    this.userNotificationsFacadeService.fetchNotificationsCount();
  }

  markNotificationAsViewed(event: RefresherCustomEvent) {
    this.userNotificationsFacadeService
      .markAllNotificationsAsViewed()
      .pipe(finalize(() => event.target.complete()))
      .subscribe(() => this.userNotificationsFacadeService.fetchNotifications());
  }

  hasPeriod(notifications: Notification[]) {
    return notifications.length > 0;
  }

  trackByFn(index: number) {
    return index;
  }

  get notificationTitle() {
    return this.translateService.instant('patron-ui.notifications.title');
  }

  private groupNotifications(notifications: Notification[]) {
    const today = this.formatDate(new Date());
    const yesterday = this.formatDate(new Date(Date.now() - A_DAY_AGO));
    const groupedNotifications: { [key: string]: Notification[] } = {};

    this.groupNotificationsByPeriods(notifications, today, yesterday, groupedNotifications);
    this.zone.run(() => {
      this.notificationGroups = Object.keys(groupedNotifications).map(date => ({
        date,
        notifications: groupedNotifications[date],
      }));
      this.cdRef.detectChanges();
    });
  }

  private groupNotificationsByPeriods(
    notifications: Notification[],
    today: string,
    yesterday: string,
    groupedNotifications: { [key: string]: Notification[] }
  ) {
    notifications.forEach(notification => {
      let period = this.received.today;
      const notificationDate = this.formatDate(notification.insertTime);

      if (this.isDateAllowed(notificationDate)) {
        if (notificationDate === today) {
          period = this.received.today;
        } else if (notificationDate === yesterday) {
          period = this.received.yesterday;
        } else {
          period = this.received.previous;
        }

        if (!groupedNotifications[period]) {
          groupedNotifications[period] = [];
        }
        groupedNotifications[period].push(notification);
      }
    });
  }

  private formatDate(date: Date): string {
    return formatDate(date, monthDayYear, 'en-US', 'UTC');
  }

  private isDateAllowed(date: string): boolean {
    const numberOfdays = 90;
    const currentDate = new Date();
    const ninetyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - numberOfdays));
    return date >= this.formatDate(ninetyDaysAgo);
  }

  private fetchContentStrings() {
    this.contentStringsFacadeService
      .fetchContentStrings$(CONTENT_STRINGS_DOMAINS.patronUi, CONTENT_STRINGS_CATEGORIES.notifications)
      .pipe(first())
      .subscribe();
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

interface NotificationGroup {
  date: string;
  notifications: Notification[];
}
