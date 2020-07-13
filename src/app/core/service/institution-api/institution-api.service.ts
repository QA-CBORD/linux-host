import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageResponse } from '@core/model/service/message-response.model';
import { InstitutionPhotoInfo } from '@core/model/institution/institution-photo-info.model';
import { map } from 'rxjs/operators';
import { Institution } from '@core/model/institution/institution.model';
import { HttpClient } from '@angular/common/http';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';

@Injectable({
  providedIn: 'root',
})
export class InstitutionApiService {
  private readonly serviceUrl = '/json/institution';

  constructor(private readonly http: HttpClient) {}

  getInstitutionDataById(institutionId: string, sessionId?: string, useSessionId?: boolean): Observable<Institution> {
    let params = { institutionId } as { institutionId: string; sessionId?: string };
    const useSession = useSessionId === false ? useSessionId : true;

    if (sessionId) {
      params = { ...params, sessionId };
    }
    const queryConfig = new RPCQueryConfig('retrieve', params, useSession);

    return this.http
      .post<MessageResponse<Institution>>(this.serviceUrl, queryConfig)
      .pipe(map(({ response }) => response));
  }

  getInstitutionPhotoById(
    institutionId: string,
    sessionId?: string,
    useSessionId?: boolean
  ): Observable<InstitutionPhotoInfo> {
    let params = { institutionId } as { institutionId: string; sessionId?: string };
    const useSession = useSessionId === false ? useSessionId : true;
    if (sessionId) {
      params = { ...params, sessionId };
    }
    const queryConfig = new RPCQueryConfig('retrieveInstitutionPhoto', params, useSession);

    return this.http
      .post<MessageResponse<InstitutionPhotoInfo>>(this.serviceUrl, queryConfig)
      .pipe(map(({ response: photoInfo }) => photoInfo));
  }

  retrieveLookupList(systemSessionId): Observable<any> {
    const queryConfig = new RPCQueryConfig('retrieveLookupList', { sessionId: systemSessionId });

    return this.http
      .post<MessageResponse<any>>(this.serviceUrl, queryConfig)
      .pipe(map(({ response: { institutions } }) => institutions));
  }
}
