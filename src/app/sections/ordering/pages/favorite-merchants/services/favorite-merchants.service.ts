import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceParameters, BaseService } from '@core/service/base-service/base.service';
import { MessageResponse } from '@core/model/service/message-response.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MerchantInfo } from '@sections/ordering';

@Injectable()
export class FavoriteMerchantsService extends BaseService {
  private readonly serviceUrlMerchant: string = '/json/merchant';

  getFavoriteMerchants(): Observable<MerchantInfo[]> {
    const methodName = 'getFavoriteMerchants';
    const postParams: ServiceParameters = { excludeNonOrdering: false };
    return this.httpRequestFull(this.serviceUrlMerchant, methodName, true, null, postParams).pipe(
      map(({ response }: MessageResponse<any>) => response.list.map(merchant => ({ ...merchant, isFavorite: true })))
    );
  }
}
