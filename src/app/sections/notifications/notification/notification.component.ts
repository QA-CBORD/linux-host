import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Notification, NotificationCategory } from '@core/service/user-notification/user-notification-api.service';
import { hourMinTime, monthDayFullYear } from '@shared/constants/dateFormats.constant';
import { DatePipe, formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { IonItem, IonItemSliding, ItemSlidingCustomEvent } from '@ionic/angular';
import { UserNotificationsFacadeService } from '@core/facades/notifications/user-notifications.service';
import { NotificationGroup } from '../notifications.component';
import { ToastService } from '@core/service/toast/toast.service';
import { LoadingService } from '@core/service/loading/loading.service';

@Component({
  selector: 'st-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {
  @Input() notificationGroups: NotificationGroup[] = [];
  @ViewChild(IonItemSliding) slidingItem: IonItemSliding;
  @ViewChild(IonItem) ionItem: IonItem;
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
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    console.log("ngOnInit")
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

  async onSwipe(
    event: ItemSlidingCustomEvent,
    slidingItem: IonItemSliding,
    notification: Notification,
    ionItem: IonItem
  ) {
    
    this.loadingService.showSpinner();
    const amount = await slidingItem.getSlidingRatio();
    if (amount !== 0) {
      if (event.detail.side == 'start') {
       ionItem.color = 'tertiary';
        if (!notification.isPinned) {
          await this.userNotificationsFacadeService.markAsPinned(notification.id, true);
        } else {
          await this.userNotificationsFacadeService.markAsPinned(notification.id, false);
          const message = `Notification unpinned`;
          await this.toastService.showToast({ message, position: 'bottom',  toastButtons: [ { text: 'Undo'}, {icon: 'Close',   role: 'cancel'}], });
        }
      } else {
        ionItem.color = 'danger';
        await this.userNotificationsFacadeService.markAsDismissed(notification.id);
        const message = `Notification deleted`;
        await this.toastService.showToast({ message, position: 'bottom',  toastButtons: [ { text: 'Undo'}, {icon: 'Close',   role: 'cancel'}], });

        await slidingItem.close();
      }

      await this.userNotificationsFacadeService.fetchNotifications();
      this.loadingService.closeSpinner();
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

  openPinned(slidingItem: IonItemSliding, notification: Notification) {
    if (notification.isPinned) {
       slidingItem.open('start');
       return true;
    }
    return false;
  }

}
