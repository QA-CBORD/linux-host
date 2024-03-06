import { Injectable } from '@angular/core';

import { ContentStringInfo } from '../../model/content/content-string-info.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ContentStringRequest } from '../../model/content/content-string-request.model';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
import { MessageListResponse, MessageResponse } from '@core/model/service/message-response.model';

@Injectable({
  providedIn: 'root',
})
export class ContentStringsApiService {
  private serviceUrl = '/json/content';

  constructor(private readonly http: HttpClient) {}

  retrieveContentStringByConfig(
    config: ContentStringRequest,
    sessionId?: string,
    useSessionId?: boolean
  ): Observable<ContentStringInfo> {
    const useSession = useSessionId === false ? useSessionId : true;
    let params;
    config = config.locale ? config : { ...config, locale: null };
    params = { ...config };
    if (sessionId) {
      params = { ...params, sessionId };
    }
    const queryConfig = new RPCQueryConfig('retrieveString', params, useSession, true);

    return this.http
      .post<MessageResponse<ContentStringInfo>>(this.serviceUrl, queryConfig)
      .pipe(map(({ response }) => response));
  }
  retrieveContentStringListByRequest(config: ContentStringRequest): Observable<ContentStringInfo[] | []> {
    config = config.locale ? config : { ...config, locale: null };
    const queryConfig = new RPCQueryConfig('retrieveStringList', config, true, true);

    return this.http
      .post<MessageResponse<MessageListResponse<ContentStringInfo>>>(this.serviceUrl, queryConfig)
      .pipe(map(({ exception, response }) => (!exception && !response.empty ? response.list : [])));
  }
}
