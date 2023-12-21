import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { UserNotificationsFacadeService } from '@core/facades/notifications/user-notifications.service';
import { Notification } from '@core/service/user-notification/user-notification-api.service';
import { Platform, RefresherCustomEvent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { monthDayYear } from '@shared/constants/dateFormats.constant';
import { Subscription, first } from 'rxjs';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';

export const aDayAgo = 24 * 60 * 60 * 1000;

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
    private readonly platform: Platform,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.fetchContentStrings();
    this.subs.add(this.refreshPage());
    this.subs.add(this.refreshPageOnResume());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ionViewWillLeave() {
    // 1 - markNotificationAsViewed
  }

  markNotificationAsViewed(event: RefresherCustomEvent) {
    alert(event)
    // 1 - markNotificationAsViewed
    //   .pipe(
    //     first(),
    //     finalize(() => event.target.complete())
    //   )
    //   .subscribe();

    this.userNotificationsFacadeService.fetchNotifications();
  }

  hasPeriod(notifications: Notification[]) {
    return notifications.length > 0;
  }

  get notificationTitle() {
    return this.translateService.instant('patron-ui.notifications.title');
  }

  private groupNotificationsByPeriod(notifications: Notification[]) {
    const today = this.formatDate(new Date());
    const yesterday = this.formatDate(new Date(Date.now() - aDayAgo));
    const groupedNotifications: { [key: string]: Notification[] } = {};

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
    this.zone.run(() => {
      this.notificationGroups = Object.keys(groupedNotifications).map(date => ({
        date,
        notifications: groupedNotifications[date],
      }));
      this.cdr.detectChanges();
    });
  }

  private formatDate(date: Date): string {
    return formatDate(date, monthDayYear, 'en-US', 'UTC');
  }

  private isDateAllowed(date: string): boolean {
    const days = 90;
    const currentDate = new Date();
    const ninetyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - days));
    return date >= this.formatDate(ninetyDaysAgo);
  }

  private fetchContentStrings() {
    this.contentStringsFacadeService
      .fetchContentStrings$(CONTENT_STRINGS_DOMAINS.patronUi, CONTENT_STRINGS_CATEGORIES.notifications)
      .pipe(first())
      .subscribe();
  }

  private refreshPage() {
    this.userNotificationsFacadeService.fetchNotifications();
    return this.userNotificationsFacadeService.allNotifications$.subscribe(notifications => {
      this.groupNotificationsByPeriod(notifications);
    });
  }

  private refreshPageOnResume() {
    return this.platform.resume.subscribe(() => {
      this.userNotificationsFacadeService.fetchNotifications();
    });
  }
}

interface NotificationGroup {
  date: string;
  notifications: Notification[];
}
