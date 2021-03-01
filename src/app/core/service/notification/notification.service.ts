import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
import { MessageResponse } from '@core/model/service/message-response.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NotificationService {
  private readonly serviceUrlNotification: string = '/json/notification';

  constructor(private readonly http: HttpClient) {}

  resetPasswordNotification(institutionId: string, userName: string, sessionId: string): Observable<boolean> {
    const queryConfig = new RPCQueryConfig('resetPasswordNotification', { institutionId, userName, sessionId });

    return this.http
      .post<MessageResponse<boolean>>(this.serviceUrlNotification, queryConfig)
      .pipe(map(({ response }) => response));
  }
}
