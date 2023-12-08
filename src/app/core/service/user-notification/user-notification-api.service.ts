import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
import { MessageResponse } from '@core/model/service/message-response.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserNotificationApiService {
  private readonly serviceUrl = '/json/userNotification';

  constructor(private readonly http: HttpClient) {}

  getUnreadCount(): Observable<number> {
    const queryConfig = new RPCQueryConfig(
      'getNotificationLogCount',
      { includeViewed: false, includeDismissed: false },
      true
    );

    return this.http.post<MessageResponse<number>>(this.serviceUrl, queryConfig).pipe(map(({ response }) => response));
  }
}
