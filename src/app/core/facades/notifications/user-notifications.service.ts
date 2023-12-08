import { Injectable } from '@angular/core';
import { UserNotificationApiService } from '@core/service/user-notification/user-notification-api.service';
import { BehaviorSubject, Observable, first, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserNotificationsFacadeService {
  private readonly _unreadNotificationsCount$ = new BehaviorSubject<string>('');

  get unreadNotificationsCount$(): Observable<string> {
    return this._unreadNotificationsCount$.asObservable();
  }

  constructor(private readonly _userNotificationApiService: UserNotificationApiService) {}

  public async fetchNotificationsCount() {
    const count = await firstValueFrom(this._userNotificationApiService.getUnreadCount().pipe(first()));
    this._unreadNotificationsCount$.next(count > 9 ? '9+' : String(count));
  }
}
