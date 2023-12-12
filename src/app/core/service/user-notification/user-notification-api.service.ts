import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
import { MessageResponse } from '@core/model/service/message-response.model';
import { Observable, map } from 'rxjs';

export interface UserNotificationLog {
  institutionId: string;
  userId: string;
  title: string;
  content: string;
  domain: string;
  category: UserNotificationLogCategory | number;
  viewedDate: Date;
  dismissedDate: Date;
}

export enum UserNotificationLogCategory {
  ORDERING = 1,
  ACCOUNT = 2,
  ADMIN_NOTICE = 3,
}

@Injectable({
  providedIn: 'root',
})
export class UserNotificationApiService {
  private readonly serviceUrl = '/json/userNotification';

  constructor(private readonly http: HttpClient) {}

  createNotification(notification: Partial<UserNotificationLog>): Observable<UserNotificationLog> {
    const postParams = {
      title: notification.title,
      content: notification.content,
      domain: notification.domain,
      category: notification.category,
    };
    const queryConfig = new RPCQueryConfig('createUserNotificationLog', postParams, true, true);
    return this.http
      .post<MessageResponse<UserNotificationLog>>(this.serviceUrl, queryConfig)
      .pipe(map(({ response }) => response));
  }

  retrieveAll(): Observable<UserNotificationLog[]> {
    const queryConfig = new RPCQueryConfig('retrieveAll', { includeViewed: false, includeDismissed: false }, true);
    return this.http
      .post<MessageResponse<UserNotificationLog[]>>(this.serviceUrl, queryConfig)
      .pipe(map(({ response }) => response));
  }

  retrive(userNotificationLogId: string): Observable<UserNotificationLog> {
    const queryConfig = new RPCQueryConfig('retrive', { userNotificationLogId }, true);
    return this.http
      .post<MessageResponse<UserNotificationLog>>(this.serviceUrl, queryConfig)
      .pipe(map(({ response }) => response));
  }

  markAsViewed(userNotificationLogId: string): Observable<Boolean> {
    const queryConfig = new RPCQueryConfig('markUserNotificationLogAsViewed', { userNotificationLogId }, true);
    return this.http.post<MessageResponse<Boolean>>(this.serviceUrl, queryConfig).pipe(map(({ response }) => response));
  }

  markAsDismissed(userNotificationLogId: string): Observable<Boolean> {
    const queryConfig = new RPCQueryConfig('markUserNotificationLogAsDismissed', { userNotificationLogId }, true);
    return this.http.post<MessageResponse<Boolean>>(this.serviceUrl, queryConfig).pipe(map(({ response }) => response));
  }

  getUnreadCount(): Observable<number> {
    const queryConfig = new RPCQueryConfig(
      'getNotificationLogCount',
      { includeViewed: false, includeDismissed: false },
      true
    );

    return this.http.post<MessageResponse<number>>(this.serviceUrl, queryConfig).pipe(map(({ response }) => response));
  }
}
