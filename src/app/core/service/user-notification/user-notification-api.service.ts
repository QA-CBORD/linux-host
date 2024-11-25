import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
import { MessageResponse } from '@core/model/service/message-response.model';
import { Observable, map } from 'rxjs';

export enum NotificationCategory {
  order = 1,
  account,
  adminNotice,
  meal,
  reward,
  photoUpload,
  automaticDeposit,
  lowBalance,
  guestDeposit,
  walkOut,
}
export interface Notification {
  id: string;
  institutionId: string;
  userId: string;
  title: string;
  subtitle?: string;
  content: string;
  domain: string;
  category: NotificationCategory;
  viewedDate: Date;
  dismissedDate: Date;
  insertTime: Date;
  isPinned: boolean;
}

interface NotificationList {
  list: Notification[];
}

@Injectable({
  providedIn: 'root',
})
export class UserNotificationApiService {
  private readonly serviceUrl = '/json/userNotification';

  constructor(private readonly http: HttpClient) {}

  createNotification(notification: Partial<Notification>): Observable<Notification> {
    const postParams = {
      title: notification.title,
      content: notification.content,
      domain: notification.domain,
      category: notification.category,
    };
    const queryConfig = new RPCQueryConfig('createUserNotificationLog', postParams, true, true);
    return this.http
      .post<MessageResponse<Notification>>(this.serviceUrl, queryConfig)
      .pipe(map(({ response }) => response));
  }

  retrieveAll(): Observable<Notification[]> {
    const postParams = { includeViewed: true, includeDismissed: false, includePinned: true };
    const queryConfig = new RPCQueryConfig('retrieveAll', postParams, true);
    return this.http
      .post<MessageResponse<NotificationList>>(this.serviceUrl, queryConfig)
      .pipe(map(({ response }) => response.list));
  }

  retrive(userNotificationLogId: string): Observable<Notification> {
    const postParams = { userNotificationLogId };
    const queryConfig = new RPCQueryConfig('retrive', postParams, true);
    return this.http
      .post<MessageResponse<Notification>>(this.serviceUrl, queryConfig)
      .pipe(map(({ response }) => response));
  }

  markAsViewed(userNotificationLogId: string): Observable<boolean> {
    const postParams = { userNotificationLogId };
    const queryConfig = new RPCQueryConfig('markUserNotificationLogAsViewed', postParams, true);
    return this.http.post<MessageResponse<boolean>>(this.serviceUrl, queryConfig).pipe(map(({ response }) => response));
  }

  markAsDismissed(userNotificationLogId: string): Observable<boolean> {
    const postParams = { userNotificationLogId };
    const queryConfig = new RPCQueryConfig('markUserNotificationLogAsDismissed', postParams, true);
    return this.http.post<MessageResponse<boolean>>(this.serviceUrl, queryConfig).pipe(map(({ response }) => response));
  }

  getUnreadCount(): Observable<number> {
    const postParams = { includeViewed: false, includeDismissed: false };
    const queryConfig = new RPCQueryConfig('getNotificationLogCount', postParams, true);

    return this.http.post<MessageResponse<number>>(this.serviceUrl, queryConfig).pipe(map(({ response }) => response));
  }

  markAllUserNotificationLogAsViewed() {
    const queryConfig = new RPCQueryConfig('markAllUserNotificationLogAsViewed', {}, true);
    return this.http.post<MessageResponse<boolean>>(this.serviceUrl, queryConfig).pipe(map(({ response }) => response));
  }

  markUserNotificationLogAsPinned(userNotificationLogId: string, value?: boolean): Observable<boolean> {
    const postParams = { userNotificationLogId, value };
    const queryConfig = new RPCQueryConfig('updatePinnedOnUserNotificationLog', postParams, true);
    return this.http.post<MessageResponse<boolean>>(this.serviceUrl, queryConfig).pipe(map(({ response }) => response));
  }
}
