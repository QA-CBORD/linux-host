import { Injectable } from '@angular/core';
import {
  UserNotificationApiService,
  Notification,
  NotificationCategory,
} from '@core/service/user-notification/user-notification-api.service';
import { BehaviorSubject, Observable, Subject, catchError, first, firstValueFrom, of } from 'rxjs';
const MAXIMUN_NOTIFICATION_COUNT = 9;
@Injectable({
  providedIn: 'root',
})
export class UserNotificationsFacadeService {
  private readonly _unreadNotificationsCountSubject = new BehaviorSubject<string>('');
  private readonly _unreadNotificationsCount$ = this._unreadNotificationsCountSubject.asObservable();
  private readonly _unreadNotifications$ = new Subject<Notification[]>();
  private readonly _unreadNotificationsSubject$ = this._unreadNotifications$.asObservable();
  private notificationsStore: Notification[];

  constructor(private readonly _userNotificationApiService: UserNotificationApiService) {}

  get unreadNotificationsCount$(): Observable<string> {
    return this._unreadNotificationsCount$;
  }

  get allNotifications$(): Observable<Notification[]> {
    return this._unreadNotificationsSubject$;
  }

  get notificationsStored() {
    return this.notificationsStore;
  }

  set notificationsStored(notification: Notification[]) {
    this.notificationsStore = notification;
  }

  dispatchNotificationsStored() {
    this._unreadNotifications$.next(this.notificationsStore);
  }

  public async fetchNotificationsCount() {
    const count = await firstValueFrom(
      this._userNotificationApiService.getUnreadCount().pipe(
        first(),
        catchError(() => of(0))
      )
    );
    this._unreadNotificationsCountSubject.next(
      count > MAXIMUN_NOTIFICATION_COUNT ? `${MAXIMUN_NOTIFICATION_COUNT}+` : String(count || '')
    );
  }
  public async fetchNotifications() {
    const notifications = await firstValueFrom(
      this._userNotificationApiService.retrieveAll().pipe(
        first(),
        catchError(() => of([]))
      )
    );
    const allowedNotifications = notifications.filter(
      ({ category }) => [NotificationCategory.order, NotificationCategory.photoUpload].includes(category)
    );

    this.notificationsStore = allowedNotifications;
    this._unreadNotifications$.next(allowedNotifications);
    this.fetchNotificationsCount();
  }

  public markAllNotificationsAsViewed() {
    return this._userNotificationApiService.markAllUserNotificationLogAsViewed().pipe(
      first(),
      catchError(() => of(false))
    );
  }

  public async markAsPinned(notification: Notification, status: boolean) {
    await firstValueFrom(
      this._userNotificationApiService.markUserNotificationLogAsPinned(notification.id, status).pipe(first())
    );
    if (!notification.viewedDate) {
      await firstValueFrom(this._userNotificationApiService.markAsViewed(notification.id));
    }
  }

  public async markAsDismissed(notification: Notification) {
    await firstValueFrom(this._userNotificationApiService.markAsDismissed(notification.id).pipe(first()));
    if (!notification.viewedDate) {
      await firstValueFrom(this._userNotificationApiService.markAsViewed(notification.id));
    }
  }
}
