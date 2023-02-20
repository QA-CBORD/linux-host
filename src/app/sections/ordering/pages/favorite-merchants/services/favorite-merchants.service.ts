import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageResponse, ServiceParameters } from '@core/model/service/message-response.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MerchantInfo } from '@sections/ordering';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';

@Injectable()
export class FavoriteMerchantsService {
  private readonly serviceUrlMerchant: string = '/json/merchant';

  constructor(private readonly http: HttpClient) {
  }

  getFavoriteMerchants(): Observable<MerchantInfo[]> {
    const postParams: ServiceParameters = { excludeNonOrdering: false };
    const queryConfig = new RPCQueryConfig('getFavoriteMerchants', postParams, true);

    return this.http.post(this.serviceUrlMerchant, queryConfig).pipe(
      map(({ response }: MessageResponse<{list: MerchantInfo[]}>) => response.list.map(merchant => ({ ...merchant, isFavorite: true }))),
    );
  }
}
