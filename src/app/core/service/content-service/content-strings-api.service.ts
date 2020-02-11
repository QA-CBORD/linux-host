import { Injectable } from '@angular/core';

import { BaseService } from '../base-service/base.service';
import { ContentStringInfo } from '../../model/content/content-string-info.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { ContentStringRequest } from '../../model/content/content-string-request.model';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root',
})
export class ContentStringsApiService extends BaseService {
  private serviceUrl = '/json/content';

  constructor(protected readonly http: HttpClient, private readonly userService: UserService) {
    super(http);
  }

  retrieveContentStringByConfig(config: ContentStringRequest): Observable<ContentStringInfo> {
    const methodName = 'retrieveString';
    config = config.locale ? config : { ...config, locale: null };

    return this.userService.userData.pipe(
      switchMap(({ institutionId }) => this.httpRequestFull<any>(this.serviceUrl, methodName, true, institutionId, config)),
      map(({ response }) => response),
    );
  }

  retrieveContentStringListByRequest(config: ContentStringRequest): Observable<ContentStringInfo[] | []> {
    const methodName = 'retrieveStringList';
    config = config.locale ? config : { ...config, locale: null };

    return this.userService.userData.pipe(
      switchMap(({ institutionId }) =>
        this.httpRequestFull<any>(this.serviceUrl, methodName, true, institutionId, config),
      ),
      map(({ exception, response }) => (!exception && !response.empty ? response.list : [])),
    );
  }
}
