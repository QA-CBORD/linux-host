import { Injectable } from '@angular/core';
import {
  UserNotificationApiService,
  Notification,
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

  get unreadNotificationsCount$(): Observable<string> {
    return this._unreadNotificationsCount$;
  }

  get allNotifications$(): Observable<Notification[]> {
    return this._unreadNotificationsSubject$;
  }

  constructor(private readonly _userNotificationApiService: UserNotificationApiService) {}

  public async fetchNotificationsCount() {
    const count = await firstValueFrom(this._userNotificationApiService.getUnreadCount().pipe(first()));
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
    this._unreadNotifications$.next(notifications);
    this.fetchNotificationsCount();
  }

  public markAllNotificationsAsViewed() {
    return this._userNotificationApiService.markAllUserNotificationLogAsViewed().pipe(first());
  }

  public async markAsPinned(id: string, status: boolean, viewedDate?: Date) {
    await firstValueFrom(this._userNotificationApiService.markUserNotificationLogAsPinned(id, status).pipe(first()));
    if (!viewedDate) {
      await firstValueFrom(this.markAllNotificationsAsViewed());
    }
  }

  public async markAsDismissed(id: string) {
    return await firstValueFrom(this._userNotificationApiService.markAsDismissed(id).pipe(first()));
  }
}
