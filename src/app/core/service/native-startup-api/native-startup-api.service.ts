import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageResponse } from '@core/model/service/message-response.model';
import { NativeStartupInfo } from '@core/model/native-startup/native-startup-info';
import { HttpClient } from '@angular/common/http';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';

@Injectable({
  providedIn: 'root',
})
export class NativeStartupApiService {
  private readonly serviceUrl = '/json/configuration';

  constructor(private readonly http: HttpClient) {}

  nativeStartup(clientType: string, clientVersion: string): Observable<MessageResponse<NativeStartupInfo>> {
    const params = {
      clientType,
      clientVersion,
    };

    const queryConfig = new RPCQueryConfig('nativeStartup', params, true, true);
    return this.http.post<MessageResponse<NativeStartupInfo>>(this.serviceUrl, queryConfig)
  }
}
