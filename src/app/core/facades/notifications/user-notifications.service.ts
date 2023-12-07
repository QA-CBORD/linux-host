import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserNotificationsFacadeService {
  private readonly _unreadNotificationsCount$ = new BehaviorSubject<string>('');

  get unreadNotificationsCount$(): Observable<string> {
    return this._unreadNotificationsCount$.asObservable();
  }
  public fetchNotificationsCount() {
    // TODO: Implement service call
    this._unreadNotificationsCount$.next('9');
  }
}
