import { Injectable } from '@angular/core';

import { BaseService } from '../base-service/base.service';
import { MContentStringInfo } from '../../model/content/content-string-info.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { ContentStringRequest } from '../../model/content/content-string-request';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService extends BaseService {
  private serviceUrl = '/json/content';

  constructor(protected readonly http: HttpClient, private readonly userService: UserService) {
    super(http);
  }

  retrieveContentString(config: ContentStringRequest): Observable<MContentStringInfo> {
    const methodName = 'retrieveString';
    config = config.locale ? config : { ...config, locale: null };

    return this.userService.userData.pipe(
      switchMap(({ institutionId }) => this.httpRequestFull(this.serviceUrl, methodName, true, institutionId, config))
    );
  }

  retrieveContentStringList(config: ContentStringRequest): Observable<MContentStringInfo[] | []> {
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
