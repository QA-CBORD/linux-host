import { Injectable } from '@angular/core';

import { BaseService, ServiceParameters } from '../base-service/base.service';
import { ContentStringInfo } from '../../model/content/content-string-info.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { ContentStringRequest } from '../../model/content/content-string-request.model';
import { UserService } from '../user-service/user.service';
import { ContentStrings } from 'src/app/app.global';
import { MessageResponse } from '../../model/service/message-response.model';

@Injectable({
  providedIn: 'root',
})
export class ContentService extends BaseService {
  private serviceUrl = '/json/content';

  constructor(protected readonly http: HttpClient, private readonly userService: UserService) {
    super(http);
  }

  retrieveContentString(string: ContentStrings.ContentString): Observable<ContentStringInfo> {
    const methodName = 'retrieveString';
    const set: string[] = string.split('.');

    const params: ServiceParameters = {
      domain: set[0],
      category: set[1],
      name: set[2],
    };

    return this.userService.userData.pipe(
      switchMap(({ institutionId }) => this.httpRequestFull(this.serviceUrl, methodName, true, institutionId, params))
    );
  }

  retrieveContentStringList(
    institutionId: string,
    string: ContentStrings.ContentStringList
  ): Observable<ContentStringInfo[] | []> {
    const methodName = 'retrieveStringList';

    const set: string[] = string.split('.');

    const params: ServiceParameters = {
      domain: set[0],
      category: set[1],
    };

    return this.httpRequestFull(this.serviceUrl, methodName, true, institutionId, params).pipe(
      map(({ response }: MessageResponse<ContentStringInfo[]>) => response)
    );
  }

  retrieveContentStringByRequest(config: ContentStringRequest): Observable<ContentStringInfo> {
    const methodName = 'retrieveString';
    config = config.locale ? config : { ...config, locale: null };

    return this.userService.userData.pipe(
      switchMap(({ institutionId }) => this.httpRequestFull(this.serviceUrl, methodName, true, institutionId, config))
    );
  }

  retrieveContentStringListByRequest(config: ContentStringRequest): Observable<ContentStringInfo[] | []> {
    const methodName = 'retrieveStringList';
    config = config.locale ? config : { ...config, locale: null };

    return this.userService.userData.pipe(
      switchMap(({ institutionId }) =>
        this.httpRequestFull<any>(this.serviceUrl, methodName, true, institutionId, config)
      ),
      map(({ exception, response }) => (!exception && !response.empty ? response.list : []))
    );
  }
}
