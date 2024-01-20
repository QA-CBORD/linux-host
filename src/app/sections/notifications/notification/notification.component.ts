import { ChangeDetectionStrategy, Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Notification, NotificationCategory } from '@core/service/user-notification/user-notification-api.service';
import { hourMinTime, monthDayFullYear } from '@shared/constants/dateFormats.constant';
import { DatePipe, formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { IonItem, IonItemSliding, ItemSlidingCustomEvent } from '@ionic/angular';
import { UserNotificationsFacadeService } from '@core/facades/notifications/user-notifications.service';
import { NotificationGroup } from '../notifications.component';
import { ToastService } from '@core/service/toast/toast.service';
import { LoadingService } from '@core/service/loading/loading.service';

type Side = 'start' | 'end' | 'none';

@Component({
  selector: 'st-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {
  private side: Side;
  @Input() notificationGroups: NotificationGroup[] = [];
  @ViewChildren(IonItem) ionItems: QueryList<IonItem>;

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
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    //console.log("ngOnInit")
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

  trackById(_: number, user: Notification) {
    return user.id;
  }

  trackByFn(index: number) {
    return index;
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

onSwipe(event: ItemSlidingCustomEvent, item: IonItem) {
    console.log('onSwipe?: ', event);
    this.side = event.detail.side;
    this.setColors(item);
  }

  private setColors(item: IonItem) {
    console.log('warning? ', this.side);
    if (this.side === 'start') {
      item.color = 'tertiary';
    } else if (this.side === 'end') {
      item.color = 'danger';
    } else {
      console.log('warning');
      item.color = null;
    }
  }
  
  async onClick(notification: Notification, item: IonItem, ionSlidin: IonItemSliding) {

    ionSlidin.getSlidingRatio();
    console.log('onClick?: ');

    if (this.side === 'start') {
      if (!notification.isPinned) {
        await this.userNotificationsFacadeService.markAsPinned(notification.id, true);
      } else {
        await this.userNotificationsFacadeService.markAsPinned(notification.id, false);
        await this.showToast(`unpinned`);
      }
      await this.refreshNotifications();
    } else if (this.side === 'end') {
      await this.userNotificationsFacadeService.markAsDismissed(notification.id);
      await this.showToast(`deleted`);
      await this.refreshNotifications();
    }
    this.side = 'none';

    // this.setColors(item);
  }

  private async refreshNotifications() {
    await this.userNotificationsFacadeService.fetchNotifications();
  }

  private async showToast(status: string) {
    const message = 'Notification ' + status;
    await this.toastService.showToast({
      message,
      position: 'bottom',
      toastButtons: [{ text: 'Undo' }, { icon: 'Close', role: 'cancel' }],
    });
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


