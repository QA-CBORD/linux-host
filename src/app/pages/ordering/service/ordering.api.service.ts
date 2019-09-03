import { MerchantSearchOptions } from './../models/merchant-search-options';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { BaseService, ServiceParameters } from 'src/app/core/service/base-service/base.service';
import { UserService } from 'src/app/core/service/user-service/user.service';

import { MessageResponse } from 'src/app/core/model/service/message-response.model';
import { MerchantInfo } from '../models/merchant-info';

@Injectable({
  providedIn: 'root',
})
export class OrderingApiService extends BaseService {
  private readonly serviceUrl: string = '/json/merchant';

  constructor(protected readonly http: HttpClient, private readonly userService: UserService) {
    super(http);
  }

  getMenuMerchants(searchOptions: MerchantSearchOptions): Observable<MerchantInfo[]> {
    const methodName = 'getMenuMerchants';
    return this.userService.userData.pipe(
      switchMap(({ institutionId }) =>
        this.httpRequestFull(this.serviceUrl, methodName, true, institutionId, { searchOptions })
      ),
      map(({ response }: MessageResponse<any>) => response.list)
    );
  }

  getFavoriteMerchants(): Observable<string[]> {
    const methodName = 'getFavoriteMerchants';
    const postParams: ServiceParameters = { excludeNonOrdering: false };
    return this.httpRequestFull(this.serviceUrl, methodName, true, null, postParams).pipe(
      map(({ response }: MessageResponse<any>) => response.list)
    );
  }

  addFavoriteMerchant(merchantId: string): Observable<string> {
    const methodName = 'addFavoriteMerchant';
    const postParams: ServiceParameters = { merchantId: merchantId, notes: '' };
    return this.httpRequestFull(this.serviceUrl, methodName, true, null, postParams);
  }

  removeFavoriteMerchant(merchantId: string): Observable<boolean> {
    const methodName = 'removeFavoriteMerchant';
    const postParams: ServiceParameters = { merchantId: merchantId};
    return this.httpRequestFull(this.serviceUrl, methodName, true, null, postParams);
  }

}
