import { ChangeDetectionStrategy, Component, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Notification, NotificationCategory } from '@core/service/user-notification/user-notification-api.service';
import { hourMinTime, monthDayFullYear } from '@shared/constants/dateFormats.constant';
import { DatePipe, formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import {  IonItemSliding, ItemSlidingCustomEvent } from '@ionic/angular';
import { UserNotificationsFacadeService } from '@core/facades/notifications/user-notifications.service';
import { NotificationGroup } from '../notifications.component';
import { LoadingService } from '@core/service/loading/loading.service';

@Component({
  selector: 'st-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  @Input() notificationGroups: NotificationGroup[] = [];
  @ViewChild(IonItemSliding) slidingItem: IonItemSliding;
  @ViewChildren(IonItemSliding) slidingItems: QueryList<IonItemSliding>;

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
   // private readonly loadingService: LoadingService,
  ) {}

  ngAfterViewChecked() {
   //this.loadingService.showSpinner();
    this.notificationGroups.forEach((group, i) => {
      group.notifications.forEach((notification, j) => {
        if (notification.isPinned) {
          const item =  this.slidingItems.get(i + j);
          item.disabled = false;
          item.open('start');
        }
      });
    });


    //this.loadingService.closeSpinner();
  }

  notificationsFormatted(group: Notification[]) {
    return group.map(notification => {
      return {
        ...notification,
        insertTime: this.formattedDate(notification.insertTime),
      };
    });
  }

  getAvatar(category: NotificationCategory) {
    return this.notificationIcon[category];
  }

  trackById(_: number, user: Notification): string {
    return user.id;
  }

  trackByFn(index, value) {
    return value.notifications.length;
  }

  get notificationDelete() {
    return this.translateService.instant('patron-ui.notifications.delete');
  }

  get notificationPin() {
    return this.translateService.instant('patron-ui.notifications.pin');
  }

  async onSwipe(event: ItemSlidingCustomEvent, slidingItem: IonItemSliding, notification: Notification) {
    const amount = await slidingItem.getSlidingRatio();
     if (amount !== 0) {
      if (event.detail.side == 'start') {
        if (!notification.isPinned) {
          await this.userNotificationsFacadeService.markAsPinned(notification.id, true);
          //await slidingItem.open('start');
        } else {
          await this.userNotificationsFacadeService.markAsPinned(notification.id, false);
          //await slidingItem.close();
        }
      } else {
        await this.userNotificationsFacadeService.markAsDismissed(notification.id);
        await slidingItem.close();
      }
  
      await this.userNotificationsFacadeService.fetchNotifications();
   }
 
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
