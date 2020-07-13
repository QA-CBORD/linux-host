import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { MessageResponse } from '@core/model/service/message-response.model';
import { map, switchMap } from 'rxjs/operators';
import { NativeStartupInfo } from '@core/model/native-startup/native-startup-info';
import { Plugins } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
const { Device, Capacitor } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class NativeStartupApiService {
  private readonly serviceUrl = '/json/configuration';

  constructor(private readonly http: HttpClient) {}

  nativeStartup(
    institutionId: string,
    clientType = Capacitor.platform,
    sessionId?: string,
    useSessionId?: boolean
  ): Observable<NativeStartupInfo> {
    return from(Device.getInfo()).pipe(
      switchMap(({ appVersion }) => {
        let params = {
          institutionId,
          clientType,
          clientVersion: appVersion || 2,
        } as { institutionId: string; clientType: string; clientVersion: number; sessionId?: string };
        const useSession = useSessionId === false ? useSessionId : true;

        if (sessionId) {
          params = { ...params, sessionId };
        }
        const queryConfig = new RPCQueryConfig('nativeStartup', params, useSession);

        return this.http.post<MessageResponse<NativeStartupInfo>>(this.serviceUrl, queryConfig);
      }),
      map(({ response }) => response)
    );
  }
}
